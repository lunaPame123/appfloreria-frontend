import { useState, useEffect } from "react";
import ModalFlor from "./ModalFlores";
import type { Flor } from "../Types/FlorTypes";

type Props = {
  rolUsuario: "admin" | "cliente";
};

export default function BandejaFlores({ rolUsuario }: Props) {
  const [flores, setFlores] = useState<Flor[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [florActual, setFlorActual] = useState<Flor | null>(null);

  const obtenerFlores = async () => {
    // Simulación de API
    const data: Flor[] = [
      { id_flor: 1, nombre: "Hortensia Azul", color: "Azul", significado: "Gratitud", precio: 15 },
      { id_flor: 2, nombre: "Rosa Roja", color: "Rojo", significado: "Amor", precio: 10 },
    ];
    setFlores(data);
  };

  useEffect(() => {
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

  return (
    <div style={{ minHeight: "100vh", width: "100vw", padding: 20, fontFamily: "Arial, sans-serif", background: "linear-gradient(to bottom, #b3869b, #9d8c86)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ color: "#3a412f" }}>Bandeja de Flores</h1>
        {rolUsuario === "admin" && (
          <button
            onClick={abrirModalCrear}
            style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#b1c2a3", color: "#3a412f", cursor: "pointer" }}
          >
            Crear Flor
          </button>
        )}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, background: "white", borderRadius: 8, overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "#626b52", color: "white" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Nombre</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Color</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Significado</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Precio</th>
              {rolUsuario === "admin" && <th style={{ border: "1px solid #ccc", padding: "8px" }}>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {flores.map((f) => (
              <tr key={f.id_flor} style={{ background: "#b1c2a3", color: "#3a412f" }}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{f.id_flor}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{f.nombre}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{f.color}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{f.significado}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{f.precio}</td>
                {rolUsuario === "admin" && (
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    <button
                      onClick={() => abrirModalEditar(f)}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: "#3a412f", color: "white", cursor: "pointer" }}
                    >
                      Editar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && <ModalFlor florActual={florActual} onGuardar={guardarFlor} onCerrar={() => setModalVisible(false)} />}
    </div>
  );
}