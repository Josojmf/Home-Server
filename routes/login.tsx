import {
  FreshContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";
import Login from "../components/Login.tsx";
import { setCookie } from "$std/http/cookie.ts";
import { MongoClient } from "npm:mongodb@6.1.0";
import jwt from "npm:jsonwebtoken";

import type { User } from "../types.ts";
type UserLogin = {
  email: string;
  password: string;
};

export const config: RouteConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export type Data = {
  message: string;
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const form = await req.formData();
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    const JWT_SECRET = Deno.env.get("JWT_SECRET");
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in the environment");
    }

    const MONGO_URL = Deno.env.get("MONGO_URL") || "";
    const mongoclient = new MongoClient(MONGO_URL);
    const db = mongoclient.db("Final");
    const users = db.collection("users");
    const headers = new Headers();
    const user = {
      username: email,
      password: password,
    };
    const userRes = await users.findOne({
      username: email,
      password: password,
    });
    if (userRes !== null) {
      const token = jwt.sign({ password,email }, Deno.env.get("JWT_SECRET"), {
        expiresIn: "24h",
      });
      const data: Omit<UserLogin, "password" | "email"> = await userRes;

      setCookie(headers, {
        name: "auth",
        value: token,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });
      headers.set("location", "/main");
      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      headers.set("location", "/login");
      return new Response(null, {
        status: 303,
        headers,
      });
    }
  },
};

const Page = (props: PageProps<Data>) => (
  <Login
    message={props.data?.message}
  />
);

export default Page;
