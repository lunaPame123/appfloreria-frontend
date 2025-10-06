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
            ? { ...u, ...usuario }
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
    <div>
      {/* Encabezado y botones */}
      <div>
        <h1>Bandeja de Usuarios</h1>
        <div>
          <button onClick={() => setSeleccionarUsuario(true)}>Editar Usuario</button>
          <button
            onClick={() => {
              setUsuarioActual(null);
              setModalVisible(true);
            }}
          >
            Crear Usuario
          </button>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      </div>

      {/* Selector para editar */}
      {seleccionarUsuario && (
        <div>
          <select
            value={usuarioActual ? usuarioActual.id : ""}
            onChange={(e) => {
              const id = Number(e.target.value);
              const seleccionado = usuarios.find((u) => u.id === id);
              setUsuarioActual(seleccionado || null);
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
          >
            Abrir Modal
          </button>
        </div>
      )}

      {/* Tabla de usuarios */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.password}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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
