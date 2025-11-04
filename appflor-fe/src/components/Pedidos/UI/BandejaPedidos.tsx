import { useState, useEffect } from "react";
import ModalPedido from "./ModalPedido";
import type { Pedido } from "../Types/PedidosTypes";

type Props = {
  idUsuario: number; // usuario logueado
};

export default function BandejaPedidos({ idUsuario }: Props) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoActual, setPedidoActual] = useState<Pedido | null>(null);

  // Simula obtener datos de una API
  const obtenerPedidos = async () => {
    // Por ahora usamos datos dummy
    const data: Pedido[] = [
      { id_pedido: 1, total: 150, id_usuario: idUsuario, fecha: "2025-10-27", estado: "Pendiente" },
      { id_pedido: 2, total: 200, id_usuario: idUsuario, fecha: "2025-10-26", estado: "Entregado" },
    ];
    setPedidos(data);
  };

  useEffect(() => {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to bottom, #b1c2a3, #9d8c86)", // paleta Winter Bloom
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#3a412f" }}>Bandeja de Pedidos</h2>
        <button
          onClick={abrirModalCrear}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#b3869b",
            color: "white",
            cursor: "pointer",
          }}
        >
          Crear Pedido
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 600,
            background: "white",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ background: "#b3869b", color: "white" }}>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Total</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Fecha</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Estado</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id_pedido} style={{ background: "#e0f2fe", color: "#3a412f" }}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{p.id_pedido}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{p.total}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{p.fecha}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{p.estado}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <button
                    onClick={() => abrirModalEditar(p)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "none",
                      background: "#9d8c86",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <ModalPedido
          pedidoActual={pedidoActual}
          onGuardar={guardarPedido}
          onCerrar={() => setModalVisible(false)}
          idUsuario={idUsuario} // <-- usuario logueado
        />
      )}
    </div>
  );
}
