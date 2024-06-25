import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { MongoClient } from "npm:mongodb@6.1.0";
import Login from "../components/Login.tsx";
import Tarea from "../islands/Tarea.tsx";
import TareaList from "../components/TareaList.tsx";
type State = {
  id: string;
  name: string;
  email: string;
};
type Tarea = {
  titulo: string;
  destinatario: string;
  completado: boolean;
  fechasubida: string;
  deadline:string;
};
type Data = {
  name: string;
  EnCasa: boolean;
  HoraVuelta: string;
  tareas: Tarea[];
};
export const handler: Handlers<Tarea[], State> = {
  GET: async (req: Request, ctx: FreshContext<unknown, Tarea[]>) => {
    const MONGO_URL = Deno.env.get("MONGO_URL") || "";
    const mongoclient = new MongoClient(MONGO_URL);
    const db = mongoclient.db("Final");
    const tareasCollection = db.collection("tareas");
    const user = ctx.state.email as unknown as string;
    const tareas: Tarea[] = await tareasCollection.find({ destinatario: user })
      .toArray() as unknown as Tarea[];
    return ctx.render(tareas);
  },
};

const Page = (props: PageProps<Tarea[]>) => (
  <div>
    <h1>
      {props.state.email as string}
    </h1>
    <h2 className="TareasUsuarioTitle">
      Tus tareas son:

      <div>
        <TareaList tareas={props.data}></TareaList>
      </div>
    </h2>
    <div className="TareasUsuario"></div>
  </div>
);

export default Page;
