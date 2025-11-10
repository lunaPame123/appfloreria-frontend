import { useState } from "react";
import type { Ramo } from "../../Ramos/Types/RamoTypes";
import type { Flor } from "../../Flores/Types/FlorTypes";
import ModalRamo from "./ModalRamo";
import "../../../styles/Bandeja.css";

type Props = {
  ramosIniciales: Ramo[];
  floresDisponibles: Flor[];
  darkMode?: boolean;
};

export default function BandejaRamos({ ramosIniciales, floresDisponibles, darkMode }: Props) {
  const [ramos] = useState<Ramo[]>(ramosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ramoActual, setRamoActual] = useState<Ramo | null>(null);

  // PAGINACIÓN
  const [pagina, setPagina] = useState(1);
  const ramosPorPagina = 5;
  const totalPaginas = Math.ceil(ramos.length / ramosPorPagina);
  const ramosMostrados = ramos.slice(
    (pagina - 1) * ramosPorPagina,
    pagina * ramosPorPagina
  );

  const abrirModal = (ramo: Ramo) => {
    setRamoActual(ramo);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setRamoActual(null);
  };

  const manejarPagina = (nueva: number) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPagina(nueva);
  };

  return (
    <div className={`bandeja-container ${darkMode ? "oscuro" : ""}`}>
      <div className="bandeja-header">
        <h2>Ramos creados por clientes</h2>
      </div>

      {ramos.length === 0 ? (
        <p>No hay ramos registrados aún.</p>
      ) : (
        <>
          {/* TABLA para pantallas grandes */}
          <div className="table-container">
            <table className="bandeja-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cliente</th>
                  <th>Costo Total (Bs)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ramosMostrados.map(r => (
                  <tr key={r.id_ramo}>
                    <td>{r.nombre}</td>
                    <td>{r.id_usuario}</td>
                    <td>{r.costo_total}</td>
                    <td>
                      <button onClick={() => abrirModal(r)}>👁 Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINACIÓN */}
            <div className="paginacion">
              <button onClick={() => manejarPagina(pagina - 1)} disabled={pagina === 1}>
                ◀
              </button>
              <span>Página {pagina} de {totalPaginas}</span>
              <button onClick={() => manejarPagina(pagina + 1)} disabled={pagina === totalPaginas}>
                ▶
              </button>
            </div>
          </div>

          {/* CARDS para pantallas pequeñas */}
          <div className="cards-container">
            {ramosMostrados.map(r => (
              <div key={r.id_ramo} className="card-item">
                <img
                  src={r.imagen || "https://i.pinimg.com/736x/44/2d/cb/442dcb510c32485d439a838507ffba0f.jpg"}
                  alt={r.nombre}
                  style={{ width: "100%", borderRadius: "12px" }}
                />
                <h3>{r.nombre}</h3>
                <p>Cliente: {r.id_usuario}</p>
                <p>Costo total: Bs {r.costo_total}</p>

                <button onClick={() => abrirModal(r)}>👁 Ver</button>
              </div>
            ))}
          </div>
        </>
      )}

      {modalAbierto && ramoActual && (
        <ModalRamo
          ramoActual={ramoActual}
          onCerrar={cerrarModal}
          onGuardar={() => {}}
          idUsuario={ramoActual.id_usuario}
          floresDisponibles={floresDisponibles}
          rolUsuario="admin"
          darkMode={darkMode || false}
        />
      )}
    </div>
  );
}