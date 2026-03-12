import { useState, useRef, useEffect } from "react"; 
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const closeRef = useRef(null);
  const usuarioRef = useRef(null); 

  
  useEffect(() => {
    if (isOpen) {
      usuarioRef.current?.focus();
    }
  }, [isOpen]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null; 

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(usuario, password);
    if (success) {
      onClose();        
      navigate("/");    
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleRegister = () => {
    onClose();            
    navigate("/registro"); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg w-11/12 max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
        ref={closeRef}
      >
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-8 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          
          <input
            ref={usuarioRef}
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          
          <div className="mt-4 flex flex-col gap-2 text-sm mb-4">
            <button
              type="button"
              className=""
              onClick={handleRegister}
            >
              ¿No tienes usuario?{" "}
              <span className="hover:underline text-blue-500 cursor-pointer">
                Registrarse aquí
              </span>
            </button>
            <button
              type="button"
              className="hover:underline cursor-pointer"
              onClick={() => alert("Recuperar contraseña")}
            >
              Olvidé mi contraseña
            </button>
          </div>

          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;