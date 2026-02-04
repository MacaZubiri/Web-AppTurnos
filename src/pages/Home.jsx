import iconocalendario from "../assets/iconos/icono-calendario.svg";
import iconobuscarprofesional from "../assets/iconos/icono-buscarprofesional.svg";
import imagenfondo  from "../assets/imagen-fondo-inicio.svg";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen px-4 sm:px-6 lg:px-8 2xl:pt-12">

      <div className="flex-1 flex flex-col pt-16 md:text-center"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
          Encontrá al profesional que necesitás
        </h1>

        <h2 className="text-lg sm:text-xl mb-8 text-gray-700 text-center">
          ¡Solicitá tu turno en segundos!
        </h2>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center md:flex md:justify-center">
          <button
            onClick={() => navigate("/reservar-turno")}
            className="flex items-center justify-center gap-2
                       w-full sm:w-auto
                       px-6 py-3 bg-blue-500 text-white rounded-lg
                       hover:bg-blue-600 transition cursor-pointer"
          >
          
            <img
              src={iconocalendario}
              alt="Icono calendario"
              className="w-5 h-5"
            />
            Reservar un turno
          </button>

          <button
            onClick={() => navigate("/buscar-profesional")}
            className="flex items-center justify-center gap-2
                       w-full sm:w-auto
                       px-6 py-3 text-blue-500
                       border border-blue-500 rounded-lg
                       hover:bg-blue-50 transition cursor-pointer"
          >
            <img
              src={iconobuscarprofesional}
              alt="Icono buscar profesional"
              className="w-5 h-5 "
            />
            Buscar Profesional
          </button>
        </div>
      </div>


    </div>
  );
};

export default Home;