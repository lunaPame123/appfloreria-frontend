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
import BandejaRamos from "./components/Ramos/UI/BandejaRamos";
import type { Ramo } from "./components/Ramos/Types/RamoTypes";

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
  const [ramos] = useState<Ramo[]>([
    {
      id_ramo: 1,
      nombre: "Ramo de prueba",
      id_usuario: 1,
      flores: [
        { id_flor: 1, nombre: "Rosa", color: "Rojo", significado: "Amor", precio: 10, estado: "activo", imagen: "https://images.unsplash.com/photo-1619532839116-af15d051cd3e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8" },
        { id_flor: 2, nombre: "Tulipán", color: "Amarillo", significado: "Alegría", precio: 12, estado: "activo", imagen: "https://w7.pngwing.com/pngs/898/947/png-transparent-pink-tulip-flower-tulip-pink-flower-pink-tulip-purple-computer-wallpaper-plant-stem.png" },
      ],
      costo_total: 22,
      estado: "Pendiente",
      imagen: "",
    },
  ]);

  const floresDisponibles = [
  { id_flor: 1, nombre: "Hortensia Azul", color: "Azul", significado: "Gratitud", precio: 15, estado: "activo", imagen: "https://specktrum.dk/cdn/shop/files/Kunstig_blomst_-_bl_hortensia.png?v=1753863800&width=2048" },
  { id_flor: 2, nombre: "Rosa Roja", color: "Rojo", significado: "Amor", precio: 10, estado: "activo", imagen: "https://images.unsplash.com/photo-1619532839116-af15d051cd3e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8" },
  { id_flor: 3, nombre: "Lirio Blanco", color: "Blanco", significado: "Pureza", precio: 20, estado: "activo" },
  { id_flor: 4, nombre: "Tulipán Amarillo", color: "Amarillo", significado: "Alegría", precio: 12, estado: "activo" },
  { id_flor: 5, nombre: "Girasol", color: "Amarillo", significado: "Felicidad", precio: 18, estado: "activo" },
  { id_flor: 6, nombre: "Margarita", color: "Blanco", significado: "Inocencia", precio: 8, estado: "activo" },
  { id_flor: 7, nombre: "Orquídea", color: "Morado", significado: "Elegancia", precio: 25, estado: "activo" },
];

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
          <InicioAdmin onSeleccionar={(opcion) => setVista(opcion as any)} darkMode={darkMode}/>
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
          <BandejaFavoritos rolUsuario="admin" idUsuario={usuario.id_usuario} />
        )}
        {usuario?.rol === "admin" && vista === "ramos" && (
          <BandejaRamos ramosIniciales={ramos} floresDisponibles={floresDisponibles} darkMode={darkMode} />
        )}

        {/* Vistas para cliente */}
        {usuario?.rol === "cliente" && vista === "ramos" && (
          <RamosCliente idUsuario={usuario.id_usuario} floresDisponibles={floresDisponibles}  darkMode={darkMode} />
        )}
        {usuario?.rol === "cliente" && vista === "pedidos" && (
          <BandejaPedidos idUsuario={usuario.id_usuario} darkMode={darkMode} />
        )}
        {usuario?.rol === "cliente" && vista === "favoritos" && (
          <BandejaFavoritos rolUsuario="cliente" idUsuario={usuario.id_usuario} />
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
