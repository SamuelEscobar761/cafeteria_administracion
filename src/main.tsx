import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LayoutPage from './pages/LayoutPage';
import HomePage from './pages/HomePage';
import { AlmuerzoNuevoPage } from './pages/AlmuerzoNuevoPage';
import Acompanhamientos from './pages/Acompanhamientos';
import { AgendarAlmuerzosPage } from './pages/AgendarAlmuerzosPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/Home",
    element: <LayoutPage />,
    children: [
      {
        path: "almuerzos",
        element: <HomePage />,
      },
      {
        path: "almuerzonuevo",
        element: <AlmuerzoNuevoPage />,
      },
      {
        path: "acompanhamientos",
        element: <Acompanhamientos />,
      },
      {
        path: "agenda",
        element: <AgendarAlmuerzosPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
