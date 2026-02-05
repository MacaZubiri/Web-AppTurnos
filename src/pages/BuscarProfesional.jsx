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
    <div className=" flex flex-col max-w-6xl mx-auto p-4">
      {/* Barra superior: buscador + dropdown */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="relative">
         <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl " />
        <input
          type="text"
          placeholder="Buscar profesional..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border pl-12 pr-3 py-2 rounded h-10 w-96 shadow-sm"
        />
        </div>

        <div className="relative w-64">
          <select
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            className="border px-3 py-2 pr-10 rounded bg-gray-100 shadow-sm h-10 w-full appearance-none cursor-pointer"
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
        <div className="flex flex-col gap-4">
          {profesionalesFiltrados.map((prop) => (
            <div
              key={prop.id}
              className="flex border rounded-lg shadow p-4 items-center bg-gray-100"
            >
              {/* Imagen a la izquierda */}
              <img
                src={prop.imagen}  // <-- usa la propiedad 'imagen'
                alt={prop.nombre}
                className="w-25 h-25 rounded-full object-cover"
              />

              {/* Info + botones */}
              <div className="flex-1 flex justify-between items-center ml-4">
                {/* Información del profesional */}
                <div>
                  <h3 className="font-medium text-lg">{prop.nombre}</h3>
                  <p className="text-gray-700 text-md">{prop.especialidad}</p>
                  <p className="text-sm text-gray-600 mt-2 ml-1">{prop.diasAtencion.join(" | ")}</p>
                </div>

                {/* Botones al extremo derecho */}
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigate(`/perfil-profesional/${prop.id}`)} className="bg-gray-100 border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-4 py-1.5 rounded cursor-pointer transition-colors duration-300 ease-in-out">
                    Ver perfil
                  </button>
                  <button onClick={() => navigate(`/reservar-turno/${prop.id}`)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out">
                    Reservar turno
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
