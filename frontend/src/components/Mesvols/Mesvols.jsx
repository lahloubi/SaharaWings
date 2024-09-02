import { useVolsContext } from "../../hooks/useVolsContext";
import DetailsVols from "../DetailsVols/DetailsVols";
import Navprofil from "../navigation/Navprofil";
import "./Mesvols.css";

const Mesvols = () => {
  const { vols } = useVolsContext();
  return (
    <div>
      <Navprofil />
      <h1>Mes vols</h1>
      <div id="mesvols">
        {vols && vols.map((vols) => <DetailsVols key={vols._id} vols={vols} />)}
      </div>
    </div>
  );
};

export default Mesvols;
