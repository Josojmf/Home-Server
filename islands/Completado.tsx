import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { MongoClient } from "npm:mongodb@6.1.0";

type Props = {
  id: string;
  fav: boolean;
  userid: string;
};

const Fav: FunctionComponent<Props> = ({ userid, id, fav }) => {
  const [completed, setCompleted] = useState<boolean>(false);
  async function toggleCompleted(userid: string, id: string) {
    const response = await fetch("/toggleCompleted");
    setCompleted(!completed)
    console.log(completed);

  }
  console.log(completed);

  return (
    <button
      className="fav-button"
      onClick={() => toggleCompleted(userid, id)}
    >
      {completed ? "☑️ No Completada" : "✅ Completada"}
    </button>
  );
};

export default Fav;
