import React, { useState } from 'react';
import { useMysql } from '../hooks/useMysql';
import { useNavigate } from 'react-router-dom';

export const AlmuerzoNuevoPage = () => {
  const [nombre, setNombre] = useState('');
  const [paraLlevar, setParaLlevar] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [numEnsaladas, setNumEnsaladas] = useState('');
  const [numGuarniciones, setNumGuarniciones] = useState('');
  const [numSalsas, setNumSalsas] = useState('');
  const [imagenFile, setImagenFile] = useState<File | null>(null);

  const { createAlmuerzo } = useMysql();
  const navigate = useNavigate();

  const handleCrearAlmuerzo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para crear el nuevo almuerzo
    const nuevoAlmuerzo = {
        nombre,
        paraLlevar,
        descripcion,
        precio,
        imagen: imagenFile !== null ? imagenFile : undefined,
        numEnsaladas,
        numGuarniciones,
        numSalsas,
    };

    createAlmuerzo(nuevoAlmuerzo)
      .then(() => {
        // El almuerzo se creó exitosamente
        navigate(`/home/almuerzos`);
      })
      .catch((error: any) => {
        // Ocurrió un error al crear el almuerzo
        console.error(error);
        // Realiza alguna acción adicional, como mostrar un mensaje de error al usuario
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Almuerzo</h1>
      <form onSubmit={handleCrearAlmuerzo}>
        <div className="mb-4">
          <label htmlFor="nombre" className="text-lg">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paraLlevar" className="text-lg">
            Para Llevar:
          </label>
          <input
            type="checkbox"
            id="paraLlevar"
            checked={paraLlevar}
            onChange={(e) => setParaLlevar(e.target.checked)}
            className="ml-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="text-lg">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="text-lg">
            Precio:
          </label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
            <label htmlFor="imagen" className="text-lg">
                Imagen:
            </label>
            <input
                type="file"
                id="imagen"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    setImagenFile(file);
                }}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />

        </div>
        <div className="mb-4">
          <label htmlFor="numEnsaladas" className="text-lg">
            Número de Ensaladas Disponibles:
          </label>
          <input
            type="number"
            id="numEnsaladas"
            value={numEnsaladas}
            onChange={(e) => setNumEnsaladas(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numGuarniciones" className="text-lg">
            Número de Guarniciones Disponibles:
          </label>
          <input
            type="number"
            id="numGuarniciones"
            value={numGuarniciones}
            onChange={(e) => setNumGuarniciones(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numSalsas" className="text-lg">
            Número de Salsas Disponibles:
          </label>
          <input
            type="number"
            id="numSalsas"
            value={numSalsas}
            onChange={(e) => setNumSalsas(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Crear Almuerzo
        </button>
      </form>
    </div>
  );
};
