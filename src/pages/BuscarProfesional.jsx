import { useState, useRef, useEffect, useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ProfContext } from "../context/ProfContext";
import { useAuth } from "../context/AuthContext";
import { SwalWarning } from "../utils/swal";
import Spinner from "../components/Spinner"


const BuscarProfesionales = () => {
  const navigate = useNavigate();
  const { prof, loading, error } = useContext(ProfContext); // ✅ desde context
  const [busqueda, setBusqueda] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
   const { user } = useAuth();

   

  // Lista de especialidades únicas
  const especialidades = Array.from(
    new Set(prof?.map((p) => p.especialidad) || [])
  );

  // Filtrado de profesionales según búsqueda y especialidad
  const profesionalesFiltrados = prof?.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (especialidad === "" || p.especialidad === especialidad)
  ) || [];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div className="flex justify-center items-center mt-10">
      <Spinner size={16} color="blue-500" />
    </div>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const handleReservar = (profId) => {
    if (user) {
      navigate(`/reservar-turno/${profId}`);
    } else {
      SwalWarning.fire({
        title: "Debe iniciar sesión para reservar un turno",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-4">
      {/* Barra superior */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 mt-20 w-full">
        {/* Buscador */}
        <div className="relative w-full md:flex-1">
          <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Buscar profesional..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-gray-600 pl-12 pr-3 py-2 rounded w-full shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown custom */}
        <div className="relative w-full md:w-64" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border px-4 py-2 rounded bg-gray-100 shadow-sm h-10 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {especialidad || "Todas las especialidades"}
            <span className="text-gray-500">▼</span>
          </button>

          {dropdownOpen && (
            <ul className="absolute z-20 w-full max-h-60 overflow-y-auto bg-white border rounded shadow mt-1">
              <li
                onClick={() => {
                  setEspecialidad("");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                Todas las especialidades
              </li>
              {especialidades.map((esp) => (
                <li
                  key={esp}
                  onClick={() => {
                    setEspecialidad(esp);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  {esp}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Listado de profesionales */}
      {profesionalesFiltrados.length === 0 ? (
        <p className="text-center mt-10">No se encontraron profesionales</p>
      ) : (
        <div className="flex flex-col gap-4 w-full px-2 sm:px-6">
          {profesionalesFiltrados.map((prop) => (
            <div
              key={prop.id}
              className="flex flex-col border rounded-lg shadow p-4 bg-gray-100 w-full md:flex-row md:items-center"
            >
              {/* Imagen */}
              <div>
                <img
                  src={prop.imagen}
                  alt={prop.nombre}
                  className="w-28 h-28 rounded-full object-cover mb-4 md:mb-0 md:mr-10 mx-auto md:mx-0"
                />
              </div>

              <div className="md:flex md:justify-between md:w-full">
                {/* Información */}
                <div className="flex-1 flex flex-col text-center md:text-left md:justify-center w-full">
                  <h3 className="font-medium text-lg">{prop.nombre}</h3>
                  <p className="text-gray-700 text-md">{prop.especialidad}</p>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-2 mt-6 md:mt-0 w-full md:w-40 md:justify-center">
                  <button
                    onClick={() => navigate(`/perfil-profesional/${prop.id}`)}
                    className="w-full bg-gray-100 border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-4 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out"
                  >
                    Ver perfil
                  </button>
                  <button
                     onClick={() => handleReservar(prop.id)}
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