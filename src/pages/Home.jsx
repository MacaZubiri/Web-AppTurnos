import iconocalendario from "../assets/iconos/icono-calendario.svg";
import iconobuscarprofesional from "../assets/iconos/icono-buscarprofesional.svg";
import imagenfondo  from "../assets/imagen-fondo-inicio.svg";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
     <div className="flex min-h-screen bg-gray-200">

      {/* Izquierda: texto y botones */}
      <div className="flex-1 flex flex-col justify-start pt-48 px-12 ml-2.5">
        <h1 className="text-5xl font-bold mb-4">
          Encontrá al profesional que necesitas
        </h1>
        <h2 className="text-xl mb-8 text-gray-700">
          ¡Solicitá tu turno en segundos!
        </h2>

        {/* Botones lado a lado */}
        <div className="flex gap-8">
          {/* Reservar turno - azul */}
          <button
          onClick={() => navigate("/reservar-turno")} className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer" >
            <img src={iconocalendario} alt="Icono calendario" className="w-5 h-5" />
            Reservar un turno
          </button>

          {/* Buscar profesional - blanco con borde azul */}
          <button
          onClick={() => navigate ("/buscar-profesional")} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition cursor-pointer">
            <img src={iconobuscarprofesional} alt="Icono buscar profesional" className="w-5 h-5" />
            Buscar Profesional
          </button>
        </div>
      </div>

      {/* Derecha: imagen de fondo */}
      <div className="flex-1 flex justify-start">
        <img
          src={imagenfondo}
          alt="Imagen de fondo"
          className="object-contain h-full w-full pr-18  z-0"
        />
      </div>
    </div>
  );}

  export default Home;