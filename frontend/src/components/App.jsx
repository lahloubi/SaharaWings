import Navbar from "./navigation/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Reservation from "./Reservation/Reservation";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Destination from "./Destination/Destination";
import Home from "./home/Home";
import ModifProfil from "./profil/ModifProfil";
import Mesvols from "./Mesvols/Mesvols";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="components">
          <Routes>
            <Route path="/Reservation" element={<Reservation />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/Signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />

            <Route
              path="/ModifProfil"
              element={user ? <ModifProfil /> : <Navigate to="/login" />}
            />

            <Route path="/" element={<Home />} />

            <Route path="/Destination" element={<Destination />} />

            <Route
              path="/mesvols"
              element={user ? <Mesvols /> : <Navigate to="/mesvols" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
