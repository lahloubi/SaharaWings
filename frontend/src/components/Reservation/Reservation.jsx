import { useEffect, useState } from "react";
import { useVolsContext } from "../../hooks/useVolsContext";
import Reserver from "../Reserver/Reserver";
import { useAuthContext } from "../../hooks/useAuthContext";

const Reservation = () => {
  const { vols, dispatch } = useVolsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchVols = async () => {
      const reponse = await fetch("http://localhost:4000/api/vols", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await reponse.json();

      if (reponse.ok) {
        dispatch({ type: "SET_VOLS", payload: json });
      }
    };
    if (user) {
      fetchVols();
    }
  }, [dispatch, user]);

  return <Reserver />;
};

export default Reservation;
