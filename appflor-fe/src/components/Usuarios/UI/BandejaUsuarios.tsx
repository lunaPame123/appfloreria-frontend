import { useState, useEffect } from "react";
import ModalUsuarios from "./ModalUsuarios";
import type { Usuario, NuevoUsuario } from "../Types/UsuarioTypes";
import "./Bandeja.css";

type Props = {
  onLogout: () => void;
  rolUsuario: "admin" | "cliente";
};

export default function BandejaUsuarios({ rolUsuario }: Props) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);

  const obtenerUsuarios = async () => {
    const resultado = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await resultado.json();
    const usuariosFormateados: Usuario[] = data.map((u: any) => ({
      id_usuario: u.id,
      nombre: u.name,
      correo: u.email,
      rol: "cliente",
    }));
    setUsuarios(usuariosFormateados);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const abrirModalCrear = () => {
    setUsuarioActual(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (usuario: Usuario) => {
    setUsuarioActual(usuario);
    setModalVisible(true);
  };

  const guardarUsuario = (usuario: Usuario | NuevoUsuario) => {
    if ("id_usuario" in usuario) {
      setUsuarios(
        usuarios.map((u) => (u.id_usuario === usuario.id_usuario ? usuario : u))
      );
    } else {
      const nuevoUsuario = { ...usuario, id_usuario: usuarios.length + 1 };
      setUsuarios([...usuarios, nuevoUsuario]);
    }
    setModalVisible(false);
  };

  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 6;

  // Calcular los usuarios visibles en esta página
  const indiceInicial = (paginaActual - 1) * usuariosPorPagina;
  const indiceFinal = indiceInicial + usuariosPorPagina;
  const usuariosVisibles = usuarios.slice(indiceInicial, indiceFinal);

  // Cambiar de página
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="bandeja-container">
    {/* Header */}
    <div className="bandeja-header">
      <h2>Bandeja de Usuarios</h2>
      {rolUsuario === "admin" && (
        <div className="bandeja-buttons">
          <button onClick={abrirModalCrear} className="card-btn">
            Crear Usuario
          </button>
        </div>
      )}
    </div>

    {/* Tabla */}
    <table className="usuarios-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          {rolUsuario === "admin" && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
      {usuariosVisibles.map((u) => (
        <tr key={u.id_usuario}>
          <td data-label="ID">{u.id_usuario}</td>
          <td data-label="Nombre">{u.nombre}</td>
          <td data-label="Correo">{u.correo}</td>
          {rolUsuario === "admin" && (
            <td data-label="Acciones">
              <button onClick={() => abrirModalEditar(u)}title="Editar">✏️</button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>

  <div className="paginacion">
    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
      ⬅ Anterior
    </button>
    <span>Página {paginaActual} de {totalPaginas}</span>
    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
      Siguiente ➡
    </button>
  </div>

  {/* Modal */}
  {modalVisible && (
    <ModalUsuarios
      usuarioActual={usuarioActual}
      onGuardar={guardarUsuario}
      onCerrar={() => setModalVisible(false)}
    />
  )}
</div>

  );
}
