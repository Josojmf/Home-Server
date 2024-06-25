import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

type Props = {
  _id:string;
  titulo: string;
  destinatario: string;
  completado: boolean;
  fechasubida: string;
  deadline:string
};
const TareaComponent: FunctionComponent<Props> = ({ titulo, destinatario, completado, fechasubida }) => {
  const [completada, setCompletada] = useState<boolean>(true);
  const toggleFav = async (userid: string, id: string) => {
    const response = await fetch(
      `https://videoapp-api.deno.dev/fav/${userid}/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      setCompletada(!completado);
      console.log("Fav toggled");
    } else {
      console.error("Error toggling fav");
    }
  };
  return (
    <div className="Tarea">
      <h1>titulo</h1>
      <button
        className="fav-button"
        onClick={() => toggleFav(destinatario, titulo)}
      >
        {completado ? "❤️ Completada" : "🤍 No Completada"}
      </button>
      <div className="DeadLine">
        {fechasubida}
      </div>
    </div>
  );
};

export default TareaComponent;
