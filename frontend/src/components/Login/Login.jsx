import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { NavLink } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(nom, prenom, email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Se connecter</h3>

      <label>Prénom</label>
      <input
        type="text"
        onChange={(e) => setPrenom(e.target.value)}
        value={prenom}
      />

      <label>Nom</label>
      <input type="text" onChange={(e) => setNom(e.target.value)} value={nom} />
      <label>Courriel</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Mot de passe</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button className="btn-connect" disabled={isLoading}>
        Connecte toi!
      </button>
      {error && <div className="error">{error}</div>}
      <p>
        Vous n'avez pas de compte? Créez-en un
        <NavLink to="/Signup"> ici</NavLink>
      </p>
    </form>
  );
};

export default Login;
