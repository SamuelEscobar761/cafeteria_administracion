import { useState } from 'react';

export const useMysql = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [almuerzos, setAlmuerzos] = useState([]);
  const urlBase = 'http://localhost/api-cafeteria/';

  const login = async (username, password) => {
    console.log(username);
    console.log(password);
    setIsLoading(true);
    const url = urlBase + 'administradores.php';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('passwd', password);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setIsAuthenticated(data);
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
    }
    setIsLoading(false);
  };

  const obtenerAlmuerzos = async () => {
    setIsLoading(true);
    const url = urlBase + 'almuerzos_admin.php';
    console.log(url)
    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setAlmuerzos(data);
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
    }
    setIsLoading(false);
  };

  const updateAlmuerzo = async (almuerzo) => {
    console.log("updating almuerzo" + almuerzo.id);
    //TODO
  };

  const toggleDisponible = async (idAlmuerzo) => {
    console.log("updating disponible" + idAlmuerzo);
    //TODO
  };

  const createAlmuerzo = async(almuerzo) => {
    console.log("Creating nuevo almuerzo" + almuerzo.nombre);
    //TODO
  }

  return { isAuthenticated, isLoading, error, login, almuerzos, obtenerAlmuerzos, updateAlmuerzo, toggleDisponible, createAlmuerzo };
};
