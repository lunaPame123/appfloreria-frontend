import { useState, useEffect } from "react";
import type { Pedido } from "../Types/PedidosTypes";

type Props = {
  pedidoActual: Pedido | null;
  onGuardar: (pedido: Pedido) => void;
  onCerrar: () => void;
  idUsuario: number; // usuario logueado
};

export default function ModalPedido({ pedidoActual, onGuardar, onCerrar, idUsuario }: Props) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (pedidoActual) setTotal(pedidoActual.total);
    else setTotal(0);
  }, [pedidoActual]);

  const manejarGuardar = () => {
    if (!total || !idUsuario) {
      alert("Faltan datos para guardar el pedido");
      return;
    }

    onGuardar({
      ...pedidoActual,
      total,
      id_usuario: idUsuario, // ahora siempre tiene valor
    });
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
          {pedidoActual ? "Editar Pedido" : "Crear Pedido"}
        </h3>
        <input
          type="number"
          placeholder="Total del pedido"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
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
