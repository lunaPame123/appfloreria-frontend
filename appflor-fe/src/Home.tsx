import "./Home.css";
function Home(props: any) {
  return (
    <div className="home-container">
        <header className="home-header">
            <h1>Winter Bloom 🌸</h1>
            <p>
                Bienvenido a <b>Winter Bloom</b>, donde cada flor cuenta una historia.
                Descubre arreglos únicos y la magia del arte floral.
            </p>
            <button onClick={props.onContinuar}>Entrar</button>
        </header>
    </div>
  );
}

export default Home;
