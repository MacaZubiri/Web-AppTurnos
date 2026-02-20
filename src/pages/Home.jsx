import iconocalendario from "../assets/iconos/icono-calendario.svg";
import iconobuscarprofesional from "../assets/iconos/icono-buscarprofesional.svg";
import { useNavigate } from "react-router-dom";
import { SwalWarning } from "../utils/swal";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Encontrá al profesional que necesitás
        </h1>

        {/* Subtítulo */}
        <h2 className="text-lg sm:text-xl text-gray-700 mb-8">
          ¡Solicitá tu turno en segundos!
        </h2>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">

          {/* Botón Reservar Turno */}
          <button
            onClick={() => {
              if (user) {
                navigate("/reservar-turno"); // usuario logueado → navega
              } else {
                SwalWarning.fire({
                  title: "Debe iniciar sesión para reservar un turno",
                  icon: "warning",
                  showCancelButton: false,
                  confirmButtonText: "Aceptar",
                });
              }
            }}
            className="flex items-center justify-center gap-2
                       w-full sm:w-auto
                       px-6 py-3
                       bg-blue-500 text-white rounded-lg
                       hover:bg-blue-600 transition
                       text-base sm:text-lg cursor-pointer"
          >
            <img
              src={iconocalendario}
              alt="Icono calendario"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            Reservar un turno
          </button>

          {/* Botón Buscar Profesional */}
          <button
            onClick={() => navigate("/buscar-profesional")}
            className="flex items-center justify-center gap-2
                       w-full sm:w-auto
                       px-6 py-3
                       border border-blue-500 text-blue-500 rounded-lg
                       hover:bg-blue-50 transition
                       text-base sm:text-lg cursor-pointer"
          >
            <img
              src={iconobuscarprofesional}
              alt="Icono buscar profesional"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            Buscar profesional
          </button>
        </div>

      </div>
    </section>
  );
};

export default Home;