import { useState, useEffect } from "react";
import ModalUsuarios from "./ModalUsuarios";
import type { Usuario, NuevoUsuario } from "../Types/UsuarioTypes";
import "../../../styles/Bandeja.css";

type Props = {
  onLogout: () => void;
  rolUsuario: "admin" | "cliente";
};

export default function BandejaUsuarios({ rolUsuario }: Props) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 6;

  useEffect(() => {
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
      setUsuarios(usuarios.map((u) => (u.id_usuario === usuario.id_usuario ? usuario : u)));
    } else {
      const nuevoUsuario = { ...usuario, id_usuario: usuarios.length + 1 };
      setUsuarios([...usuarios, nuevoUsuario]);
    }
    setModalVisible(false);
  };

  // Paginación
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
  const indiceInicial = (paginaActual - 1) * usuariosPorPagina;
  const indiceFinal = indiceInicial + usuariosPorPagina;
  const usuariosVisibles = usuarios.slice(indiceInicial, indiceFinal);
  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) setPaginaActual(nuevaPagina);
  };

  return (
    <div className="bandeja-container">
      <div className="bandeja-header">
        <h2>Bandeja de Usuarios</h2>
        {rolUsuario === "admin" && (
          <div className="bandeja-buttons">
            <button onClick={abrirModalCrear}>Crear Usuario</button>
          </div>
        )}
      </div>

      {/* Tabla para escritorio */}
      <div className="table-container">
        <table className="bandeja-table">
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
                <td>{u.id_usuario}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                {rolUsuario === "admin" && (
                  <td>
                    <button onClick={() => abrirModalEditar(u)}>✏️</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móvil */}
      <div className="cards-container">
        {usuariosVisibles.map((u) => (
          <div className="card-item" key={u.id_usuario}>
            <h3>{u.nombre}</h3>
            <p>{u.correo}</p>
            {rolUsuario === "admin" && <button onClick={() => abrirModalEditar(u)}>Editar</button>}
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="paginacion">
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          ⬅ Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
          Siguiente ➡
        </button>
      </div>

      {modalVisible && (
        <ModalUsuarios usuarioActual={usuarioActual} onGuardar={guardarUsuario} onCerrar={() => setModalVisible(false)} />
      )}
    </div>
  );
}