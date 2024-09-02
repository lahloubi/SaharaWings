import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navprofil from "../navigation/Navprofil";
import "./ModifProfil.css";

const ModifProfil = () => {
  const { user } = useAuthContext();

  const [userId, setUserId] = useState("");
  const [nom, setNom] = useState(user?.nom || "");
  const [prenom, setPrenom] = useState(user?.prenom || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setNom(user.nom || "");
      setPrenom(user.prenom || "");
      setEmail(user.email || "");

      // Décodage du token pour extraire l'ID de l'utilisateur
      const decodedToken = JSON.parse(atob(user.token.split(".")[1]));
      const userId = decodedToken._id;
      setUserId(userId);

      // Afficher le token décrypté dans la console
      console.log("Token décrypté :", decodedToken);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nom, prenom, email, password }),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Une erreur s'est produite lors de la mise à jour du profil."
          );
        }

        console.log("Profil mis à jour avec succès !");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navprofil />
      <form className="modif-profil" onSubmit={handleSubmit}>
        <h3>Modifier votre profil</h3>

        <label htmlFor="prenom">Prénom</label>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />

        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-modification" type="submit">
          Modifier
        </button>
      </form>
    </>
  );
};

export default ModifProfil;
