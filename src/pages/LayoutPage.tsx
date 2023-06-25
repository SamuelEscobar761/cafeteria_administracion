import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
const LayoutPage = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <div className="fixed w-full z-10">
        <Navbar />
      </div>
      <div className="flex flex-row flex-1 h-screen pt-10">
        <div className="md:w-1/6 bg-blue-900 px-5 py-10 text-white">
          <h2 className="text-lg font-black text-center py-5">
            CRM - Clientes
          </h2>
          <Link
            className={`${
              pathname === "/home/almuerzos" ? "font-bold" : ""
            } block text-center`}
            to={`almuerzos`}
          >
            Lista De Almuerzos
          </Link>
          <Link
            className={`${
              pathname === "/home/almuerzonuevo" ? "font-bold" : ""
            } block text-center`}
            to={`almuerzonuevo`}
          >
            Nuevo Almuerzo
          </Link>
          <Link
            className={`${
              pathname === "/home/acompanhamientos" ? "font-bold" : ""
            } block text-center`}
            to={`acompanhamientos`}
          >
            Acompañamientos
          </Link>
          <Link
            className={`${
              pathname === "/home/agenda" ? "font-bold" : ""
            } block text-center`}
            to={`agenda`}
          >
            Agenda
          </Link>
          <Link
            className={`${
              pathname === "/home/reservas" ? "font-bold" : ""
            } block text-center`}
            to={`reservas`}
          >
            Reservas
          </Link>
          
        </div>
        <main className="md:w-5/6 p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default LayoutPage;
