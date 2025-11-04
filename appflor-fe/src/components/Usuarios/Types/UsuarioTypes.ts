export type Usuario = {
  id_usuario: number;
  nombre: string;
  correo: string;
  contraseña?: string;
  rol: "admin" | "cliente";
  usuarioCreacion?: string;
  fechaCreacion?: string;
  usuarioModificacion?: string;
  fechaModificacion?: string;
  estado?: string;
};

export type NuevoUsuario = Omit<Usuario, "id_usuario">; // Para crear
