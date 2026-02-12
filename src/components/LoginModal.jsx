import { useState, useRef, useEffect } from "react"; // <- agregamos useEffect
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg w-11/12 max-w-md p-6 relative"
        ref={closeRef}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar Sesión</h2>

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
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Ingresar
          </button>
        </form>

        {/* Links secundarios */}
        <div className="mt-4 flex justify-between text-sm text-blue-500">
          <button
            type="button"
            className="hover:underline"
            onClick={() => alert("Registrar usuario")}
          >
            Registrarse
          </button>
          <button
            type="button"
            className="hover:underline"
            onClick={() => alert("Recuperar contraseña")}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
