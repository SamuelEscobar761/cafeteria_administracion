import React, { useEffect, useState } from 'react';
import {useMysql} from '../hooks/useMysql';
import { useNavigate } from 'react-router-dom';
// import inquirer from 'inquirer';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, isLoading, login } = useMysql();
  const navigate = useNavigate();

  useEffect(() =>{
    if(isAuthenticated){
        navigate(`/home`);
    }
    
  }, [isAuthenticated])

  const handleLogin = () => {
    console.log("handeling");
    login(username, password);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Inicio de sesión</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
