import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";

import InicioCliente from "./InicioCliente";
import InicioAdmin from "./InicioAdmin";

import BandejaUsuarios from "./components/Usuarios/UI/BandejaUsuarios";
import BandejaFlores from "./components/Flores/UI/BandejaFlores";
import BandejaArreglos from "./components/Arreglos/UI/BandejaArreglos";
import BandejaPedidos from "./components/Pedidos/UI/BandejaPedidos";
import BandejaFavoritos from "./components/Favoritos/UI/BandejaFavoritos";
import RamosCliente from "./components/Ramos/UI/RamosCliente";

import "./App.css";

export default function App() {
  const [usuario, setUsuario] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
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
    } else if (user.rol === "admin") {
      setVista("inicioAdmin");
    } else {
      setVista("home");
    }

    setLoginVisible(false);
  };

  const manejarLogout = () => {
    setUsuario(null);
    setVista("home");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const manejarInicioClick = () => {
    if (usuario?.rol === "cliente") {
      setVista("inicioCliente");
    } else if (usuario?.rol === "admin") {
      setVista("inicioAdmin");
    } else {
      setVista("home");
    }
  };

  return (
    <div className={darkMode ? "app-container oscuro" : "app-container claro"}>
      <Navbar
        usuario={usuario}
        onLogout={manejarLogout}
        setVista={setVista}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
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
          <InicioCliente idUsuario={usuario?.id_usuario} darkMode={darkMode} />
        )}

        {vista === "inicioAdmin" && (
          <InicioAdmin
            onSeleccionar={(opcion) => setVista(opcion as any)}
            darkMode={darkMode}
          />
        )}

        {/* Vistas para admin */}
        {usuario?.rol === "admin" && vista === "usuarios" && (
          <BandejaUsuarios onLogout={manejarLogout} rolUsuario="admin" darkMode={darkMode} />
        )}
        {usuario?.rol === "admin" && vista === "flores" && (
          <BandejaFlores rolUsuario="admin" darkMode={darkMode}/>
        )}
        {usuario?.rol === "admin" && vista === "arreglos" && (
          <BandejaArreglos rolUsuario="admin" darkMode={darkMode} />
        )}
        {usuario?.rol === "admin" && vista === "pedidos" && (
          <BandejaPedidos idUsuario={usuario.id_usuario} darkMode={darkMode} />
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
          <BandejaPedidos idUsuario={usuario.id_usuario} darkMode={darkMode} />
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
          darkMode={darkMode}
          onCerrar={() => setLoginVisible(false)}
        />
      )}
    </div>
  );
}
