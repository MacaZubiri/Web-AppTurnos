import iconocalendario from "../assets/iconos/icono-calendario.svg";
import { useNavigate } from "react-router-dom";
import { SwalWarning } from "../utils/swal";
import { useAuth } from "../context/AuthContext";
import header from "../assets/header.svg";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section
      className="relative pt-24 px-4 h-[80vh] pb-10 sm:h-[85vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${header})` }}
    >
      {/* Overlay opcional para mejor contraste */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative max-w-4xl mx-auto text-center text-white pt-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Expertos en salud dedicados a acompañarte en cada etapa de tu vida.
        </h1>

        <h2 className="text-lg sm:text-xl mb-6">
          ¡Solicitá tu turno en segundos!
        </h2>

        <div className="flex gap-4 sm:gap-6 justify-center mt-6 sm:mt-10">
          <button
            onClick={() => {
              if (user) {
                navigate("/reservar-turno");
              } else {
                SwalWarning.fire({
                  title: "Debe iniciar sesión para reservar un turno",
                  icon: "warning",
                  confirmButtonText: "Aceptar",
                });
              }
            }}
            className="flex items-center justify-center gap-2
             w-full max-w-xs mx-auto
             px-6 py-3
             bg-blue-500 text-white rounded-lg
             hover:bg-blue-600 transition cursor-pointer
             sm:w-auto sm:px-20 sm:text-xl shadow-lg "
          >
            <img src={iconocalendario} className="w-5 h-5" />
            Reservar turno
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;