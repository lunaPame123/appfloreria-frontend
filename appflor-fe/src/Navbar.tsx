import { useEffect, useState } from "react";
import "./Navbar.css";

interface NavbarProps {
  usuario: any;
  onLogout: () => void;
  setVista: (vista: "home" | "usuarios" | "flores" | "arreglos" | "ramos" | "pedidos" | "favoritos") => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLoginClick: () => void;
}

export default function Navbar({
  usuario,
  onLogout,
  setVista,
  darkMode,
  toggleDarkMode,
  onLoginClick,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : "transparent"}`}>
      <div className="navbar-logo" onClick={() => setVista("home")}>🌷 Winter Bloom</div>

      <div className="navbar-search">
        <input type="text" placeholder="Buscar flores, ramos o arreglos..." className="search-input" />
      </div>

      <div className="navbar-actions">
        <button onClick={() => setVista("home")}>Inicio</button>

        {usuario ? (
          <>
            <button onClick={() => setVista("favoritos")}>❤️ Favoritos</button>
            {usuario.rol === "admin" && <>
              <button onClick={() => setVista("usuarios")}>Usuarios</button>
              <button onClick={() => setVista("flores")}>Flores</button>
              <button onClick={() => setVista("arreglos")}>Arreglos</button>
            </>}
            {usuario.rol === "cliente" && <>
              <button onClick={() => setVista("ramos")}>Ramos</button>
              <button onClick={() => setVista("pedidos")}>Pedidos</button>
            </>}
            <button onClick={onLogout}>Salir</button>
          </>
        ) : (
          <button onClick={onLoginClick}>Iniciar sesión</button>
        )}

        <button onClick={toggleDarkMode} className="modo-btn">{darkMode ? "☀️" : "🌙"}</button>
      </div>
    </nav>
  );
}