import React, { useState } from "react";
import { useMysql } from "../../hooks/useMysql";

interface ReservaCardProps {
  reserva: Reserva;
}

const ReservaCard: React.FC<ReservaCardProps> = ({ reserva }) => {
  const {
    id,
    nombreCliente,
    codigoCliente,
    telefonoCliente,
    correoCliente,
    almuerzoNombre,
    listaSalsas,
    listaEnsaladas,
    listaGuarniciones,
    entregado
  } = reserva;

  const { entregarAlmuerzo } = useMysql();
  const [isChecked, setIsChecked] = useState(entregado);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    entregarAlmuerzo(id);
  };

  return (
    <div className="reserva-card bg-white shadow-md rounded-md p-4">
      <h3 className="text-xl font-bold mb-2">Reserva de {nombreCliente}</h3>
      <p className="text-gray-600">Código: {codigoCliente}</p>
      {telefonoCliente && (
        <p className="text-gray-600">Teléfono: {telefonoCliente}</p>
      )}
      <p className="text-gray-600">Correo electrónico: {correoCliente}</p>
      <p className="text-gray-600">Almuerzo: {almuerzoNombre}</p>
      <p className="text-gray-600">Salsas: {listaSalsas.join(", ")}</p>
      <p className="text-gray-600">Ensaladas: {listaEnsaladas.join(", ")}</p>
      <p className="text-gray-600">Guarniciones: {listaGuarniciones.join(", ")}</p>
      <label className="flex items-center mt-4">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="ml-2">Entregado</span>
      </label>
    </div>
  );
};

export default ReservaCard;
