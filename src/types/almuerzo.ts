interface Almuerzo {
  id: number;
  nombre: string;
  para_llevar: boolean;
  descripcion: string;
  precio: number;
  imagen: string;
  guarniciones: number
  ensaladas: number;
  salsas: number;
  disponible: boolean;
}
export default Almuerzo;