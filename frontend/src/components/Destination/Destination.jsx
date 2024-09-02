import React from "react";
import DESTINATIONS from "../../../src/data/destinations";
import "./Destination.css";

const Destination = () => {
  return (
    <div>
      <h2>Envolez-vous dans les 7 merveilles du monde avec SaharaWings !</h2>
      {DESTINATIONS.map((destination, index) => (
        <div className="destination" key={index}>
          <h3>{destination.ville}</h3>

          <img src={destination.image} alt={destination.nom} />

          <p>{destination.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Destination;
