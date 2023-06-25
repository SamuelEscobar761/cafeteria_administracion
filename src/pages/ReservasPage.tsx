import React, { useEffect, useState } from "react";
import { useMysql } from "../hooks/useMysql";
import ReservaCard from "../components/cards/ReservaCard";
import DateSelector from "../components/DateSelector";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ReservasPage = () => {
  const { obtenerReservas, reservas } = useMysql();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState(formatDate(currentDate));

  useEffect(() => {
    obtenerReservas();
  }, []);

  useEffect(() => {
    setFormatedDate(formatDate(currentDate));
  }, [currentDate]);

  // Filtrar las reservas por la fecha seleccionada
  const reservasFiltradas = reservas.filter(
    (reserva) => reserva.fecha === formatedDate
  );

  return (
    <div>
      <DateSelector
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        formatedDate={formatedDate}
      />
      <h1>Reservas</h1>
      {reservasFiltradas.map((reserva) => (
        <ReservaCard key={reserva.id} reserva={reserva} />
      ))}
    </div>
  );
};

export default ReservasPage;
