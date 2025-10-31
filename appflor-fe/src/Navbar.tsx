import "./Navbar.css";

function Navbar(props: any) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🌸 Winter Bloom</div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar flores, ramos o arreglos..."
        />
      </div>
      <div className="navbar-actions">
        <button onClick={props.onHome}>Inicio</button>
        <button onClick={props.onLogin}>Iniciar Sesion</button>
      </div>
    </nav>
  );
}

export default Navbar;
