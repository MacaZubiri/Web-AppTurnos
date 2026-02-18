import { useState, useRef, useEffect } from "react"; // <- agregamos useEffect
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const closeRef = useRef(null);

  // Cerrar modal al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // mousedown suele ser más fiable que click
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null; // no renderiza si no está abierto

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(usuario, password);
    if (success) {
      onClose(); // cerrar modal si login exitoso
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleRegister = () => {
    onClose();            // 🔥 cierra el modal
    navigate("/registro"); // 👉 redirige
  };

  

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 pt-24">
      <div
        className="bg-white rounded-lg w-11/12 max-w-md p-6 relative max-h-5/12 sm:max-h-9/12"
        ref={closeRef}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-8 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            required
          />

           {/* Links secundarios */}
        <div className="mt-4 flex flex-col gap-2 text-sm mb-4">
          <button
            type="button"
            className=""
            onClick={handleRegister}
          >
           ¿No tienes usuario?<span className="hover:underline text-blue-500 cursor-pointer"> Registrarse aquí</span>
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
