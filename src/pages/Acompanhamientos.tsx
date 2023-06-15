import { useState, useEffect } from 'react';
import { useMysql } from '../hooks/useMysql'; // Importa la función useMysql.js
import Guarnicion from '../types/guarnicion';
import Ensalada from '../types/ensalada';
import Salsa from '../types/salsa';

const Acompanhamientos = () => {
  const [guarniciones, setGuarniciones] = useState<Guarnicion[]>([]);
  const [ensaladas, setEnsaladas] = useState<Ensalada[]>([]);
  const [salsas, setSalsas] = useState<Salsa[]>([]);

  const { todasGuarniciones, todasEnsaladas, todasSalsas, getTodasGuarniciones, getTodasEnsaladas, getTodasSalsas } = useMysql();

  // Obtén las listas de guarniciones, ensaladas y salsas utilizando useMysql.js
  useEffect(() => {
    const fetchData = async () => {
      getTodasGuarniciones();
      getTodasEnsaladas();
      getTodasSalsas();
      setGuarniciones(todasGuarniciones);
      setEnsaladas(todasEnsaladas);
      setSalsas(todasSalsas);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Guarniciones</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {guarniciones.map((guarnicion) => (
            <div key={guarnicion.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{guarnicion.nombre}</h2>
              <p className="text-sm mb-2">Cantidad: {guarnicion.cantidad}</p>
              <p className="text-sm mb-2">Unidad de medida: {guarnicion.unidad}</p>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" checked={guarnicion.disponible} onChange={() => {/* Agrega la lógica para modificar el atributo de disponible */}} />
                <span className="ml-2">Disponible</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Ensaladas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ensaladas.map((ensalada) => (
            <div key={ensalada.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{ensalada.nombre}</h2>
              <p className="text-sm mb-2">Cantidad: {ensalada.cantidad}</p>
              <p className="text-sm mb-2">Unidad de medida: {ensalada.unidad}</p>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" checked={ensalada.disponible} onChange={() => {/* Agrega la lógica para modificar el atributo de disponible */}} />
                <span className="ml-2">Disponible</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Salsas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {salsas.map((salsa) => (
            <div key={salsa.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{salsa.nombre}</h2>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" checked={salsa.disponible} onChange={() => {/* Agrega la lógica para modificar el atributo de disponible */}} />
                <span className="ml-2">Disponible</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Acompanhamientos;