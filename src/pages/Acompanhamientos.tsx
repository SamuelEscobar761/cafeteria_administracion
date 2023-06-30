import { useState, useEffect } from 'react';
import { useMysql } from '../hooks/useMysql';
import Guarnicion from '../types/guarnicion';
import Ensalada from '../types/ensalada';
import Salsa from '../types/salsa';

const Acompanhamientos = () => {
  const { todasGuarniciones, todasEnsaladas, todasSalsas, getTodasGuarniciones, getTodasEnsaladas, getTodasSalsas, agregarAcompanhamiento } = useMysql();

  useEffect(() => {
    const fetchData = async () => {
      getTodasGuarniciones();
      getTodasEnsaladas();
      getTodasSalsas();
    };

    fetchData();
  }, []);

  const handleAgregar = (categoria) => {
    const nombre = prompt(`Ingresa el nombre de la ${categoria.toLowerCase()}`);
    
    if (nombre !== null) {
      agregarAcompanhamiento(nombre, categoria);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Guarniciones</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {todasGuarniciones.map((guarnicion: Guarnicion) => (
            <div key={guarnicion.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{guarnicion.nombre}</h2>
              {/* <p className="text-sm mb-2">Cantidad: {guarnicion.cantidad}</p>
              <p className="text-sm mb-2">Unidad de medida: {guarnicion.unidad}</p> */}
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" checked={guarnicion.disponible} onChange={() => {}} />
                <span className="ml-2">Disponible</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleAgregar('guarnicion')}>Agregar</button>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Ensaladas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {todasEnsaladas.map((ensalada: Ensalada) => (
            <div key={ensalada.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{ensalada.nombre}</h2>
              {/* <p className="text-sm mb-2">Cantidad: {ensalada.cantidad}</p>
              <p className="text-sm mb-2">Unidad de medida: {ensalada.unidad}</p> */}
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" checked={ensalada.disponible} onChange={() => {}} />
                <span className="ml-2">Disponible</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleAgregar('ensalada')}>Agregar</button>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Salsas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {todasSalsas.map((salsa: Salsa) => (
            <div key={salsa.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{salsa.nombre}</h2>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" checked={salsa.disponible} onChange={() => {}} />
                <span className="ml-2">Disponible</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleAgregar('salsa')}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default Acompanhamientos;
