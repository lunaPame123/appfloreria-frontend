import { useState, useEffect } from "react";
import type { Ramo } from "../Types/RamoTypes";

type Props = {
  ramoActual?: Ramo;
  onGuardar: (ramo: Ramo) => void;
  onCerrar: () => void;
  idUsuario: number; // usuario logueado
};

export default function ModalRamo({ ramoActual, onGuardar, onCerrar, idUsuario }: Props) {
  const [costo, setCosto] = useState<number>(0);

  useEffect(() => {
    if (ramoActual) {
      setCosto(ramoActual.costo_total);
    } else {
      setCosto(0);
    }
  }, [ramoActual]);

  const manejarGuardar = () => {
    if (costo <= 0) {
      alert("El costo debe ser mayor que 0");
      return;
    }

    // Creamos el objeto asegurando que id_usuario no sea undefined
    const ramoConUsuario: Ramo = {
      ...ramoActual,
      id_usuario: ramoActual?.id_usuario ?? idUsuario,
      costo_total: costo,
    };

    onGuardar(ramoConUsuario);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: 20,
          borderRadius: 12,
          width: 350,
        }}
      >
        <h3 style={{ color: "#b3869b", marginBottom: 12 }}>
          {ramoActual ? "Editar Ramo" : "Crear Ramo"}
        </h3>
        <input
          type="number"
          placeholder="Costo total"
          value={costo}
          onChange={(e) => setCosto(Number(e.target.value))}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #b3869b",
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onCerrar}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: "#9d8c86",
              color: "white",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={manejarGuardar}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: "#b3869b",
              color: "white",
              cursor: "pointer",
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}