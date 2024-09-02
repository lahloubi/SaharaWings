import { NavLink } from "react-router-dom";
import "./Navprofil.css";

const Navprofil = () => {
  return (
    <header className="head">
      <ul className="nav-links">
        <li>
          <NavLink to="/ModifProfil">Modifier profil</NavLink>
        </li>
        <li>
          <NavLink to="/mesvols">Mes vols</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Navprofil;
