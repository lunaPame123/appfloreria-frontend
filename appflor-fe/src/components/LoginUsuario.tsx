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
      <div>
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button
          onClick={manejarLogin}
        >
          Ingresar
        </button>
        {error && (
          <p>
            {error}
          </p>
        )}
      </div>
  );
}