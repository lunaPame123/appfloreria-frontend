import { useState, useEffect } from "react";
import type { Pedido } from "../Types/PedidosTypes";
import "../../../styles/Modal.css";

type Props = {
  pedidoActual: Pedido | null;
  onGuardar: (pedido: Pedido) => void;
  onCerrar: () => void;
  idUsuario: number; // usuario logueado
};

export default function ModalPedido({ pedidoActual, onGuardar, onCerrar, idUsuario }: Props) {
  const [total, setTotal] = useState(0);
  const [estado, setEstado] = useState("Pendiente");

  useEffect(() => {
    if (pedidoActual) {
      setTotal(pedidoActual.total);
      setEstado(pedidoActual.estado || "Pendiente");
    } else {
      setTotal(0);
      setEstado("Pendiente");
    }
  }, [pedidoActual]);

  const manejarGuardar = () => {
    if (!total || !idUsuario) {
      alert("Faltan datos para guardar el pedido");
      return;
    }

    onGuardar({
      ...pedidoActual,
      total,
      estado,
      id_usuario: idUsuario,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">{pedidoActual ? "Editar Pedido" : "Crear Pedido"}</h3>
        <input
          type="number"
          placeholder="Total del pedido"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="modal-input"
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="modal-select"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <div className="modal-buttons">
          <button onClick={onCerrar} className="modal-button-cancel">Cancelar</button>
          <button onClick={manejarGuardar} className="modal-button-save">Guardar</button>
        </div>
      </div>
    </div>
  );
}
