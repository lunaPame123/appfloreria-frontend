import { useState, useEffect } from "react";

interface LoginProps {
  onLogin: (usuario: any) => void;
  modoOscuro?: boolean;
  onCerrar?: () => void;
}

export default function Login({ onLogin, modoOscuro = false, onCerrar }: LoginProps) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const manejarCerrar = () => {
    setVisible(false);
    setTimeout(() => onCerrar && onCerrar(), 300);
  };

  const manejarLogin = () => {
    if (!usuario || !contrasena) return alert("Todos los campos son obligatorios");

    if (usuario === "admin" && contrasena === "1234") {
      onLogin({ nombre:"Admin Demo", correo:"admin@demo.com", rol:"admin", id_usuario:1 });
      manejarCerrar();
      setError("");
    } else if (usuario === "cliente" && contrasena === "1234") {
      onLogin({ nombre:"Cliente Demo", correo:"cliente@demo.com", rol:"cliente", id_usuario:2 });
      manejarCerrar();
      setError("");
    } else setError("Usuario o contraseña incorrectos");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: visible ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
        transition: "background-color 0.3s ease",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 300,
          padding: 30,
          borderRadius: 12,
          backgroundColor: modoOscuro ? " #2c2c2c" : "#fff",
          color: modoOscuro ? "#fff" : "#333",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.95)",
          opacity: visible ? 1 : 0,
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: modoOscuro ? "#c6d5b1" : "#DA395B",
          }}
        >
          Iniciar Sesión
        </h2>

        <input
          type="text"
          placeholder="Usuario o correo"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: "1px solid #b3869b",
            backgroundColor: modoOscuro ? "#444" : "#F8B6B0",
            color: modoOscuro ? "#fff" : "#000",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: "1px solid #b3869b",
            backgroundColor: modoOscuro ? "#444" : "#F8B6B0",
            color: modoOscuro ? "#fff" : "#000",
          }}
        />

        <button
          onClick={manejarLogin}
          style={{
            width: "80%",
            padding: 10,
            borderRadius: 6,
            border: "none",
            backgroundColor: "#DA395B",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Ingresar
        </button>

        {error && (
          <p style={{ color: "red", textAlign: "center", margin: 0 }}>{error}</p>
        )}

        <button
          onClick={manejarCerrar}
          style={{
            width: "80%",
            padding: 10,
            borderRadius: 6,
            border: "none",
            backgroundColor: "#ccc",
            color: "#333",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
