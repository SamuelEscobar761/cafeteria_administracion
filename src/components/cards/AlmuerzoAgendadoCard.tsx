import React, { useEffect, useState } from 'react';
import { useMysql } from '../../hooks/useMysql';

const AlmuerzoAgendadoCard = ({ id, nombreAlmuerzo, almuerzosAgendados, date }) => {
  const [agendado, setAgendado] = useState(false);
  const {agendarAlmuerzo, desagendarAlmuerzo} = useMysql();

  // Verificar si el almuerzo está en la lista de almuerzos agendados
  useEffect(() => {
    const isAgendado = almuerzosAgendados.some((almuerzo) => almuerzo.id === id);
    setAgendado(isAgendado);
  }, [almuerzosAgendados]);

  const handleCheckboxChange = () => {
    setAgendado(!agendado);
    if(!agendado){
        agendarAlmuerzo(id, date);
    }else{
        desagendarAlmuerzo(id, date);
    }
  };

  return (
    <div className="lunch-card bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">{nombreAlmuerzo}</h3>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 form-checkbox"
          checked={agendado}
          onChange={handleCheckboxChange}
        />
        <span>Agendado</span>
      </label>
    </div>
  );
};

export default AlmuerzoAgendadoCard;
