import { useState, useEffect } from "react";
import type { Usuario, NuevoUsuario } from "../Types/UsuarioTypes";

type Props = {
  usuarioActual: Usuario | null;
  onGuardar: (usuario: Usuario | NuevoUsuario) => void;
  onCerrar: () => void;
};

export default function ModalUsuarios({ usuarioActual, onGuardar, onCerrar }: Props) {
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
          {usuarioActual ? "Editar Usuario" : "Crear Usuario"}
        </h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #3a412f",
          }}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #3a412f",
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onCerrar}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: "#626b52",
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
              background: "#3a412f",
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
