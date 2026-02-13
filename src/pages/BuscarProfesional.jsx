import { useState } from "react";
import profesionalesData from "../Data/Profesionales.js";
import { IoMdSearch } from "react-icons/io";
import { useNavigate} from "react-router-dom";

const BuscarProfesionales = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  // Filtrar profesionales según búsqueda y especialidad
  const profesionalesFiltrados = profesionalesData.filter(
    (prop) =>
      prop.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (especialidad === "" || prop.especialidad === especialidad)
  );
  

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-4">
  {/* Barra superior: buscador + dropdown */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 mt-20 w-full">
    
    {/* Buscador */}
    <div className="relative w-full md:flex-1">
      <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        placeholder="Buscar profesional..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border border-gray-600 pl-12 pr-3 py-2 rounded w-full shadow-sm focus:border-blue-500"
      />
    </div>

    {/* Dropdown */}
    <div className="relative w-full md:w-64">
      <select
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
        className="border px-3 py-2 rounded bg-gray-100 shadow-sm h-10 w-full appearance-none cursor-pointer"
      >
        <option value="">Todas las especialidades</option>
        <option value="Medicina Clínica">Medicina Clínica</option>
        <option value="Odontología General">Odontología General</option>
        <option value="Odontología Pediátrica">Odontología Pediátrica</option>
        <option value="Traumatología">Traumatología</option>
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
        ▼
      </span>
    </div>

  </div>


      {/* Listado de profesionales en cards horizontales */}
          {profesionalesFiltrados.length === 0 ? (
            <p>No se encontraron profesionales</p>
          ) : (

            <div className="flex flex-col gap-4 w-full px-4 sm:px-6">
              
              {profesionalesFiltrados.map((prop) => (
            
            
            <div key={prop.id} className="flex flex-col border rounded-lg shadow p-4 bg-gray-100 w-full md:flex-row md:items-center ">

            {/* Imagen arriba en mobile, izquierda en desktop */}
            <div>
              <img
              src={prop.imagen}
              alt={prop.nombre}
              className="w-28 h-28 rounded-full object-cover mb-4 md:mb-0 md:mr-10 mx-auto md:mx-0"
            />
            </div>

            <div className="md:flex md:justify-between md:w-full ">

            {/* Contenedor de info */}
            <div className="flex-1 flex flex-col text-center md:text-left md:justify-center  w-full">
              
              {/* Información */}
              <h3 className="font-medium text-lg">{prop.nombre}</h3>
              <p className="text-gray-700 text-md">{prop.especialidad}</p>
              <p className="text-sm text-gray-600 mt-2">{prop.diasAtencion.join(" | ")}</p>
              
              </div>

              {/* Botones */}
              
              <div className="flex flex-col gap-2 mt-6 md:mt-0 w-full md:w-40 md:justify-center   ">
                <button
                  onClick={() => navigate(`/perfil-profesional/${prop.id}`)}
                  className="w-full bg-gray-100 border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-4 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out"
                >
                  Ver perfil
                </button>
                <button
                  onClick={() => navigate(`/reservar-turno/${prop.id}`)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out"
                >
                  Reservar
                </button>
              </div>
            </div>
            </div>
            
        ))}
      </div>
)}
    </div>
  );
};

export default BuscarProfesionales;
