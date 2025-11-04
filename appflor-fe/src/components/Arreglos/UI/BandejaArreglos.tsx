import { useState, useEffect } from "react";
import ModalArreglo from "./ModalArreglos";
import type { Arreglo } from "../Types/ArregloTypes";

type Props = {
  rolUsuario: "admin" | "cliente";
};

export default function BandejaArreglos({ rolUsuario }: Props) {
  const [arreglos, setArreglos] = useState<Arreglo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [arregloActual, setArregloActual] = useState<Arreglo | null>(null);

  const obtenerArreglos = async () => {
    // Simulación de API
    const data: Arreglo[] = [
      { id_arreglo: 1, nombre: "Arreglo Primavera", descripcion: "Flores variadas de primavera", precio: 25, categoria: "Primavera", imagen: "" },
      { id_arreglo: 2, nombre: "Arreglo Verano", descripcion: "Flores coloridas de verano", precio: 30, categoria: "Verano", imagen: "" },
    ];
    setArreglos(data);
  };

  useEffect(() => {
    obtenerArreglos();
  }, []);

  const abrirModalCrear = () => {
    setArregloActual(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (arreglo: Arreglo) => {
    setArregloActual(arreglo);
    setModalVisible(true);
  };

  const guardarArreglo = (arreglo: Arreglo) => {
    if (arreglo.id_arreglo) {
      setArreglos(arreglos.map((a) => (a.id_arreglo === arreglo.id_arreglo ? arreglo : a)));
    } else {
      const nuevoArreglo = { ...arreglo, id_arreglo: arreglos.length + 1 };
      setArreglos([...arreglos, nuevoArreglo]);
    }
    setModalVisible(false);
  };

  return (
    <div style={{ minHeight: "100vh", width: "100vw", padding: 20, fontFamily: "Arial, sans-serif", background: "linear-gradient(to bottom, #b3869b, #9d8c86)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ color: "#3a412f" }}>Bandeja de Arreglos</h1>
        {rolUsuario === "admin" && (
          <button
            onClick={abrirModalCrear}
            style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#b1c2a3", color: "#3a412f", cursor: "pointer" }}
          >
            Crear Arreglo
          </button>
        )}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, background: "white", borderRadius: 8, overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "#626b52", color: "white" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Nombre</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Descripción</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Precio</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Categoría</th>
              {rolUsuario === "admin" && <th style={{ border: "1px solid #ccc", padding: "8px" }}>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {arreglos.map((a) => (
              <tr key={a.id_arreglo} style={{ background: "#b1c2a3", color: "#3a412f" }}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.id_arreglo}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.nombre}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.descripcion}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.precio}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.categoria}</td>
                {rolUsuario === "admin" && (
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    <button
                      onClick={() => abrirModalEditar(a)}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: "#3a412f", color: "white", cursor: "pointer" }}
                    >
                      Editar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && <ModalArreglo arregloActual={arregloActual} onGuardar={guardarArreglo} onCerrar={() => setModalVisible(false)} />}
    </div>
  );
}