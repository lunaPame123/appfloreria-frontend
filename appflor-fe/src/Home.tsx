import "./Home.css";

type Props = { user: any };

export default function Home({}: Props) {
  const imagenes = [
    "https://i.pinimg.com/1200x/6c/ef/6b/6cef6bc734185d5671cd1b8b4f6f225f.jpg",
    "https://i.pinimg.com/736x/44/2d/cb/442dcb510c32485d439a838507ffba0f.jpg",
    "https://i.pinimg.com/736x/3c/b4/be/3cb4be6ffd33ae05c72c326418c5e0c5.jpg",
    "https://i.pinimg.com/736x/83/9c/14/839c145e820188c71c31e3793718acee.jpg",
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Winter Bloom 🌸</h1>
        <p>
          Bienvenido a <strong>Winter Bloom</strong>, donde cada flor cuenta una historia.
          Descubre arreglos únicos, ramos personalizados y la magia del arte floral.
        </p>
      </div>

      <div className="galeria">
        {imagenes.map((img, i) => (
          <div key={i} className="card fade-in">
            <img
              src={img + "?auto=format&fit=crop&w=500&q=60"}
              alt="flores"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
