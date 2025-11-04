import { useState } from "react";
import ModalRamo from "./ModalRamo";
import type { Ramo } from "../Types/RamoTypes";

type Props = {
  idUsuario: number; // usuario logueado
};

export default function BandejaRamos({ idUsuario }: Props) {
  const [ramos, setRamos] = useState<Ramo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [ramoActual, setRamoActual] = useState<Ramo | undefined>(undefined);

  const abrirModalCrear = () => {
    setRamoActual(undefined);
    setModalVisible(true);
  };

  const abrirModalEditar = (ramo: Ramo) => {
    setRamoActual(ramo);
    setModalVisible(true);
  };

  const guardarRamo = (ramo: Ramo) => {
    if (ramo.id_ramo) {
      // Editar
      setRamos(ramos.map(r => (r.id_ramo === ramo.id_ramo ? ramo : r)));
    } else {
      // Crear
      const nuevoRamo = { ...ramo, id_ramo: ramos.length + 1 };
      setRamos([...ramos, nuevoRamo]);
    }
    setModalVisible(false);
  };

  return (
    <div style={{ padding: 20, minHeight: "100vh", background: "#e0f2fe" }}>
      <h1 style={{ color: "#b3869b" }}>Ramos Personalizados</h1>
      <button
        onClick={abrirModalCrear}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "none",
          background: "#b3869b",
          color: "white",
          cursor: "pointer",
          marginBottom: 10,
        }}
      >
        Crear Ramo
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#9d8c86", color: "white" }}>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Costo</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Usuario</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ramos.map((r) => (
            <tr key={r.id_ramo} style={{ background: "#b1c2a3", color: "#3a412f" }}>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{r.id_ramo}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{r.costo_total}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{r.id_usuario}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                <button
                  onClick={() => abrirModalEditar(r)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    border: "none",
                    background: "#b3869b",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <ModalRamo
          ramoActual={ramoActual}
          onGuardar={guardarRamo}
          onCerrar={() => setModalVisible(false)}
          idUsuario={idUsuario} // <-- usuario logueado
        />
      )}
    </div>
  );
}
