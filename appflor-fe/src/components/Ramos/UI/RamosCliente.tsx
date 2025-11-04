// RamosCliente.tsx
import { useState, useEffect } from "react";
import type { Ramo } from "../Types/RamoTypes";

type Props = {
  idUsuario: number;
};

export default function RamosCliente({ idUsuario }: Props) {
  const [ramos, setRamos] = useState<Ramo[]>([]);

  useEffect(() => {
    // Simulación de datos, en tu proyecto real los traerías del backend
    const ramosSimulados: Ramo[] = [
      { id_ramo: 1, costo_total: 25, id_usuario: idUsuario, nombre: "Ramo Primavera", imagen: "https://i.pinimg.com/1200x/08/b1/a2/08b1a2668c91cff51a122de8e6698735.jpg" },
      { id_ramo: 2, costo_total: 30, id_usuario: idUsuario, nombre: "Ramo Romántico", imagen: "https://i.pinimg.com/1200x/13/64/fa/1364fa0bb7cd08a670e093b3d6890bdb.jpg" },
      { id_ramo: 3, costo_total: 40, id_usuario: idUsuario, nombre: "Ramo Elegante", imagen: "https://i.pinimg.com/736x/1c/2e/cb/1c2ecbd48285a15625ff393d03a2b6b0.jpg" },
    ];
    setRamos(ramosSimulados);
  }, [idUsuario]);

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <h1 style={{fontSize: "28px", color: "#3a412f", fontFamily: "cursive", marginBottom: "20px" }}>Explora Nuestros Ramos</h1>
      <div
        style={{
          columnCount: 4,
          columnGap: "16px",
        }}
      >
        {ramos.map((r) => (
          <div
            key={r.id_ramo}
            style={{
              breakInside: "avoid",
              marginBottom: "16px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={r.imagen}
              alt={r.nombre}
              style={{ width: "100%", display: "block" }}
            />
            <div style={{ padding: "10px" }}>
              <h3 style={{ fontSize: "18px", color: "#3a412f", margin: "5px 0", fontFamily: "cursive" }}>{r.nombre}</h3>
              <button
                style={{
                  padding: "6px 12px",
                  border: "none",
                  backgroundColor: "#b3869b",
                  color: "white",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

