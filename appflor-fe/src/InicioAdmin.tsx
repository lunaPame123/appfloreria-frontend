import "./InicioAdmin.css";

interface InicioAdminProps {
  onSeleccionar: (vista: string) => void;
  darkMode: boolean;
}

export default function InicioAdmin({ onSeleccionar, darkMode }: InicioAdminProps) {
  const opciones = [
    { nombre: "Usuarios", vista: "usuarios" },
    { nombre: "Flores", vista: "flores" },
    { nombre: "Arreglos", vista: "arreglos" },
    { nombre: "Pedidos", vista: "pedidos" },
    { nombre: "Favoritos", vista: "favoritos" },
  ];

  return (
    <div className={`inicio-admin ${darkMode ? "oscuro" : ""}`}>
      <h2 className="titulo-admin">Panel de Administración</h2>
      <div className="contenedor-opciones">
        {opciones.map((opcion) => (
          <div
            key={opcion.vista}
            className="tarjeta-opcion"
            onClick={() => onSeleccionar(opcion.vista)}
          >
            <h3>{opcion.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
