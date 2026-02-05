import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import profesionalesData from "../Data/Profesionales";
import { MdEmail } from "react-icons/md";

const PerfilProfesional = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profesional = profesionalesData.find((p) => p.id === Number(id));
  if (!profesional) return <p>Profesional no encontrado</p>;

  const volverListado = () => navigate(-1); // o navigate("/") si querés ir siempre al listado

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={volverListado}
        className="flex items-center gap-2 mb-7 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <IoArrowBack size={20} /> Volver al listado
      </button>

      
      <div className="flex flex-col h-auto w-full max-w-6xl mx-auto justify-center bg-gray-100 pl-10 pt-10 pr-10">
        <div className="flex justify-between">
        
            <img
              src={profesional.imagen}
              alt={profesional.nombre}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            
          <button onClick={() => navigate(`/reservar-turno/${id}`)} className=" mt-8 w-40 h-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out">
            Reservar turno
          </button>

        </div>  
        <h2 className="text-2xl font-bold">{profesional.nombre}</h2>
        <p className="text-gray-600 mb-6">{profesional.especialidad}</p>
        <h3 className="font-medium mb-2 "> Días y horarios de atención:</h3>
              {Object.entries(profesional.horariosAtencion).map(([dia, horarios]) => (
          <p key={dia}>
            <span className="font-normal capitalize ml-6 leading-relaxed">{dia}:</span>{" "}
            {horarios.join(" | ")}
          </p>
        ))}
        <hr className="border-t border-gray-300 w-full my-4 mr-10" />

        <h3 className="font-medium mb-2 mt-4">Sobre mí:</h3>
        <p>{profesional.sobreMi}</p>

        <hr className="border-t border-gray-300 w-full my-4 mr-10" />

        <h3 className="font-medium mb-2 mt-4">Formación:</h3>
        <ul className="list-disc ml-6">
          {profesional.formacion.map((titulo, index) => (
            <li key={index} className="ml-6">
              {titulo}
            </li>
          ))}
        </ul>
        
        <hr className="border-t border-gray-300 w-full my-4 mr-10" />

        <h3 className="font-medium mb-2 mt-4">Obras sociales:</h3>
        <ul className="list-disc ml-6">
          {profesional.obrasSociales.map((obraSocial, index) => (
            <li key={index} className="ml-6">
              {obraSocial}
            </li>
          ))}
        </ul>
        <hr className="border-t border-gray-300 w-full my-4 mr-10" />
        
        <h3 className="font-medium mb-2 mt-4">Contacto</h3>
        <div className="flex mb-10">
           <MdEmail className="text-blue-600 mr-2 mt-1 w-5 h-5" />{profesional.email}
          
        </div>
        </div>
      </div>
  );
};

export default PerfilProfesional;
``
