import { FunctionComponent } from "preact";
import Completado from "../islands/Completado.tsx";
import { Video } from "../types.ts";
import Tarea from "../islands/Tarea.tsx";
import TareaComponent from "../islands/Tarea.tsx";

type Props = {
  tareas: TareaType[];
  email: string;
};
export type TareaType = {
  titulo: string;
  destinatario: string;
  completado: boolean;
  fechasubida: string;
  deadline: string;
};

const TareaList: FunctionComponent<Props> = (props) => {
  const tareas = props.tareas;
  return (
    <div className="video-list-container">
      {tareas.map((tarea: TareaType) => (
        <div className="tarea">
          <h1 className="TareaTitle">{tarea.titulo}</h1>
          <h2 className="DeadLine">{tarea.deadline}</h2>
          <Completado
            id={tarea.titulo}
            fav={tarea.completado}
            userid={tarea.destinatario}
          />
        </div>
      ))}
    </div>
  );
};

export default TareaList;
