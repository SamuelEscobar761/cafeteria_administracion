import React, { useState, useEffect } from 'react';

const AlmuerzoCard = ({ almuerzo, onUpdate, onToggleDisponible }) => {
  const {
    id,
    nombre,
    para_llevar,
    descripcion,
    precio,
    imagen,
    guarniciones,
    ensaladas,
    salsas,
    disponible,
  } = almuerzo;

  const [isEditing, setIsEditing] = useState(false);
  const [editedNombre, setEditedNombre] = useState(nombre);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcion);
  const [editedPrecio, setEditedPrecio] = useState(precio);
  const [editedParaLlevar, setEditedParaLlevar] = useState(para_llevar);
  const [editedGuarniciones, setEditedGuarniciones] = useState(guarniciones);
  const [editedEnsaladas, setEditedEnsaladas] = useState(ensaladas);
  const [editedSalsas, setEditedSalsas] = useState(salsas);

  const [imagenExistente, setImagenExistente] = useState(false);

  useEffect(() => {
    const verificarImagen = async () => {
      try {
        const response = await fetch(imagen);
        setImagenExistente(response.ok);
      } catch (error) {
        setImagenExistente(false);
      }
    };

    verificarImagen();
  }, [imagen]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedAlmuerzo = {
      ...almuerzo,
      nombre: editedNombre,
      descripcion: editedDescripcion,
      precio: editedPrecio,
      para_llevar: editedParaLlevar,
      guarniciones: editedGuarniciones,
      ensaladas: editedEnsaladas,
      salsas: editedSalsas,
    };

    onUpdate(updatedAlmuerzo);
    setIsEditing(false);
  };

  const handleToggleDisponible = () => {
    onToggleDisponible(almuerzo.id);
  };

  const handleAgregarImagen = () => {
    // Lógica para agregar una imagen al plato
    // ...
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        {imagenExistente ? (
          <img src={imagen} alt={nombre} className="w-16 h-16 rounded-full mr-4" />
        ) : (
          <div className="w-16 h-16 rounded-full mr-4 bg-gray-200"></div>
        )}
        <div>
          {isEditing ? (
            <input
              type="text"
              value={editedNombre}
              onChange={(e) => setEditedNombre(e.target.value)}
              className="text-xl font-bold mb-2"
            />
          ) : (
            <h2 className="text-xl font-bold mb-2">{nombre}</h2>
          )}
          {!isEditing && (
            <p className="text-gray-500">{editedParaLlevar ? 'Para llevar' : 'Para comer aquí'}</p>
          )}
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={editedDescripcion}
          onChange={(e) => setEditedDescripcion(e.target.value)}
          className="mb-4"
        />
      ) : (
        <p className="mb-4">{descripcion}</p>
      )}
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <>
            <div className="flex items-center mb-2">
              <input
                type="number"
                value={editedPrecio}
                onChange={(e) => setEditedPrecio(e.target.value)}
                className="text-gray-700 font-semibold mr-2"
              />
              <p className="text-gray-500">Bs</p>
            </div>
            <div className="mb-2">
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={editedParaLlevar}
                  onChange={(e) => setEditedParaLlevar(e.target.checked)}
                  className="mr-1"
                />
                Para llevar
              </label>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 font-semibold">
              Precio: {editedPrecio} Bs
            </p>
            {!isEditing && (
              <p className="text-gray-500">
                {editedParaLlevar ? 'Para llevar' : 'Para comer aquí'}
              </p>
            )}
          </>
        )}
        <div>
          {isEditing ? (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSave}
            >
              Guardar
            </button>
          ) : (
            <>
              {!isEditing && (
                <button
                  className={`${
                    disponible ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  } text-white font-bold py-2 px-4 rounded mr-2`}
                  onClick={handleToggleDisponible}
                >
                  {disponible ? 'Disponible' : 'No disponible'}
                </button>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleEdit}
              >
                Editar
              </button>
            </>
          )}
          {!isEditing && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleAgregarImagen}
            >
              Agregar imagen
            </button>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Guarniciones</h3>
        {isEditing ? (
          <textarea
            value={editedGuarniciones}
            onChange={(e) => setEditedGuarniciones(e.target.value)}
            className="mb-2"
          />
        ) : (
          <p>{guarniciones}</p>
        )}
        <h3 className="text-lg font-semibold mb-2">Ensaladas</h3>
        {isEditing ? (
          <textarea
            value={editedEnsaladas}
            onChange={(e) => setEditedEnsaladas(e.target.value)}
            className="mb-2"
          />
        ) : (
          <p>{ensaladas}</p>
        )}
        <h3 className="text-lg font-semibold mb-2">Salsas</h3>
        {isEditing ? (
          <textarea
            value={editedSalsas}
            onChange={(e) => setEditedSalsas(e.target.value)}
            className="mb-2"
          />
        ) : (
          <p>{salsas}</p>
        )}
      </div>
    </div>
  );
};

export default AlmuerzoCard;
