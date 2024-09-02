import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { VolsContextProvider } from "./context/VolsContext";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <VolsContextProvider>
        <App />
      </VolsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
