import { useState } from "react";

export const BuscadorAlmuerzos = ({ almuerzos, setAlmuerzosVisibles }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value;
      setSearchTerm(searchText);
  
      const filteredAlmuerzos = almuerzos.filter((almuerzo) =>
        almuerzo.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
      setAlmuerzosVisibles(filteredAlmuerzos);
    };
  
    return (
      <div>
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar almuerzo" />
      </div>
    );
  };