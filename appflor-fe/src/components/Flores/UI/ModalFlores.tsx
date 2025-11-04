import { useState, useEffect } from "react";
import { type Flor } from "../Types/FlorTypes";

type Props = {
  florActual: Flor | null;
  onGuardar: (flor: Flor) => void;
  onCerrar: () => void;
};

export default function ModalFlor({ florActual, onGuardar, onCerrar }: Props) {
  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState("");
  const [significado, setSignificado] = useState("");
  const [precio, setPrecio] = useState(0);

  useEffect(() => {
    if (florActual) {
      setNombre(florActual.nombre);
      setColor(florActual.color);
      setSignificado(florActual.significado || "");
      setPrecio(florActual.precio);
    } else {
      setNombre("");
      setColor("");
      setSignificado("");
      setPrecio(0);
    }
  }, [florActual]);

  const manejarGuardar = () => {
    if (!nombre || !color || !significado || precio <= 0) {
      alert("Todos los campos son obligatorios y el precio debe ser mayor que 0");
      return;
    }
    onGuardar({ ...florActual, nombre, color, significado, precio });
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
          backgroundColor: "#b3869b",
          padding: 20,
          borderRadius: 12,
          width: 350,
        }}
      >
        <h3 style={{ color: "#3a412f", marginBottom: 12 }}>
          {florActual ? "Editar Flor" : "Crear Flor"}
        </h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #3a412f" }}
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #3a412f" }}
        />
        <input
          type="text"
          placeholder="Significado"
          value={significado}
          onChange={(e) => setSignificado(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #3a412f" }}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #3a412f" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onCerrar}
            style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#626b52", color: "white", cursor: "pointer" }}
          >
            Cancelar
          </button>
          <button
            onClick={manejarGuardar}
            style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#3a412f", color: "white", cursor: "pointer" }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
