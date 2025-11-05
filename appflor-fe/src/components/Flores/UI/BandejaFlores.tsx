import { useState, useEffect } from "react";
import ModalFlor from "./ModalFlores";
import type { Flor } from "../Types/FlorTypes";
import "../../../styles/Bandeja.css";

type Props = {
  rolUsuario: "admin" | "cliente";
};

export default function BandejaFlores({ rolUsuario }: Props) {
  const [flores, setFlores] = useState<Flor[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [florActual, setFlorActual] = useState<Flor | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const floresPorPagina = 6;

  useEffect(() => {
    const obtenerFlores = async () => {
      // Simulación de API
      const data: Flor[] = [
        { id_flor: 1, nombre: "Hortensia Azul", color: "Azul", significado: "Gratitud", precio: 15 },
        { id_flor: 2, nombre: "Rosa Roja", color: "Rojo", significado: "Amor", precio: 10 },
      ];
      setFlores(data);
    };
    obtenerFlores();
  }, []);

  const abrirModalCrear = () => {
    setFlorActual(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (flor: Flor) => {
    setFlorActual(flor);
    setModalVisible(true);
  };

  const guardarFlor = (flor: Flor) => {
    if (flor.id_flor) {
      setFlores(flores.map((f) => (f.id_flor === flor.id_flor ? flor : f)));
    } else {
      const nuevaFlor = { ...flor, id_flor: flores.length + 1 };
      setFlores([...flores, nuevaFlor]);
    }
    setModalVisible(false);
  };

  // Paginación
  const totalPaginas = Math.ceil(flores.length / floresPorPagina);
  const indiceInicial = (paginaActual - 1) * floresPorPagina;
  const indiceFinal = indiceInicial + floresPorPagina;
  const floresVisibles = flores.slice(indiceInicial, indiceFinal);
  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) setPaginaActual(nuevaPagina);
  };

  return (
    <div className="bandeja-container">
      <div className="bandeja-header">
        <h2>Bandeja de Flores</h2>
        {rolUsuario === "admin" && (
          <div className="bandeja-buttons">
            <button onClick={abrirModalCrear}>Crear Flor</button>
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
              <th>Color</th>
              <th>Significado</th>
              <th>Precio</th>
              {rolUsuario === "admin" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {floresVisibles.map((f) => (
              <tr key={f.id_flor}>
                <td>{f.id_flor}</td>
                <td>{f.nombre}</td>
                <td>{f.color}</td>
                <td>{f.significado}</td>
                <td>{f.precio}</td>
                {rolUsuario === "admin" && (
                  <td>
                    <button onClick={() => abrirModalEditar(f)}>✏️</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móvil */}
      <div className="cards-container">
        {floresVisibles.map((f) => (
          <div className="card-item" key={f.id_flor}>
            <h3>{f.nombre}</h3>
            <p>Color: {f.color}</p>
            <p>Significado: {f.significado}</p>
            <p>Precio: Bs {f.precio}</p>
            {rolUsuario === "admin" && <button onClick={() => abrirModalEditar(f)}>Editar</button>}
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

      {modalVisible && <ModalFlor florActual={florActual} onGuardar={guardarFlor} onCerrar={() => setModalVisible(false)} />}
    </div>
  );
}