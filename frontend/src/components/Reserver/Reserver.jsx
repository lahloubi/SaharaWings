import { useState } from "react";
import { useVolsContext } from "../../hooks/useVolsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Reserver.css";
import DESTINATIONS from "../../../src/data/destinations";

const Reserver = () => {
  const { dispatch } = useVolsContext();
  const { user } = useAuthContext();
  const [destinationDepart, setDestinationDepart] = useState("");
  const [destinationArrivee, setDestinationArrivee] = useState("");
  const [dateAller, setDateAller] = useState("");
  const [dateRetour, setDateRetour] = useState("");
  const [nbrPassagers, setNbrPassagers] = useState(1);
  const [adultes, setAdultes] = useState(1);
  const [enfants, setEnfants] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [error, setError] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Pas connecte");
      return;
    }

    const vols = {
      destinationDepart,
      destinationArrivee,
      dateAller,
      dateRetour,
      nbrPassagers,
      adultes,
      enfants,
      bebes,
    };

    const reponse = await fetch("http://localhost:4000/api/vols", {
      method: "POST",
      body: JSON.stringify(vols),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      setError(json.error);
    }
    if (reponse.ok) {
      setDestinationDepart("");
      setDestinationArrivee("");
      setDateAller("");
      setDateRetour("");
      setNbrPassagers("");
      setAdultes("");
      setEnfants("");
      setBebes("");
      setError(null);
      console.log("Reservation fait! Et oui!");
      dispatch({ type: "CREATE_VOL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={HandleSubmit}>
      <h3>Faire une réservation</h3>

      <label>De</label>
      <select
        onChange={(e) => setDestinationDepart(e.target.value)}
        value={destinationDepart}
      >
        <option value="" disabled>
          Choisissez une destination de départ
        </option>
        {DESTINATIONS.map((destination, index) => (
          <option key={index} value={destination.ville}>
            {destination.ville}
          </option>
        ))}
      </select>

      <label>Vers</label>
      <select
        onChange={(e) => setDestinationArrivee(e.target.value)}
        value={destinationArrivee}
      >
        <option value="" disabled>
          Choisissez une destination d'arrivée
        </option>
        {DESTINATIONS.map((destination, index) => (
          <option key={index} value={destination.ville}>
            {destination.ville}
          </option>
        ))}
      </select>

      <label>Départ</label>
      <input
        type="date"
        onChange={(e) => setDateAller(e.target.value)}
        value={dateAller}
      />

      <label>Retour</label>
      <input
        type="date"
        onChange={(e) => setDateRetour(e.target.value)}
        value={dateRetour}
      />

      <label>Nombre de passagers</label>
      <input
        type="number"
        min="1"
        max="9"
        onChange={(e) => setNbrPassagers(Number(e.target.value))}
        value={nbrPassagers}
      />

      <label>Nombre d'adultes</label>
      <input
        type="number"
        min="1"
        max="9"
        onChange={(e) => setAdultes(Number(e.target.value))}
        value={adultes}
      />

      <label>Nombre d'enfants</label>
      <input
        type="number"
        min="0"
        max="8"
        onChange={(e) => setEnfants(Number(e.target.value))}
        value={enfants}
      />

      <label>Nombre de bébes</label>
      <input
        type="number"
        min="0"
        max="4"
        onChange={(e) => setBebes(Number(e.target.value))}
        value={bebes}
      />

      <button className="btn-reserver">Réserver</button>
      {error && <div className="erreur">{error}</div>}
    </form>
  );
};

export default Reserver;
