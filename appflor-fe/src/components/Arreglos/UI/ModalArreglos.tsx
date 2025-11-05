import { useState, useEffect } from "react";
import type { Arreglo } from "../Types/ArregloTypes";
import "../../../styles/Modal.css";

type Props = {
  arregloActual: Arreglo | null;
  onGuardar: (arreglo: Arreglo) => void;
  onCerrar: () => void;
  darkMode: boolean;
};

export default function ModalArreglo({ arregloActual, onGuardar, onCerrar, darkMode }: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    if (arregloActual) {
      setNombre(arregloActual.nombre);
      setDescripcion(arregloActual.descripcion);
      setPrecio(arregloActual.precio);
      setCategoria(arregloActual.categoria);
      setImagen(arregloActual.imagen || "");
    } else {
      setNombre("");
      setDescripcion("");
      setPrecio(0);
      setCategoria("");
      setImagen("");
    }
  }, [arregloActual]);

  const manejarGuardar = () => {
    if (!nombre || !descripcion || precio <= 0 || !categoria || !imagen) {
      alert("Todos los campos son obligatorios y el precio debe ser mayor que 0");
      return;
    }
    onGuardar({ ...arregloActual, nombre, descripcion, precio, categoria, imagen });
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${darkMode ? "oscuro" : ""}`}>
        <h3 className="modal-title">{arregloActual ? "Editar Arreglo" : "Crear Arreglo"}</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="modal-input"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="URL de Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
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
