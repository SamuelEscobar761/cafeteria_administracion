interface Reserva {
    id: number;
    fecha: string;
    codigoCliente: string;
    telefonoCliente?: string;
    nombreCliente: string;
    correoCliente: string;
    almuerzoNombre: string;
    entregado: boolean;
    listaGuarniciones: string[];
    listaEnsaladas: string[];
    listaSalsas: string[];
  }