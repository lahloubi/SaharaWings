import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { NavLink } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(nom, prenom, email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>S'inscrire</h3>

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

      <button className="btn-inscript" disabled={isLoading}>
        Inscris toi!
      </button>

      {error && <div className="error">{error}</div>}

      <p>
        Déjà un compte? Connectez-vous
        <NavLink to="/Login"> ici</NavLink>
      </p>
    </form>
  );
};

export default Signup;
