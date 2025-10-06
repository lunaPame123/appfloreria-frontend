import { useState } from "react";

export default function Login({ onLogin }: any) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const manejarLogin = () => {
    if (usuario === "admin" && contrasena === "1234") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('https://www.shutterstock.com/image-photo/blue-hydrangea-macrophylla-hortensia-flower-600nw-2295636697.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "cursive",
      }}
    >
      <div
        style={{
          width: 350,
          padding: 30,
          borderRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.6)", 
        }}
      >
        <h2 style={{ textAlign: "center", color: "#4c6ef5" }}>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{
            fontFamily: "cursive",
            color: "black",
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            backgroundColor: "#d3d5f2",
            border: "1px solid #1b1341",
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          style={{
            fontFamily: "cursive",
            color: "black",
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            backgroundColor: "#d3d5f2",
            border: "1px solid #1b1341",
          }}
        />
        <button
          onClick={manejarLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1b1341",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#004581")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1b1341")}
        >
          Ingresar
        </button>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}