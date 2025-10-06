import { useState } from "react";
import Login from "./components/LoginUsuario";
import BandejaUsuarios from "./components/BandejaUsuarios";

export default function App() {
  // Estado que controla si el usuario está logueado o no
  const [logeado, setLogeado] = useState(false);

  return (
    <>
      {logeado ? (
        // Si ya inició sesión, muestra la bandeja
        <BandejaUsuarios onLogout={() => setLogeado(false)} />
      ) : (
        // Si no, muestra el login
        <Login onLogin={() => setLogeado(true)} />
      )}
    </>
  );
}
