import React from "react";
import logo from "../../assets/logoSaharaWings.png";
import "./Navbar.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <>
      <header>
        <img src={logo} className="logo" alt="Sahara Wings Logo" />
        <nav>
          <ul className="links">
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/Destination">Destination</NavLink>
            </li>
            <li>{user && <NavLink to="/Reservation">Réservation</NavLink>}</li>
          </ul>
        </nav>
        {!user && (
          <button className="btn-connect">
            <NavLink to="/Login">Se connecter</NavLink>
          </button>
        )}

        {user && (
          <div>
            <button>
              <NavLink to="/ModifProfil">
                <span>{user.email}</span>
              </NavLink>
            </button>
            <button className="btn-disconnect" onClick={handleClick}>
              Se déconnecter
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
