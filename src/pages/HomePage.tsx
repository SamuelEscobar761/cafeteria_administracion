import React, { useEffect, useState } from 'react';
import AlmuerzoCard from '../components/cards/AlmuerzoCard';
import { useMysql } from '../hooks/useMysql';
import { BuscadorAlmuerzos } from '../components/BuscadorAlmuerzos';

const HomePage = () => {
  const { isLoading, error, almuerzos, obtenerAlmuerzos, updateAlmuerzo, toggleDisponible } = useMysql();
  const [almuerzosVisibles, setAlmuerzosVisibles] = useState(almuerzos);

  useEffect(() => {
    obtenerAlmuerzos();
  }, []);

  useEffect(() => {
    setAlmuerzosVisibles(almuerzos);
}, [almuerzos]);

  return (
    <div>
      <BuscadorAlmuerzos almuerzos={almuerzos} setAlmuerzosVisibles={setAlmuerzosVisibles}/>
      <h1>Lista de almuerzos</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {almuerzosVisibles.map((almuerzo) => (
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
