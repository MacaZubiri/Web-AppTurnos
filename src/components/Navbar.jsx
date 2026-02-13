import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/icono-logo.svg";
import LoginModal from "./LoginModal";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleHamburger = () => setIsHamburgerOpen(!isHamburgerOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Cerrar menús si clickeas afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setIsHamburgerOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 h-12 flex items-center px-4 justify-between">
        
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="h-4" />
        </div>

        {/* Links desktop */}
        <div className="hidden sm:flex flex-1 justify-center gap-4">
          <Link to="/" className="hover:text-gray-700 font-medium transition-colors">Inicio</Link>
          <Link to="/buscar-profesional" className="hover:text-gray-700 font-medium transition-colors">Profesionales</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Desktop: avatar / login */}
          <div className="hidden sm:flex items-center gap-2 relative" ref={menuRef}>
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={toggleMenu}>
                <p className="text-sm font-medium">{user.nombreApellido}</p>
                <HiChevronDown className={`w-5 h-5 transition-transform ${isMenuOpen ? "rotate-180" : "rotate-0"}`} />
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Ingresar
              </button>
            )}

            {/* Menú desplegable avatar */}
            {isMenuOpen && user && (
              <div className="absolute top-12 right-0 w-40 bg-white shadow-lg flex flex-col z-50">
                <button onClick={() => { navigate("/perfil"); setIsMenuOpen(false); }} className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer">Mi perfil</button>
                <button onClick={() => { navigate("/mis-turnos"); setIsMenuOpen(false); }} className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer">Mis turnos</button>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="px-4 py-2 text-left hover:bg-gray-100 text-red-500 font-medium cursor-pointer">Cerrar sesión</button>
              </div>
            )}
          </div>

          {/* Mobile: nombre + hamburger */}
          {user && (
            <p className="sm:hidden text-md font-medium">{user.nombreApellido}</p>
          )}
          <div className="sm:hidden relative" ref={hamburgerRef}>
            <FaBars onClick={toggleHamburger} className="text-2xl cursor-pointer" />
            {isHamburgerOpen && (
              <div className="absolute top-full right-0 w-56 bg-white shadow-lg flex flex-col p-2 z-50">
                <Link to="/" onClick={() => setIsHamburgerOpen(false)} className="px-4 py-2 hover:bg-gray-100 rounded">Inicio</Link>
                <Link to="/buscar-profesional" onClick={() => setIsHamburgerOpen(false)} className="px-4 py-2 hover:bg-gray-100 rounded">Profesionales</Link>

                {user ? (
                  <>
                    <button onClick={() => { navigate("/perfil"); setIsHamburgerOpen(false); }} className="px-4 py-2 text-left hover:bg-gray-100">Mi perfil</button>
                    <button onClick={() => { navigate("/mis-turnos"); setIsHamburgerOpen(false); }} className="px-4 py-2 text-left hover:bg-gray-100">Mis turnos</button>
                    <button onClick={() => { logout(); setIsHamburgerOpen(false); }} className="px-4 py-2 text-left hover:bg-gray-100 text-red-600 font-medium">Cerrar sesión</button>
                  </>
                ) : (
                  <button onClick={() => { setIsLoginOpen(true); setIsHamburgerOpen(false); }} className="px-4 py-2 text-left bg-blue-500 text-white rounded-sm font-medium hover:bg-blue-600 transition-colors">Ingresar</button>
                )}
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Modal de login */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default NavBar;
