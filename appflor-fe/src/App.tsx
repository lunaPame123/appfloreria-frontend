import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";

// Vistas de cliente
import InicioCliente from "./InicioCliente";

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
    // Si es cliente, lo mandamos directo a la vista tipo Pinterest
    if (user.rol === "cliente") {
      setVista("inicioCliente");
    } else {
      setVista("home");
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
        onInicioClick={manejarInicioClick} // 👈 añadimos esta función
      />

      <div
        className={
          vista === "home" || vista === "inicioCliente"
            ? "vista-home"
            : "vista-bandeja"
        }
      >
        {vista === "home" && <Home user={usuario} />}
        {vista === "inicioCliente" && (
          <InicioCliente idUsuario={usuario?.id_usuario} />
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

        {/* Vistas para cliente */}
        {usuario?.rol === "cliente" && vista === "ramos" && (
          <RamosCliente idUsuario={usuario.id_usuario} />
        )}
        {usuario?.rol === "cliente" && vista === "pedidos" && (
          <BandejaPedidos idUsuario={usuario.id_usuario} />
        )}

        {/* Vista de favoritos (común a ambos) */}
        {usuario && vista === "favoritos" && (
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
