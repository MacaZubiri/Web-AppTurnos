import { useState } from "react";
import logo from "../assets/icono-logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-[#FEFEFE] shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          
          {/* Logo */}
          <div className="shrink-0">
            <img src={logo} alt="Logo" className="h-5 w-auto cursor-pointer" onClick={() => navigate("/")}  />
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Inicio</Link>
            <Link to="/buscar-profesional" className="text-gray-700 hover:text-gray-900 font-medium">Profesionales</Link>
            <Link to="#" className="text-gray-700 hover:text-gray-900 font-medium">Portal Profesional</Link>
            <Link to="#" className="text-gray-700 hover:text-gray-900 font-medium">Contacto</Link>
          </div>

          {/* Botón ingresar */}
          <div className="hidden md:flex">
            <button className="ml-8 bg-[#1878D5] text-white px-4 py-2 rounded-md hover:bg-[#1063a1] transition cursor-pointer">
              Ingresar
            </button>
          </div>

          {/* Botón móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-gray-700"
            >
              {isOpen ? (
                <span className="text-2xl">&#10005;</span> 
              ) : (
                <span className="text-2xl">&#9776;</span> 
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-[#FEFEFE] px-4 pt-2 pb-4 space-y-2 shadow-sm">
          <Link to="/" className="block text-gray-700 hover:text-gray-900">Inicio</Link>
          <Link to="/buscar-profesional" className="block text-gray-700 hover:text-gray-900">Profesionales</Link>
          <Link to="#" className="block text-gray-700 hover:text-gray-900">Portal Profesional</Link>
          <Link to="#" className="block text-gray-700 hover:text-gray-900">Contacto</Link>
          <button className="w-full bg-[#1878D5] text-white px-4 py-2 rounded-md hover:bg-[#1063a1] transition">
            Ingresar
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;