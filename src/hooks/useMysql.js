import { useState } from 'react';

export const useMysql = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [almuerzos, setAlmuerzos] = useState([]);
  const [todasGuarniciones, setTodasGuarniciones] = useState([]);
  const [todasEnsaladas, setTodasEnsaladas] = useState([]);
  const [todasSalsas, setTodasSalsas] = useState([]);
  const [almuerzosAgendados, setAlmuerzosAgendados] = useState([]);
  const [reservas, setReservas] = useState([]);
  const urlBase = 'http://localhost/api-cafeteria/';

  const login = async (username, password) => {
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
    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
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
    setIsLoading(true);
    const url = urlBase + 'updateAlmuerzo.php';
    const formData = new FormData();
    formData.append('id', almuerzo.id);
    formData.append('nombre', almuerzo.nombre);
    formData.append('para_llevar', almuerzo.para_llevar);
    formData.append('descripcion', almuerzo.descripcion);
    formData.append('precio', almuerzo.precio);
    formData.append('guarniciones', almuerzo.guarniciones);
    formData.append('ensaladas', almuerzo.ensaladas);
    formData.append('salsas', almuerzo.salsas);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
    if (response.ok) {
      const data = await response.text();
      setIsLoading(false);
      obtenerAlmuerzos();
    } else {
      throw new Error('Error en la solicitud');
    }
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
      setIsLoading(false);
    }
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

  const agendarAlmuerzo = async (id, date) => {
    setIsLoading(true);
    const url = urlBase + 'agendar_almuerzo.php';
    const formData = new FormData();
    formData.append('date', date);
    formData.append('id', id);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
    if (response.ok) {
      const data = await response.text();
      console.log(data);
      setIsLoading(false);
    } else {
      throw new Error('Error en la solicitud');
    }
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
      setIsLoading(false);
    }
  };

  const desagendarAlmuerzo = async (id, date) => {
    setIsLoading(true);
    const url = urlBase + 'desagendar_almuerzo.php';
    const formData = new FormData();
    formData.append('date', date);
    formData.append('id', id);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
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
  };


  const getAlmuerzosAgendados = async (date) => {
    setIsLoading(true);
    const url = urlBase + 'almuerzos_agendados.php';
    const formData = new FormData();
    formData.append('date', date);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
    if (response.ok) {
      const data = await response.json();
      setAlmuerzosAgendados(data);
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

  const obtenerReservas = async () => {
    setIsLoading(true);
    const url = urlBase + 'reservas.php';
    try {
      const response = await fetch(url, {
        method: 'POST',
      });
    if (response.ok) {
      const data = await response.json();
      setReservas(data);
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

  const entregarAlmuerzo = async (id) => {
    setIsLoading(true);
    const url = urlBase + 'entregar_almuerzo.php';
    const formData = new FormData();
    formData.append('id', id);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
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

  const agregarAcompanhamiento = async(nombre, tipo) => {
    setIsLoading(true);
    const url = urlBase + 'agregarAcompanhamiento.php';
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('tabla', tipo);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
    if (response.ok) {
      const data = await response.text();
      getTodasEnsaladas();
      getTodasGuarniciones();
      getTodasSalsas();
      //Esta parte del codigo tiene que mejorar, se tiene que agregar la guarnicion, ensalada o salsa respectivamente.
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

  const agregarQr = async (qr, nombre) => {
    setIsLoading(true);
    const url = urlBase + 'upload_qr.php';
    const formData = new FormData();
    formData.append('imagen', qr);
    formData.append('nombre', nombre)
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.text();
        console.log(data);
        // Realiza alguna acción con la respuesta del servidor (por ejemplo, guardar la URL de la imagen)
        setIsLoading(false);
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
      setIsLoading(false);
    }
  };
  
  const agregarImagen = async (imagen, nombre) => {
    setIsLoading(true);
    const url = urlBase + 'upload_image.php';
    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('nombre', nombre)
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.text();
        console.log(data);
        // Realiza alguna acción con la respuesta del servidor (por ejemplo, guardar la URL de la imagen)
        setIsLoading(false);
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
      setError('Error en la solicitud');
      setIsLoading(false);
    }
  };


  return { isAuthenticated, isLoading, error, almuerzosAgendados, almuerzos, todasGuarniciones, todasEnsaladas, todasSalsas, reservas,
    login, obtenerAlmuerzos, getTodasGuarniciones, getTodasEnsaladas, getTodasSalsas, updateAlmuerzo, toggleDisponible, obtenerReservas,
    createAlmuerzo, getAlmuerzosAgendados, agendarAlmuerzo, desagendarAlmuerzo, entregarAlmuerzo, agregarAcompanhamiento, agregarQr, agregarImagen };
};
