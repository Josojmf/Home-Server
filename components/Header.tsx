import { FunctionComponent } from "preact";
import Logout from "../islands/Logout.tsx";

type Props = {
  userName: string;
};

const Header: FunctionComponent<Props> = ({ userName }) => {
  return (
    <header className="header-container">
      <div className="header-content">
        <span className="user-name">{userName}</span>
        <Logout />
        <a className="ButtonAddTasks" href="AddTareas">Añadir Tareas</a>
        <a className="ButtonAddTasks" href="/">Home</a>
      </div>
    </header>
  );
};

export default Header;
