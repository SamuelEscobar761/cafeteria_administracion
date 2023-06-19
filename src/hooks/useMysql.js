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

  const toggleDisponible = async (id) => {
  try {
    setIsLoading(true);
    const url = urlBase + 'almuerzo_toggle_disponible.php';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      const data = await response.text();
      setIsLoading(false);
      const updatedAlmuerzos = almuerzos.map((almuerzo) => {
        if (almuerzo.id === id) {
          return {
            ...almuerzo,
            disponible: !almuerzo.disponible,
          };
        }
        return almuerzo;
      });
    
      setAlmuerzos(updatedAlmuerzos);
    } else {
      throw new Error('Error en la solicitud');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud: ', error);
    setError('Error en la solicitud');
    setIsLoading(false);
  }
};


  const createAlmuerzo = async (almuerzo) => {
    try {
      setIsLoading(true);
      const url = urlBase + 'create_almuerzo.php';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(almuerzo)
      });
  
      if (response.ok) {
        const data = await response.text();
        setIsLoading(false);
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
      setIsLoading(false);
    }
  }
  

  return { isAuthenticated, isLoading, error, login, almuerzos, todasGuarniciones, todasEnsaladas, todasSalsas, 
    obtenerAlmuerzos, getTodasGuarniciones, getTodasEnsaladas, getTodasSalsas, updateAlmuerzo, toggleDisponible, 
    createAlmuerzo };
};
