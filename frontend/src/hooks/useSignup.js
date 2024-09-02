import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (nom, prenom, email, password) => {
    setIsLoading(true);
    setError(null);

    const reponse = await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, email, password }),
    });
    const json = await reponse.json();

    if (!reponse.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (reponse.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
