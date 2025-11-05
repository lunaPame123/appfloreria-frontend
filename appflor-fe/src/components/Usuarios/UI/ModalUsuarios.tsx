import { useState, useEffect } from "react";
import type { Usuario, NuevoUsuario } from "../Types/UsuarioTypes";
import "../../../styles/Modal.css";

type Props = {
  usuarioActual: Usuario | null;
  onGuardar: (usuario: Usuario | NuevoUsuario) => void;
  onCerrar: () => void;
  darkMode: boolean;
};

export default function ModalUsuarios({ usuarioActual, onGuardar, onCerrar, darkMode }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    if (usuarioActual) {
      setNombre(usuarioActual.nombre);
      setCorreo(usuarioActual.correo);
    } else {
      setNombre("");
      setCorreo("");
    }
  }, [usuarioActual]);

  const manejarGuardar = () => {
    if (!nombre || !correo) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (usuarioActual) {
      // Editar
      onGuardar({ ...usuarioActual, nombre, correo });
    } else {
      // Crear
      const nuevoUsuario: NuevoUsuario = { nombre, correo, rol: "cliente" };
      onGuardar(nuevoUsuario);
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${darkMode ? "oscuro" : "claro"}`}>
        <h3 className="modal-title">{usuarioActual ? "Editar Usuario" : "Crear Usuario"}</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="modal-input"
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
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
