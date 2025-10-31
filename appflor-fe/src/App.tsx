import { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./components/LoginUsuario";
import BandejaUsuarios from "./components/BandejaUsuarios";

export default function App() {
  const [pantalla, setPantalla] = useState("home");
  const [logeado, setLogeado] = useState(false);

  return (
    <>
      <Navbar
        onHome={() => setPantalla("home")}
        onLogin={() => setPantalla("login")}
      />

      {pantalla === "home" && <Home onContinuar={() => setPantalla("login")} />}

      {pantalla === "login" && !logeado && (
        <Login
          onLogin={() => {
            setLogeado(true);
            setPantalla("bandeja");
          }}
        />
      )}

      {pantalla === "bandeja" && (
        <BandejaUsuarios
          onLogout={() => {
            setLogeado(false);
            setPantalla("home");
          }}
        />
      )}
    </>
  );
}
