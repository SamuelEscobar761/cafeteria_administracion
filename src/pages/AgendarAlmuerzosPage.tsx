import { useEffect, useState } from "react";
import DateSelector from "../components/DateSelector";
import { BuscadorAlmuerzos } from "../components/BuscadorAlmuerzos";
import { useMysql } from '../hooks/useMysql';
import AlmuerzoAgendadoCard from "../components/cards/AlmuerzoAgendadoCard";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const AgendarAlmuerzosPage = () => {
    const { getAlmuerzosAgendados, almuerzosAgendados, almuerzos, obtenerAlmuerzos } = useMysql();
    const [almuerzosVisibles, setAlmuerzosVisibles] = useState(almuerzosAgendados);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formatedDate, setFormatedDate] = useState(formatDate(currentDate));
    
    useEffect(() => {
        obtenerAlmuerzos();
    }, []);
    useEffect(() => {
        setFormatedDate(formatDate(currentDate));
    }, [currentDate]);

    useEffect(() => {
        getAlmuerzosAgendados(formatedDate);
        console.log(formatedDate)
    }, [formatedDate]);

    useEffect(() => {
        setAlmuerzosVisibles(almuerzos);
    }, [almuerzos]);
    return(
        <>
            <DateSelector currentDate={currentDate} setCurrentDate={setCurrentDate} formatedDate={formatedDate}/>
            <BuscadorAlmuerzos almuerzos={almuerzos} setAlmuerzosVisibles={setAlmuerzosVisibles}/>
            <h1>Almuerzos:</h1>
            <div>
            {almuerzosVisibles.map((almuerzo) => (
            <AlmuerzoAgendadoCard
                key={almuerzo.id}
                id={almuerzo.id}
                nombreAlmuerzo={almuerzo.nombre}
                almuerzosAgendados={almuerzosAgendados}
                date={formatedDate}
            />
            ))}
            </div>

        </>
        
    )
}