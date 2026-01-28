import { useState } from "react";
import logo from "../assets/icono-logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#FEFEFE] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          
          {/* Logo */}
          <div className="shrink-0">
            <img src={logo} alt="Logo" className="h-5 w-auto" />
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Inicio</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Especialidades</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Portal Profesional</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Contacto</a>
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
                <span className="text-2xl">&#10005;</span> // X
              ) : (
                <span className="text-2xl">&#9776;</span> // ☰
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-[#FEFEFE] px-4 pt-2 pb-4 space-y-2 shadow-sm">
          <a href="#" className="block text-gray-700 hover:text-gray-900">Inicio</a>
          <a href="#" className="block text-gray-700 hover:text-gray-900">Servicios</a>
          <a href="#" className="block text-gray-700 hover:text-gray-900">Nosotros</a>
          <a href="#" className="block text-gray-700 hover:text-gray-900">Contacto</a>
          <button className="w-full bg-[#1878D5] text-white px-4 py-2 rounded-md hover:bg-[#1063a1] transition">
            Ingresar
          </button>
        </div>
      )}
    </nav>
  );
}