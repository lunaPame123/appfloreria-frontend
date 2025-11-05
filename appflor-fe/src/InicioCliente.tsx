import React from "react";
import "./InicioCliente.css";

// ✅ Declaramos las props que recibe el componente
type Props = {
  idUsuario: number;
  darkMode: boolean;
};

const InicioCliente: React.FC<Props> = ({ idUsuario, darkMode }) => {
  const arreglos = [
    { id: 1, nombre: "Ramo Rosas Rojas", imagen: "https://i.pinimg.com/736x/83/9c/14/839c145e820188c71c31e3793718acee.jpg" },
    { id: 2, nombre: "Arreglo Tulipanes", imagen: "https://i.pinimg.com/1200x/6c/ef/6b/6cef6bc734185d5671cd1b8b4f6f225f.jpg" },
    { id: 3, nombre: "Ramo Mixto", imagen: "https://i.pinimg.com/736x/44/2d/cb/442dcb510c32485d439a838507ffba0f.jpg" },
    { id: 4, nombre: "Flores Blancas", imagen: "https://i.pinimg.com/736x/3c/b4/be/3cb4be6ffd33ae05c72c326418c5e0c5.jpg" },
    { id: 5, nombre: "Rosas y Lirios", imagen: "https://i.pinimg.com/736x/1c/2e/cb/1c2ecbd48285a15625ff393d03a2b6b0.jpg" },
  ];

  const manejarFavorito = (idArreglo: number) => {
    console.log(`Usuario ${idUsuario} marcó favorito el arreglo ${idArreglo}`);
    alert("Agregado a favoritos 💐");
  };

  const manejarCrearRamo = () => {
    alert("Aquí el cliente podrá crear su ramo personalizado 🌸");
  };

  return (
    <div className={`inicio-cliente-container ${darkMode ? "oscuro" : "claro"}`}>
      <h2 className="titulo">Descubre nuestros arreglos florales</h2>
      <p className="subtitulo">Explora, guarda tus favoritos y diseña tu propio ramo 🌷</p>

      <div className="galeria-cliente">
        {arreglos.map((a) => (
          <div key={a.id} className={`card-cliente ${darkMode ? "oscuro" : ""}`}>
            <img src={a.imagen} alt={a.nombre} />
            <div className="info">
              <span>{a.nombre}</span>
              <button onClick={() => manejarFavorito(a.id)}>❤️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="crear-ramo" style={{ marginTop: 20 }}>
        <button onClick={manejarCrearRamo}>🌼 Crear Ramo Personalizado</button>
      </div>
    </div>
  );
};

export default InicioCliente;
