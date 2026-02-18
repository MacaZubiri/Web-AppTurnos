import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import profesionalesData from "../Data/Profesionales";
import { MdEmail } from "react-icons/md";

const PerfilProfesional = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profesional = profesionalesData.find((p) => p.id === Number(id));
  if (!profesional) return <p className="pt-24 text-center">Profesional no encontrado</p>;

  const volverListado = () => navigate(-1);

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">

      {/* Botón volver */}
      <button
        onClick={volverListado}
        className="flex items-center gap-2 mb-7 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <IoArrowBack size={20} /> Volver al listado
      </button>

      {/* Contenedor principal */}
      <div className="bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row md:items-start md:justify-between">

        {/* Izquierda: Imagen + Info */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-6 w-full md:flex-1">

          {/* Imagen */}
          <div className="shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <img
              src={profesional.imagen}
              alt={profesional.nombre}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{profesional.nombre}</h2>
            <p className="text-gray-600 mb-4">{profesional.especialidad}</p>

            <h3 className="font-medium mb-1">Días y horarios de atención:</h3>
            {Object.entries(profesional.horariosAtencion).map(([dia, horarios]) => (
              <p key={dia}>
                <span className="font-normal capitalize ml-2">{dia}:</span>{" "}
                {horarios.join(" | ")}
              </p>
            ))}

            <hr className="border-t border-gray-300 w-full my-4" />

            <h3 className="font-medium mb-1">Sobre mí:</h3>
            <p>{profesional.sobreMi}</p>

            <hr className="border-t border-gray-300 w-full my-4" />

            <h3 className="font-medium mb-1">Formación:</h3>
            <ul className=" ">
              {profesional.formacion.map((titulo, index) => (
                <li key={index}>{titulo}</li>
              ))}
            </ul>

            <hr className="border-t border-gray-300 w-full my-4" />

            <h3 className="font-medium mb-1">Obras sociales:</h3>
            <ul className="">
              {profesional.obrasSociales.map((obra, index) => (
                <li key={index}>{obra}</li>
              ))}
            </ul>

            <hr className="border-t border-gray-300 w-full my-4" />

            <h3 className="font-medium mb-1">Contacto:</h3>
            <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
              <MdEmail className="text-blue-600 w-5 h-5" />
              {profesional.email}
            </div>
          </div>
        </div>

        {/* Botón Reservar turno Desktop */}
        <div className="hidden md:flex md:items-start">
          <button
            onClick={() => navigate(`/reservar-turno/${id}`)}
            className="w-40 h-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out"
          >
            Reservar turno
          </button>
        </div>
      </div>

      {/* Botón sticky Mobile */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white shadow-md md:hidden z-50">
        <button
          onClick={() => navigate(`/reservar-turno/${id}`)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition"
        >
          Reservar turno
        </button>
      </div>
    </div>
  );
};

export default PerfilProfesional;
