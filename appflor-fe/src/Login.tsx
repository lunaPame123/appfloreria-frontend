import { useState } from "react";

interface LoginProps {
  onLogin: (usuario: any) => void;
  modoOscuro?: boolean;
  onCerrar?: () => void;
  fondoImagen?: string;
}

export default function Login({ onLogin, modoOscuro = false, onCerrar, fondoImagen }: LoginProps) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const manejarLogin = () => {
    if (!usuario || !contrasena) return alert("Todos los campos son obligatorios");
    if (usuario === "admin" && contrasena === "1234") {
      onLogin({ nombre:"Admin Demo", correo:"admin@demo.com", rol:"admin", id_usuario:1 });
      onCerrar && onCerrar();
      setError("");
    } else if (usuario === "cliente" && contrasena === "1234") {
      onLogin({ nombre:"Cliente Demo", correo:"cliente@demo.com", rol:"cliente", id_usuario:2 });
      onCerrar && onCerrar();
      setError("");
    } else setError("Usuario o contraseña incorrectos");
  };

  return (
    <div style={{
      position:"fixed", top:0, left:0, height:"100vh", width:"100vw",
      display:"flex", justifyContent:"center", alignItems:"center",
      backgroundColor: fondoImagen ? "transparent":"rgba(0,0,0,0.4)",
      backgroundImage: fondoImagen ? `url(${fondoImagen})` : undefined,
      backgroundSize:"cover", backgroundPosition:"center", zIndex:1000
    }}>
      <div style={{
        width:350, padding:30, borderRadius:12,
        backgroundColor: modoOscuro ? "#2c2c2c" : fondoImagen ? "rgba(255,255,255,0.6)":"white",
        color: modoOscuro ? "#fff":"#333",
        boxShadow:"0 4px 10px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{textAlign:"center", marginBottom:20, color:modoOscuro?"#c6d5b1":"#DA395B"}}>
          Iniciar Sesión
        </h2>

        <input type="text" placeholder="Usuario o correo" value={usuario} onChange={e=>setUsuario(e.target.value)}
          style={{width:"100%", padding:10, marginBottom:10, borderRadius:6, border:"1px solid #b3869b",
          backgroundColor:modoOscuro?"#444":"#F8B6B0", color:modoOscuro?"#fff":"#000"}} />

        <input type="password" placeholder="Contraseña" value={contrasena} onChange={e=>setContrasena(e.target.value)}
          style={{width:"100%", padding:10, marginBottom:10, borderRadius:6, border:"1px solid #b3869b",
          backgroundColor:modoOscuro?"#444":"#F8B6B0", color:modoOscuro?"#fff":"#000"}} />

        <button onClick={manejarLogin}
          style={{width:"100%", padding:10, borderRadius:6, border:"none", backgroundColor:"#DA395B", color:"white", cursor:"pointer", fontWeight:"bold"}}>
          Ingresar
        </button>

        {error && <p style={{color:"red", textAlign:"center", marginTop:10}}>{error}</p>}

        {onCerrar && <button onClick={onCerrar}
          style={{marginTop:10, width:"100%", padding:10, borderRadius:6, border:"none", backgroundColor:"#ccc", color:"#333", cursor:"pointer"}}>
          Cancelar
        </button>}
      </div>
    </div>
  );
}