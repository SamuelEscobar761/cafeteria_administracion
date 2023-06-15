import React, { useEffect } from 'react';
import AlmuerzoCard from '../components/cards/AlmuerzoCard';
import { useMysql } from '../hooks/useMysql';

const HomePage = () => {
  const { isLoading, error, almuerzos, obtenerAlmuerzos, updateAlmuerzo, toggleDisponible } = useMysql();

  useEffect(() => {
    obtenerAlmuerzos();
  }, []); // El array vacío asegura que useEffect solo se ejecute una vez al montar el componente

  return (
    <div>
      <h1>Lista de almuerzos</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {almuerzos.map((almuerzo) => (
            <AlmuerzoCard
            key={almuerzo.id}
            almuerzo={almuerzo}
            onUpdate={updateAlmuerzo}
            onToggleDisponible={toggleDisponible}
          />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
