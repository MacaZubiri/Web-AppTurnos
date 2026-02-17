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

  // Cerrar menús al hacer click afuera
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
      <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="h-6" />
          </div>

          {/* Links Desktop */}
          <div className="hidden sm:flex flex-1 justify-center gap-8">
            <Link
              to="/"
              className="hover:text-gray-700 font-medium transition-colors"
            >
              Inicio
            </Link>

            <Link
              to="/buscar-profesional"
              className="hover:text-gray-700 font-medium transition-colors"
            >
              Profesionales
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Desktop: Usuario / Login */}
            <div
              className="hidden sm:flex items-center gap-2 relative"
              ref={menuRef}
            >
              {user ? (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <p className="text-sm font-medium whitespace-nowrap">
                    {user.nombreApellido}
                  </p>

                  <HiChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition-colors"
                >
                  Ingresar
                </button>
              )}

              {/* Dropdown Desktop */}
              {isMenuOpen && user && (
                <div className="absolute top-12 right-0 w-44 bg-white shadow-lg rounded-md overflow-hidden">
                  <button
                    onClick={() => {
                      navigate("/perfil");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Mi perfil
                  </button>

                  <button
                    onClick={() => {
                      navigate("/mis-turnos");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Mis turnos
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      navigate ("/");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500 font-medium"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            {/* Mobile: Nombre + Hamburger */}
            <div
              className="flex items-center gap-2 sm:hidden relative"
              ref={hamburgerRef}
            >
              {user && (
                <p className="text-sm font-medium truncate">
                  {user.nombreApellido}
                </p>
              )}

              <FaBars
                onClick={toggleHamburger}
                className="text-2xl cursor-pointer"
              />

              {/* Dropdown Mobile */}
              {isHamburgerOpen && (
                <div className="absolute top-12 right-0 w-56 bg-white shadow-lg rounded-md p-2 flex flex-col gap-1">
                  <Link
                    to="/"
                    onClick={() => setIsHamburgerOpen(false)}
                    className="px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    Inicio
                  </Link>

                  <Link
                    to="/buscar-profesional"
                    onClick={() => setIsHamburgerOpen(false)}
                    className="px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    Profesionales
                  </Link>

                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          navigate("/perfil");
                          setIsHamburgerOpen(false);
                        }}
                        className="px-4 py-2 text-left hover:bg-gray-100 rounded"
                      >
                        Mi perfil
                      </button>

                      <button
                        onClick={() => {
                          navigate("/mis-turnos");
                          setIsHamburgerOpen(false);
                        }}
                        className="px-4 py-2 text-left hover:bg-gray-100 rounded"
                      >
                        Mis turnos
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setIsHamburgerOpen(false);
                        }}
                        className="px-4 py-2 text-left hover:bg-gray-100 text-red-600 font-medium rounded"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsHamburgerOpen(false);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Ingresar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal Login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default NavBar;
