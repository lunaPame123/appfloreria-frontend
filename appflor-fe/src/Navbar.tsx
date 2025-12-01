import { useEffect, useState } from "react";
import "./styles/Navbar.css";

interface NavbarProps {
  usuario: any;
  onLogout: () => void;
  setVista: (
    vista:
      | "home"
      | "inicioCliente"
      | "inicioAdmin"
      | "usuarios"
      | "flores"
      | "arreglos"
      | "pedidos"
      | "favoritos"
  ) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLoginClick: () => void;
  onInicioClick: () => void;
}

export default function Navbar({
  usuario,
  onLogout,
  setVista,
  darkMode,
  toggleDarkMode,
  onLoginClick,
  onInicioClick,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : "transparent"}`}
      role="navigation"
      aria-label="Barra de navegación principal"
    >
      <div className="navbar-logo" onClick={onInicioClick}>
        🌷 Winter Bloom
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar flores o arreglos..."
          className="search-input"
        />
      </div>

      <div className="navbar-actions">
        <button onClick={onInicioClick}>
          {usuario?.rol === "cliente" ? "Explorar" : "Inicio"}
        </button>

        {usuario ? (
          <>
            {usuario.rol === "admin" && (
              <>
                <button onClick={() => setVista("usuarios")}>Usuarios</button>
                <button onClick={() => setVista("flores")}>Flores</button>
                <button onClick={() => setVista("arreglos")}>Arreglos</button>
                <button onClick={() => setVista("pedidos")}>Pedidos</button>
                <button onClick={() => setVista("favoritos")}>Favoritos</button>
              </>
            )}

            {usuario.rol === "cliente" && (
              <>
                <button onClick={() => setVista("favoritos")}>❤️ Favoritos</button>
                <button onClick={() => setVista("pedidos")}>Pedidos</button>
              </>
            )}

            <button onClick={onLogout}>Salir</button>
          </>
        ) : (
          <button onClick={onLoginClick}>Iniciar sesión</button>
        )}

        <button onClick={toggleDarkMode} className="modo-btn">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}