import { useState, useEffect } from "react";
import ModalPedido from "./ModalPedido";
import type { Pedido } from "../Types/PedidosTypes";
import "../../../styles/Bandeja.css";

type Props = {
  idUsuario: number;
  darkMode: boolean;
};

export default function BandejaPedidos({ idUsuario, darkMode }: Props) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoActual, setPedidoActual] = useState<Pedido | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 6;

  useEffect(() => {
    const obtenerPedidos = async () => {
      const data: Pedido[] = [
        { id_pedido: 1, total: 150, id_usuario: idUsuario, fecha: "2025-10-27", estado: "Pendiente" },
        { id_pedido: 2, total: 200, id_usuario: idUsuario, fecha: "2025-10-26", estado: "Entregado" },
      ];
      setPedidos(data);
    };
    obtenerPedidos();
  }, []);

  const abrirModalCrear = () => {
    setPedidoActual(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (pedido: Pedido) => {
    setPedidoActual(pedido);
    setModalVisible(true);
  };

  const guardarPedido = (pedido: Pedido) => {
    if (pedido.id_pedido) {
      // Editar
      setPedidos(pedidos.map(p => (p.id_pedido === pedido.id_pedido ? pedido : p)));
    } else {
      // Crear
      const nuevoPedido = { ...pedido, id_pedido: pedidos.length + 1 };
      setPedidos([...pedidos, nuevoPedido]);
    }
    setModalVisible(false);
  };

  // Paginación
  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);
  const indiceInicial = (paginaActual - 1) * pedidosPorPagina;
  const indiceFinal = indiceInicial + pedidosPorPagina;
  const pedidosVisibles = pedidos.slice(indiceInicial, indiceFinal);

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) setPaginaActual(nuevaPagina);
  };

  return (
    <div className={`bandeja-container ${darkMode ? "oscuro" : "claro"}`}>
      <div className="bandeja-header">
        <h2>Bandeja de Pedidos</h2>
        <button onClick={abrirModalCrear}>Crear Pedido</button>
      </div>

      {/* Tabla para escritorio */}
      <div className="table-container">
        <table className="bandeja-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosVisibles.map(p => (
              <tr key={p.id_pedido}>
                <td>{p.id_pedido}</td>
                <td>{p.total}</td>
                <td>{p.fecha}</td>
                <td>{p.estado}</td>
                <td>
                  <button onClick={() => abrirModalEditar(p)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móvil */}
      <div className="cards-container">
        {pedidosVisibles.map(p => (
          <div className="card-item" key={p.id_pedido}>
            <p><strong>ID:</strong> {p.id_pedido}</p>
            <p><strong>Total:</strong> ${p.total}</p>
            <p><strong>Fecha:</strong> {p.fecha}</p>
            <p><strong>Estado:</strong> {p.estado}</p>
            <button onClick={() => abrirModalEditar(p)}>Editar</button>
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

      {modalVisible && <ModalPedido pedidoActual={pedidoActual} onGuardar={guardarPedido} onCerrar={() => setModalVisible(false)} idUsuario={idUsuario} darkMode={darkMode} />}
    </div>
  );
}
