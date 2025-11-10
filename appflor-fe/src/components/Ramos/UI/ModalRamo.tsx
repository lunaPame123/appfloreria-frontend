import { useState } from "react";
import type { Ramo } from "../Types/RamoTypes";
import type { Flor } from "../../Flores/Types/FlorTypes";

type Props = {
  ramoActual: Ramo;
  onCerrar: () => void;
  onGuardar: (ramo: Ramo) => void;
  idUsuario: number;
  floresDisponibles: Flor[];
  rolUsuario: "admin" | "cliente";
  darkMode: boolean;
};

export default function ModalRamo({
  ramoActual,
  onCerrar,
  onGuardar,
  rolUsuario,
  darkMode,
  floresDisponibles,
}: Props) {
  const [nombreRamo, setNombreRamo] = useState(ramoActual.nombre);
  const [floresSeleccionadas, setFloresSeleccionadas] = useState<Flor[]>(
    ramoActual.flores || []
  );

  const toggleFlor = (flor: Flor) => {
    if (floresSeleccionadas.find((f) => f.id_flor === flor.id_flor)) {
      setFloresSeleccionadas(
        floresSeleccionadas.filter((f) => f.id_flor !== flor.id_flor)
      );
    } else {
      setFloresSeleccionadas([...floresSeleccionadas, flor]);
    }
  };

  const handleGuardar = () => {
    const costoTotal = floresSeleccionadas.reduce(
      (acc, f) => acc + f.precio,
      0
    );
    onGuardar({
      ...ramoActual,
      nombre: nombreRamo,
      flores: floresSeleccionadas,
      costo_total: costoTotal,
    });
    onCerrar();
  };

  return (
    <div className="modal-overlay">
      <div
        className={`modal-container ${darkMode ? "oscuro" : ""}`}
        style={{ width: rolUsuario === "admin" ? "350px" : "480px" }}
      >
        <h2 className="modal-title">{rolUsuario === "admin" ? ramoActual.nombre : "Crear / Editar Ramo"}</h2>

        {rolUsuario === "cliente" ? (
          <>
            {/* Nombre editable */}
            <input
              className="modal-input"
              type="text"
              placeholder="Nombre del ramo"
              value={nombreRamo}
              onChange={(e) => setNombreRamo(e.target.value)}
            />

            {/* Flores seleccionables */}
            <div className="flores-seleccionables">
              {floresDisponibles.map((flor) => {
                const seleccionada = floresSeleccionadas.some(
                  (f) => f.id_flor === flor.id_flor
                );
                return (
                  <div
                    key={flor.id_flor}
                    className={`flor-card ${seleccionada ? "seleccionada" : ""} ${
                      darkMode ? "oscuro" : ""
                    }`}
                    onClick={() => toggleFlor(flor)}
                  >
                    <img
                      src={flor.imagen || "https://via.placeholder.com/80"}
                      alt={flor.nombre}
                      style={{ width: "80px", height: "80px", borderRadius: "8px" }}
                    />
                    <p>{flor.nombre}</p>
                  </div>
                );
              })}
            </div>

            {/* Costo total */}
            <div className="ramo-total">
              Costo total: Bs {floresSeleccionadas.reduce((acc, f) => acc + f.precio, 0)}
            </div>
          </>
        ) : (
          <>
            {/* Solo lectura para admin */}
            <p>Cliente: {ramoActual.id_usuario}</p>
            <p>Costo total: Bs {ramoActual.costo_total}</p>
            <div className="ramo-preview">
              {ramoActual.flores.map((f) => (
                <div key={f.id_flor} style={{ textAlign: "center", margin: "4px" }}>
                  <img
                    src={f.imagen || "https://via.placeholder.com/50"}
                    alt={f.nombre}
                    style={{ width: 50, height: 50, borderRadius: 6 }}
                  />
                  <p style={{ fontSize: "0.75rem", marginTop: 2 }}>{f.nombre}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Botones */}
        <div className="modal-buttons">
          <button className="modal-button-cancel" onClick={onCerrar}>
            Cerrar
          </button>
          {rolUsuario === "cliente" && (
            <button className="modal-button-save" onClick={handleGuardar}>
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}