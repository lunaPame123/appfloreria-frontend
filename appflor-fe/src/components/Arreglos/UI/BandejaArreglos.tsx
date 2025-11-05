import { useState, useEffect } from "react";
import ModalArreglo from "./ModalArreglos";
import type { Arreglo } from "../Types/ArregloTypes";
import "../../../styles/Bandeja.css";

type Props = {
  rolUsuario: "admin" | "cliente";
};

export default function BandejaArreglos({ rolUsuario }: Props) {
  const [arreglos, setArreglos] = useState<Arreglo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [arregloActual, setArregloActual] = useState<Arreglo | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const arreglosPorPagina = 6;

  useEffect(() => {
    const obtenerArreglos = async () => {
      const data: Arreglo[] = [
        { id_arreglo: 1, nombre: "Arreglo Primavera", descripcion: "Flores variadas de primavera", precio: 25, categoria: "Primavera", imagen: "" },
        { id_arreglo: 2, nombre: "Arreglo Verano", descripcion: "Flores coloridas de verano", precio: 30, categoria: "Verano", imagen: "" },
      ];
      setArreglos(data);
    };
    obtenerArreglos();
  }, []);

  const abrirModalCrear = () => {
    setArregloActual(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (arreglo: Arreglo) => {
    setArregloActual(arreglo);
    setModalVisible(true);
  };

  const guardarArreglo = (arreglo: Arreglo) => {
    if (arreglo.id_arreglo) {
      setArreglos(arreglos.map((a) => (a.id_arreglo === arreglo.id_arreglo ? arreglo : a)));
    } else {
      const nuevoArreglo = { ...arreglo, id_arreglo: arreglos.length + 1 };
      setArreglos([...arreglos, nuevoArreglo]);
    }
    setModalVisible(false);
  };

  // Paginación
  const totalPaginas = Math.ceil(arreglos.length / arreglosPorPagina);
  const indiceInicial = (paginaActual - 1) * arreglosPorPagina;
  const indiceFinal = indiceInicial + arreglosPorPagina;
  const arreglosVisibles = arreglos.slice(indiceInicial, indiceFinal);
  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) setPaginaActual(nuevaPagina);
  };

  return (
    <div className="bandeja-container">
      <div className="bandeja-header">
        <h2>Bandeja de Arreglos</h2>
        {rolUsuario === "admin" && (
          <div className="bandeja-buttons">
            <button onClick={abrirModalCrear}>Crear Arreglo</button>
          </div>
        )}
      </div>

      {/* Tabla para escritorio */}
      <div className="table-container">
        <table className="bandeja-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              {rolUsuario === "admin" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {arreglosVisibles.map((a) => (
              <tr key={a.id_arreglo}>
                <td>{a.id_arreglo}</td>
                <td>{a.nombre}</td>
                <td>{a.descripcion}</td>
                <td>{a.precio}</td>
                <td>{a.categoria}</td>
                {rolUsuario === "admin" && (
                  <td>
                    <button onClick={() => abrirModalEditar(a)}>✏️</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móvil */}
      <div className="cards-container">
        {arreglosVisibles.map((a) => (
          <div className="card-item" key={a.id_arreglo}>
            <h3>{a.nombre}</h3>
            <p>{a.descripcion}</p>
            <p>Precio: ${a.precio}</p>
            <p>Categoría: {a.categoria}</p>
            {rolUsuario === "admin" && <button onClick={() => abrirModalEditar(a)}>Editar</button>}
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="paginacion">
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          ⬅ Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
          Siguiente ➡
        </button>
      </div>

      {modalVisible && <ModalArreglo arregloActual={arregloActual} onGuardar={guardarArreglo} onCerrar={() => setModalVisible(false)} />}
    </div>
  );
}