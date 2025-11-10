import { useState } from "react";
import type { Ramo } from "../../Ramos/Types/RamoTypes";
import type { Flor } from "../../Flores/Types/FlorTypes";
import ModalRamo from "./ModalRamo";
import "../../../InicioCliente.css";

type Props = {
  idUsuario: number;
  floresDisponibles: Flor[];
  darkMode?: boolean;
};

export default function RamosCliente({ idUsuario, floresDisponibles, darkMode }: Props) {
  const [ramos, setRamos] = useState<Ramo[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ramoActual, setRamoActual] = useState<Ramo | null>(null);

  const crearRamo = () => {
    const nuevoRamo: Ramo = {
      id_ramo: Date.now(),
      nombre: "",
      id_usuario: idUsuario,
      flores: [],
      costo_total: 0,
      estado: "activo",
      imagen: "",
      fecha: new Date().toISOString(),
      usuarioCreacion: "cliente",
      usuarioModificacion: "",
      fechaCreacion: new Date().toISOString(),
    };
    setRamoActual(nuevoRamo);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setRamoActual(null);
  };

  const guardarRamo = (ramo: Ramo) => {
    setRamos(prev => {
      const existe = prev.find(r => r.id_ramo === ramo.id_ramo);
      if (existe) {
        return prev.map(r => (r.id_ramo === ramo.id_ramo ? ramo : r));
      } else {
        return [...prev, ramo];
      }
    });
    cerrarModal();
  };

  return (
    <div className={`inicio-cliente-container ${darkMode ? "oscuro" : "claro"}`}>
      <div className="crear-ramo">
        <button onClick={crearRamo}>+ Crear nuevo ramo</button>
      </div>

      <div className="galeria-cliente">
        {ramos.map(r => (
          <div key={r.id_ramo} className={`card-cliente ${darkMode ? "oscuro" : ""}`}>
            <img src={r.imagen || "https://via.placeholder.com/150"} alt={r.nombre} />
            <div className="info">
              <span>{r.nombre}</span>
              <span>Bs {r.costo_total}</span>
            </div>
            <button onClick={() => { setRamoActual(r); setModalAbierto(true); }}>Editar</button>
          </div>
        ))}
      </div>

      {modalAbierto && ramoActual && (
        <ModalRamo
          ramoActual={ramoActual}
          onCerrar={cerrarModal}
          onGuardar={guardarRamo}
          idUsuario={idUsuario}
          floresDisponibles={floresDisponibles}
          rolUsuario="cliente"
          darkMode={darkMode || false}
        />
      )}
    </div>
  );
}
