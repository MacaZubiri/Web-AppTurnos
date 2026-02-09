import { useState, useRef, useEffect } from "react";
import logo from "../assets/icono-logo.svg";
import perfilimagen from "../assets/imagen-perfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";

const NavBar = ({ user, onLoginClick, onLogout }) => {


  const [isOpen, setIsOpen] = useState(false); // menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false); // menú desplegable avatar
  const [showMenu, setShowMenu] = useState(false); // controla render del menú
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Función para abrir/cerrar el menú animado
  const toggleMenu = () => {
    if (!isMenuOpen) {
      setShowMenu(true);
      setTimeout(() => setIsMenuOpen(true), 10); // pequeño delay para animación
    } else {
      setIsMenuOpen(false);
      setTimeout(() => setShowMenu(false), 200); // espera animación de cierre
    }
  };

  // Cerrar menú al click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setTimeout(() => setShowMenu(false), 200);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#FEFEFE] shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="h-5 w-auto" />
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Inicio</Link>
            <Link to="/buscar-profesional" className="text-gray-700 hover:text-gray-900 font-medium ">Profesionales</Link>

            {user.isLogged && user.role === "profesional" && (
              <Link to="/portal" className="text-gray-700 hover:text-gray-900 font-medium">Portal Profesional</Link>
            )}
            {user.isLogged && user.role === "usuario" && (
              <Link to="/mis-turnos" className="text-gray-700 hover:text-gray-900 font-medium mr-8">Mis turnos</Link>
            )}
          </div>

          {/* Botón Ingresar o Avatar */}
          {!user.isLogged ? (
            <button
              onClick={onLoginClick}
              className="bg-[#1878D5] text-white px-4 py-2 rounded-md hover:bg-[#1063a1] transition cursor-pointer"
            >
              Ingresar
            </button>
      ) : user.role === "usuario" ? (
        <div ref={menuRef} className="flex items-center gap-2 relative">
          {/* Avatar + Flecha */}
          <div className="flex items-center gap-1 cursor-pointer" onClick={toggleMenu}>
            <img src={perfilimagen} alt="Perfil" className="w-10 h-10 rounded-full" />
            <HiChevronDown className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`} />
          </div>

    {/* Menú desplegable */}
    {showMenu && (
      <div
        className={`absolute right-0 mt-36 w-40 bg-white shadow-lg flex flex-col z-50
          transform transition-all duration-400 ease-out
          ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <button
          onClick={() => { navigate("/perfil"); toggleMenu(); }}
          className="px-4 py-2 hover:bg-gray-100 text-left cursor-pointer"
        >
          Mi perfil
        </button>
        <button
          onClick={() => { onLogout(); toggleMenu(); }}
          className="px-4 py-2 hover:bg-gray-100 text-left cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    )}
  </div>
) : null}

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-gray-700">
              {isOpen ? <span className="text-2xl">&#10005;</span> : <span className="text-2xl">&#9776;</span>}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden bg-[#FEFEFE] px-4 pt-2 pb-4 space-y-2 shadow-sm">
            <Link to="/" className="block text-gray-700 hover:text-gray-900">Inicio</Link>
            <Link to="/buscar-profesional" className="block text-gray-700 hover:text-gray-900">Profesionales</Link>

            {user.isLogged && user.role === "profesional" && (
              <Link to="/portal" className="block text-gray-700 hover:text-gray-900">Portal Profesional</Link>
            )}


            {user.isLogged ? (
              <button
                onClick={onLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Salir
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="w-full bg-[#1878D5] text-white px-4 py-2 rounded-md hover:bg-[#1063a1] transition"
              >
                Ingresar
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
