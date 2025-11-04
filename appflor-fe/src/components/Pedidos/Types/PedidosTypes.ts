export type Pedido = {
  id_pedido?: number;
  id_usuario: number;
  fecha?: string;
  total: number;
  estado?: string;
  usuarioCreacion?: string;
  fechaCreacion?: string;
  usuarioModificacion?: string;
  fechaModificacion?: string;
};
