import { useState } from 'react';

export const useMysql = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [almuerzos, setAlmuerzos] = useState([]);
  const [todasGuarniciones, setTodasGuarniciones] = useState([]);
  const [todasEnsaladas, setTodasEnsaladas] = useState([]);
  const [todasSalsas, setTodasSalsas] = useState([]);
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

  const getTodasGuarniciones = async() => {
    setIsLoading(true);
    const url = urlBase + 'todas_guarniciones.php';
    console.log(url)
    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      console.log(data);
      setTodasGuarniciones(data);
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
    }
    setIsLoading(false);
  };
  const getTodasEnsaladas = async() => {
    setIsLoading(true);
    const url = urlBase + 'todas_ensaladas.php';
    console.log(url)
    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setTodasEnsaladas(data);
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
    }
    setIsLoading(false);
  };
  const getTodasSalsas = async() => {
    setIsLoading(true);
    const url = urlBase + 'todas_salsas.php';
    console.log(url)
    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setTodasSalsas(data);
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

  return { isAuthenticated, isLoading, error, login, almuerzos, todasGuarniciones, todasEnsaladas, todasSalsas, 
    obtenerAlmuerzos, getTodasGuarniciones, getTodasEnsaladas, getTodasSalsas, updateAlmuerzo, toggleDisponible, 
    createAlmuerzo };
};
