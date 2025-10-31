function Navbar(props: any) {
  return (
    <nav>
      <div>🌸 Winter Bloom</div>
      <div>
        <input
          type="text"
          placeholder="Buscar flores, ramos o arreglos..."
        />
      </div>
      <div>
        <button onClick={props.onHome}>Inicio</button>
        <button onClick={props.onLogin}>Iniciar Sesion</button>
      </div>
    </nav>
  );
}

export default Navbar;
