import { useState, useEffect } from "react";
import ModalUsuarios from "./ModalUsuarios.tsx";
import type { UsuarioType } from "./Usuario.ts";

export default function BandejaUsuarios({ onLogout }: any) {
  // --- ESTADOS PRINCIPALES ---
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState<UsuarioType | null>(null);
  const [seleccionarUsuario, setSeleccionarUsuario] = useState(false);

  // --- FUNCIÓN PARA OBTENER USUARIOS (desde API falsa) ---
  const obtenerUsuarios = async () => {
    const resultado = await fetch("https://dummyjson.com/users");
    const datos = await resultado.json();
    setUsuarios(datos.users);
  };

  // --- SE CARGA UNA SOLA VEZ AL INICIO ---
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // --- FUNCIÓN PARA GUARDAR O EDITAR USUARIO ---
  const guardarUsuario = (usuario: UsuarioType) => {
    if (usuarioActual && usuarioActual.id) {
      // EDITAR USUARIO EXISTENTE
      setUsuarios(
        usuarios.map((u) =>
          u.id === usuarioActual.id
            ? {
                ...u,
                firstName: usuario.firstName,
                lastName: usuario.lastName,
                email: usuario.email,
                password: usuario.password,
                role: usuario.role,
              }
            : u
        )
      );
    } else {
      // CREAR NUEVO USUARIO
      const nuevoUsuario: UsuarioType = { ...usuario, id: usuarios.length + 1 };
      setUsuarios([...usuarios, nuevoUsuario]);
    }
    setModalVisible(false);
  };

  return (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "Poppins, sans-serif",
      backgroundImage:
        "url('https://img.freepik.com/fotos-premium/flores-hortensia-azul-cerca_196038-693.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      
    }}
  >
    {/* Encabezado y botones */}
    <div
      style={{
        width: "90%",
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
        background: "rgba(255, 255, 255, 0.3)",
        padding: "15px 25px",
        borderRadius: 12,
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#1e3a8a", margin: 0 }}>Bandeja de Usuarios</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setSeleccionarUsuario(true)}
          style={{
            fontFamily: "cursive",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#1b1341",
            color: "white",
            cursor: "pointer",
            fontWeight: 500,
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#004581")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1b1341")}
        >
          Editar Usuario
        </button>
        <button
          onClick={() => {
            setUsuarioActual(null);
            setModalVisible(true);
          }}
          style={{
            fontFamily: "cursive",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#1b1341",
            color: "white",
            cursor: "pointer",
            fontWeight: 500,
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#004581")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1b1341")}
        >
          Crear Usuario
        </button>
        <button
          onClick={onLogout}
          style={{
            fontFamily: "cursive",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#1b1341",
            color: "white",
            cursor: "pointer",
            fontWeight: 500,
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#004581")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1b1341")}
        >
          Cerrar sesión
        </button>
      </div>
    </div>

    {/* Selector para editar */}
    {seleccionarUsuario && (
      <div
        style={{
          fontFamily: "cursive",
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          background: "rgba(255, 255, 255, 0.5)",
          padding: "12px 18px",
          borderRadius: 10,
          backdropFilter: "blur(8px)",
        }}
      >
        <select
          value={usuarioActual ? usuarioActual.id : ""}
          onChange={(e) => {
            const id = Number(e.target.value);
            const seleccionado = usuarios.find((u) => u.id === id);
            setUsuarioActual(seleccionado || null);
          }}
          style={{
            fontFamily: "cursive",
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #3b82f6",
            background: "white",
            fontSize: 14,
            color: "black",
          }}
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            if (!usuarioActual) {
              alert("Selecciona un usuario primero");
              return;
            }
            setModalVisible(true);
            setSeleccionarUsuario(false);
          }}
          style={{
            fontFamily: "cursive",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            background: "#3a4e7a",
            color: "white",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Abrir Modal
        </button>
      </div>
    )}

    {/* Tabla centrada y amplia */}
    <div
      style={{
        width: "90%",
        maxWidth: "1200px",
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: 12,
        overflowX: "auto",
        overflowY: "auto", 
        maxHeight: "60vh",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      }}
    >
      <table
        style={{
          fontFamily: "cursive",
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ background: "#283347", color: "white" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Nombre</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Contraseña</th>
            <th style={{ padding: "12px" }}>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr
              key={u.id}
              style={{
                background: index % 2 === 0 ? "#f4f7fc" : "#dfe7f2",
                color: "#1e3a8a",
                fontFamily: "cursive",
              }}
            >
              <td style={{ padding: "10px" }}>{u.id}</td>
              <td style={{ padding: "10px" }}>{u.firstName} {u.lastName}</td>
              <td style={{ padding: "10px" }}>{u.email}</td>
              <td style={{ padding: "10px" }}>{u.password}</td>
              <td style={{ padding: "10px" }}>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {modalVisible && (
      <ModalUsuarios
        usuarioActual={usuarioActual}
        guardarUsuario={guardarUsuario}
        cerrarModal={() => setModalVisible(false)}
      />
    )}
  </div>
);

}