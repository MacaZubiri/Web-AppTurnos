import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function LoginModal({ onClose, onLogin }) {

   const navigate = useNavigate();

   const handleLogin = () => {
    onClose();       // cerramos el modal
    onLogin();       // llamamos a la función de login del Layout

  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}   // 👈 click fuera
    >
      <div
        className="bg-white p-6 w-5/12 h-96 relative rounded-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} // 👈 no cerrar al clickear dentro
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-900 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border mb-2 p-2 rounded-md border-gray-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border mb-4 p-2 rounded-md border-gray-400"
        />

        <div>
          <h3 className="text-sm text-gray-600 mb-3">¿Has olvidado tu contraseña? <span className="text-blue-500 cursor-pointer hover:underline">
            Haz click aquí
          </span></h3>
        </div>

        <div>
          <h3 className="text-sm text-gray-600 mb-8">¿No tienes cuenta? <span className="text-blue-500 cursor-pointer hover:underline">
            Registrarse
          </span></h3>
        </div>

        

        <button onClick={() => {
            onLogin(); // cambia estado en Layout
          }} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600  transition-colors duration-300 ease-in-out cursor-pointer">
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
