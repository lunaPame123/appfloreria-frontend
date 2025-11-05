import { useState, useEffect } from "react";
import { type Flor } from "../Types/FlorTypes";
import "../../../styles/Modal.css";

type Props = {
  florActual: Flor | null;
  onGuardar: (flor: Flor) => void;
  onCerrar: () => void;
  darkMode: boolean;
};

export default function ModalFlor({ florActual, onGuardar, onCerrar, darkMode }: Props) {
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
    <div className="modal-overlay">
      <div className={`modal-container ${darkMode ? "oscuro" : ""}`}>
        <h3 className="modal-title">{florActual ? "Editar Flor" : "Crear Flor"}</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Significado"
          value={significado}
          onChange={(e) => setSignificado(e.target.value)}
          className="modal-input"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button onClick={onCerrar} className="modal-button-cancel">Cancelar</button>
          <button onClick={manejarGuardar} className="modal-button-save">Guardar</button>
        </div>
      </div>
    </div>
  );
}
