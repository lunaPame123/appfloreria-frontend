import { useState, useEffect } from "react";
import type { UsuarioType } from "./Usuario.ts";

type modalType = {
  usuarioActual: UsuarioType | null;
  guardarUsuario: (usuario: UsuarioType) => void;
  cerrarModal: () => void;
};
export default function ModalUsuarios({ usuarioActual, guardarUsuario, cerrarModal }: modalType) {
  // --- Estados locales para los campos del formulario ---
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    if (usuarioActual) {
      setNombre(usuarioActual.firstName || "");
      setApellido(usuarioActual.lastName || "");
      setEmail(usuarioActual.email || "");
      setPassword(usuarioActual.password || "");
      setRol(usuarioActual.role || "");
    } else {
      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");
      setRol("");
    }
  }, [usuarioActual]);

   // Guardar usuario
  const manejarGuardar = () => {
    if (!nombre || !apellido || !email || !password || !rol) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Creamos un objeto con los datos del formulario
    const usuario: UsuarioType = {
      id: usuarioActual ? usuarioActual.id : 0, // 0 se reemplazará al agregar nuevo
      firstName: nombre,
      lastName: apellido,
      email,
      password,
      role: rol,
    };

    guardarUsuario(usuario);
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
          backgroundColor: "white",
          padding: 20,
          borderRadius: 12,
          width: 350,
        }}
      >
        <h3 style={{ color: "#4c6ef5", marginBottom: 12 }}>
          {usuarioActual ? "Editar Usuario" : "Crear Usuario"}
        </h3>
        {/* Campos de formulario */}
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
            border: "1px solid #4c6ef5",
          }}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #4c6ef5",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #4c6ef5",
          }}
        />
        <input
          type="text"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #4c6ef5",
          }}
        />
        <input
          type="text"
          placeholder="Rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #4c6ef5",
          }}
        />
        
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={cerrarModal}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: "#ef4444",
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
              background: "#4c6ef5",
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

