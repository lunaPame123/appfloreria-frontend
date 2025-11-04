export type Ramo = {
  id_ramo?: number;
  id_usuario: number;
  costo_total: number;
  fecha?: string;
  usuarioCreacion?: string;
  fechaCreacion?: string;
  usuarioModificacion?: string;
  fechaModificacion?: string;
  estado?: string;

  // Campos opcionales para la galería del cliente
  nombre?: string;
  imagen?: string;
};

