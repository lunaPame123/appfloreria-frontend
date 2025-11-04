import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";

// Vistas de cliente y admin
import InicioCliente from "./InicioCliente";
import InicioAdmin from "./InicioAdmin";


// Componentes de entidades
import BandejaUsuarios from "./components/Usuarios/UI/BandejaUsuarios";
import BandejaFlores from "./components/Flores/UI/BandejaFlores";
import BandejaArreglos from "./components/Arreglos/UI/BandejaArreglos";
import BandejaPedidos from "./components/Pedidos/UI/BandejaPedidos";
import BandejaFavoritos from "./components/Favoritos/UI/BandejaFavoritos";

import "./App.css";
import RamosCliente from "./components/Ramos/UI/RamosCliente";

export default function App() {
  const [usuario, setUsuario] = useState<any>(null);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [vista, setVista] = useState<
    | "home"
    | "inicioCliente"
    | "inicioAdmin"
    | "usuarios"
    | "flores"
    | "arreglos"
    | "ramos"
    | "pedidos"
    | "favoritos"
  >("home");
  const [loginVisible, setLoginVisible] = useState(false);

  const manejarLogin = (user: any) => {
    setUsuario(user);

    if (user.rol === "cliente") {
      setVista("inicioCliente");
    } else if (user.rol === "admin"){
      setVista("inicioAdmin");
    } else {
      setVista ("home")
    }
    setLoginVisible(false);
  };

  const manejarLogout = () => {
    setUsuario(null);
    setVista("home");
  };

  const toggleModo = () => setModoOscuro(!modoOscuro);

  const manejarInicioClick = () => {
    if (usuario?.rol === "cliente") {
      setVista("inicioCliente");
    } else if (usuario?.rol === "admin"){
      setVista ("inicioAdmin");
    } else {
      setVista("home");
    }
  };

  return (
    <div className={`app-container ${modoOscuro ? "oscuro" : ""}`}>
      <Navbar
        usuario={usuario}
        onLogout={manejarLogout}
        setVista={setVista}
        darkMode={modoOscuro}
        toggleDarkMode={toggleModo}
        onLoginClick={() => setLoginVisible(true)}
        onInicioClick={manejarInicioClick}
      />

      <div
        className={
          vista === "home" || vista === "inicioCliente" || vista === "inicioAdmin"
            ? "vista-home"
            : "vista-bandeja"
        }
      >
        {vista === "home" && <Home user={usuario} />}
        {vista === "inicioCliente" && (
          <InicioCliente idUsuario={usuario?.id_usuario} />
        )}

        {vista === "inicioAdmin" && (
          <InicioAdmin
            onSeleccionar={(opcion) => setVista (opcion as any)}
            modoOscuro = {modoOscuro}
          />
        )}

        {/* Vistas para admin */}
        {usuario?.rol === "admin" && vista === "usuarios" && (
          <BandejaUsuarios onLogout={manejarLogout} rolUsuario="admin" />
        )}
        {usuario?.rol === "admin" && vista === "flores" && (
          <BandejaFlores rolUsuario="admin" />
        )}
        {usuario?.rol === "admin" && vista === "arreglos" && (
          <BandejaArreglos rolUsuario="admin" />
        )}
        {usuario?.rol === "admin" && vista === "pedidos" && (
          <BandejaPedidos idUsuario={usuario.id_usuario} />
        )}
        {usuario?.rol === "admin" && vista === "favoritos" && (
          <BandejaFavoritos
            rolUsuario={usuario.rol}
            idUsuario={usuario.id_usuario}
          />
        )}

        {/* Vistas para cliente */}
        {usuario?.rol === "cliente" && vista === "ramos" && (
          <RamosCliente idUsuario={usuario.id_usuario} />
        )}
        {usuario?.rol === "cliente" && vista === "pedidos" && (
          <BandejaPedidos idUsuario={usuario.id_usuario} />
        )}
        {usuario?.rol === "cliente" && vista === "favoritos" && (
          <BandejaFavoritos
            rolUsuario={usuario.rol}
            idUsuario={usuario.id_usuario}
          />
        )}
      </div>

      {loginVisible && (
        <Login
          onLogin={manejarLogin}
          modoOscuro={modoOscuro}
          onCerrar={() => setLoginVisible(false)}
        />
      )}
    </div>
  );
}
