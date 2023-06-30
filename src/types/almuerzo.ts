interface Almuerzo {
  id: number;
  nombre: string;
  para_llevar: boolean;
  descripcion: string;
  precio: number;
  imagen: string;
  numGuarniciones: number
  numEnsaladas: number;
  numSalsas: number;
  disponible: boolean;
}
export default Almuerzo;