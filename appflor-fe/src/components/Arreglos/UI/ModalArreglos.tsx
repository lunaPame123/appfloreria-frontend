import { useState, useEffect } from "react";
import type { Arreglo } from "../Types/ArregloTypes";

type Props = {
  arregloActual: Arreglo | null;
  onGuardar: (arreglo: Arreglo) => void;
  onCerrar: () => void;
};

export default function ModalArreglo({ arregloActual, onGuardar, onCerrar }: Props) {
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
          width: 400,
        }}
      >
        <h3 style={{ color: "#3a412f", marginBottom: 12 }}>
          {arregloActual ? "Editar Arreglo" : "Crear Arreglo"}
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
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #3a412f" }}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #3a412f" }}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #3a412f" }}
        />
        <input
          type="text"
          placeholder="URL de Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
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
