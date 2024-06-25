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
};
type Data = {
  name: string;
  EnCasa: boolean;
  HoraVuelta: string;
  tareas: Tarea[];
};
export const handler: Handlers<Tarea[], State> = {
  POST: async (req: Request, ctx: FreshContext<unknown, Tarea[]>) => {
    const MONGO_URL = Deno.env.get("MONGO_URL") || "";
    const mongoclient = new MongoClient(MONGO_URL);
    const db = mongoclient.db("Final");
    const data = await req.formData();
    const destinatario = data.get("destinatario");
    const AddTarea = data.get("AddTarea");
    const deadline= data.get("deadline");
    const tareasCollection = db.collection("tareas");
    const user = ctx.state.email as unknown as string;
    const document = {
      destinatario: destinatario,
      titulo: AddTarea,
      fechaSubida: Date.now(),
      deadline:deadline,
      completada:false
    };
    const upload = await tareasCollection.insertOne(document);
    return ctx.render();
  },
};

const Page = (props: PageProps<Tarea[]>) => (
  <div>
    <h1>
      Hola {props.state.email as string}
    </h1>
    <div className="TareasUsuario"></div>
    <form action="/AddTareas" method="POST" className="FormAddTask">
      <label for="dest">Añade tareas Para</label>
      <select name="destinatario" id="lang" className="TareasUsuarioSelect">
        <option  name="destinatario" value="mama">Mama</option>
        <option name="destinatario" value="papa">Papa</option>
        <option name="destinatario" value="joso">Joso</option>
        <option name="destinatario" value="ana">Ana</option>
      </select>
      <input type="text" name="AddTarea" placeholder="Añdir tarea"></input>
      <input type="text" name="AddTareaDescription" placeholder="Descripcion de la tarea"></input>
      <input placeholder="Deadline" type="date" id="start" name="deadline" value="2024-06-25" min="2024-06-25" />
      <button type="submit" value="Enviar">Add Task</button>
    </form>
  </div>
);

export default Page;
