import { useState, useEffect } from "react";
import ModalFlor from "./ModalFlores";
import type { Flor } from "../Types/FlorTypes";
import "../../../styles/Bandeja.css";

type Props = {
  rolUsuario: "admin" | "cliente";
  darkMode: boolean;
};

export default function BandejaFlores({ rolUsuario, darkMode }: Props) {
  const [flores, setFlores] = useState<Flor[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [florActual, setFlorActual] = useState<Flor | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const floresPorPagina = 6;

  useEffect(() => {
    const data: Flor[] = [
      { id_flor: 1, nombre: "Hortensia Azul", color: "Azul", significado: "Gratitud", precio: 15 },
      { id_flor: 2, nombre: "Rosa Roja", color: "Rojo", significado: "Amor", precio: 10 },
      { id_flor: 3, nombre: "Lirio Blanco", color: "Blanco", significado: "Pureza", precio: 20 },
      { id_flor: 4, nombre: "Tulipán Amarillo", color: "Amarillo", significado: "Alegría", precio: 12 },
      { id_flor: 5, nombre: "Girasol", color: "Amarillo", significado: "Felicidad", precio: 18 },
      { id_flor: 6, nombre: "Margarita", color: "Blanco", significado: "Inocencia", precio: 8 },
      { id_flor: 7, nombre: "Orquídea", color: "Morado", significado: "Elegancia", precio: 25 },
    ];
    setFlores(data);
  }, []);

  const abrirModalCrear = () => { setFlorActual(null); setModalVisible(true); };
  const abrirModalEditar = (flor: Flor) => { setFlorActual(flor); setModalVisible(true); };
  const guardarFlor = (flor: Flor) => {
    if (flor.id_flor) {
      setFlores(flores.map(f => (f.id_flor === flor.id_flor ? flor : f)));
    } else {
      const nuevaFlor = { ...flor, id_flor: flores.length + 1 };
      setFlores([...flores, nuevaFlor]);
    }
    setModalVisible(false);
  };

  // Paginación
  const totalPaginas = Math.ceil(flores.length / floresPorPagina);
  const indiceInicial = (paginaActual - 1) * floresPorPagina;
  const floresVisibles = flores.slice(indiceInicial, indiceInicial + floresPorPagina);

  return (
    <div className={`bandeja-container ${darkMode ? "oscuro" : "claro"}`}>
      <h2>Bandeja de Flores</h2>
      {rolUsuario === "admin" && <button onClick={abrirModalCrear}>Crear Flor</button>}

      {/* Tabla escritorio */}
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
            {floresVisibles.map(f => (
              <tr key={f.id_flor}>
                <td>{f.id_flor}</td>
                <td>{f.nombre}</td>
                <td>{f.color}</td>
                <td>{f.significado}</td>
                <td>{f.precio}</td>
                {rolUsuario === "admin" && (
                  <td><button onClick={() => abrirModalEditar(f)}>✏️</button></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards móvil */}
      <div className="cards-container">
        {floresVisibles.map(f => (
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
        <button onClick={() => setPaginaActual(p => Math.max(1, p-1))} disabled={paginaActual===1}>⬅ Anterior</button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button onClick={() => setPaginaActual(p => Math.min(totalPaginas, p+1))} disabled={paginaActual===totalPaginas}>Siguiente ➡</button>
      </div>

      {modalVisible && <ModalFlor florActual={florActual} onGuardar={guardarFlor} onCerrar={() => setModalVisible(false)} darkMode={darkMode}/>}
    </div>
  );
}
