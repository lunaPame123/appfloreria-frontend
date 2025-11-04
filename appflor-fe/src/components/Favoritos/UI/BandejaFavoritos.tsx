// BandejaFavoritos.tsx
import { useEffect, useState } from "react";
import type { Favorito } from "../Types/FavoritoTypes";
import "./BandejaFavoritos.css";

interface Arreglo {
  id_arreglo: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
}

interface Props {
  rolUsuario: "admin" | "cliente";
  idUsuario: number;
}

export default function BandejaFavoritos({ rolUsuario, idUsuario }: Props) {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [arreglos, setArreglos] = useState<Arreglo[]>([]);

  useEffect(() => {
    // Simulando fetch de favoritos
    const datosFavoritos: Favorito[] = [
      { id_favorito: 1, id_usuario: 2, id_arreglo: 101 },
      { id_favorito: 2, id_usuario: 2, id_arreglo: 102 },
      { id_favorito: 3, id_usuario: 2, id_arreglo: 103 },
    ];

    const datosArreglos: Arreglo[] = [
      { id_arreglo: 101, nombre: "Ramo Rosas Blancas", imagen: "https://i.pinimg.com/736x/83/9c/14/839c145e820188c71c31e3793718acee.jpg" },
      { id_arreglo: 102, nombre: "Arreglo Primavera", imagen: "https://i.pinimg.com/736x/3c/b4/be/3cb4be6ffd33ae05c72c326418c5e0c5.jpg" },
      { id_arreglo: 103, nombre: "Ramo Aesthetic", imagen: "https://i.pinimg.com/736x/44/2d/cb/442dcb510c32485d439a838507ffba0f.jpg" },
    ];

    // Filtrar solo los favoritos del cliente si es cliente
    const favoritosFiltrados = rolUsuario === "cliente"
      ? datosFavoritos.filter(fav => fav.id_usuario === idUsuario)
      : datosFavoritos;

    setFavoritos(favoritosFiltrados);
    setArreglos(datosArreglos);
  }, [rolUsuario, idUsuario]);

  // Mapear favoritos a sus arreglos
  const favoritosConDatos = favoritos.map(fav => {
    const arreglo = arreglos.find(a => a.id_arreglo === fav.id_arreglo);
    return { ...fav, arreglo };
  });

  // Vista cliente tipo Pinterest
  if (rolUsuario === "cliente") {
    return (
      <div className="favoritos-pinterest">
        {favoritosConDatos.map((fav) => (
          <div key={fav.id_favorito} className="card-favorito">
            {fav.arreglo?.imagen && <img src={fav.arreglo.imagen} alt={fav.arreglo.nombre} />}
            <h4>{fav.arreglo?.nombre}</h4>
          </div>
        ))}
      </div>
    );
  }

  // Vista admin tipo tabla
  return (
    <div className="favoritos-admin">
      <table>
        <thead>
          <tr>
            <th>ID Favorito</th>
            <th>ID Usuario</th>
            <th>ID Arreglo</th>
            <th>Usuario Creación</th>
            <th>Fecha Creación</th>
            <th>Usuario Modificación</th>
            <th>Fecha Modificación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {favoritosConDatos.map(fav => (
            <tr key={fav.id_favorito}>
              <td>{fav.id_favorito}</td>
              <td>{fav.id_usuario}</td>
              <td>{fav.id_arreglo}</td>
              <td>{fav.usuarioCreacion || "-"}</td>
              <td>{fav.fechaCreacion || "-"}</td>
              <td>{fav.usuarioModificacion || "-"}</td>
              <td>{fav.fechaModificacion || "-"}</td>
              <td>{fav.estado || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
