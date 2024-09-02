import { useVolsContext } from "../../hooks/useVolsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./DetailsVols.css";

const DetailsVols = ({ vols }) => {
  const { dispatch } = useVolsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const reponse = await fetch("http://localhost:4000/api/vols/" + vols._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await reponse.json();

    if (reponse.ok) {
      dispatch({ type: "DELETE_VOL", payload: json });
    }
  };

  return (
    <div className="details">
      <h2>
        De {vols.destinationDepart} -- Vers {vols.destinationArrivee}{" "}
      </h2>
      <h2>
        Aller : {vols.dateAller.split("T")[0]} -- Retour :{" "}
        {vols.dateRetour.split("T")[0]}{" "}
      </h2>
      <h2>
        {vols.nbrPassagers} passagers --
        {vols.adultes !== 0 && ` ${vols.adultes} adultes`}{" "}
        {vols.enfants !== 0 && `-- ${vols.enfants} enfants--`}{" "}
        {vols.bebes !== 0 && `-- ${vols.bebes} bébés`}
      </h2>

      <button className="btn-delete" onClick={handleClick}>
        Supprimer
      </button>
    </div>
  );
};

export default DetailsVols;
