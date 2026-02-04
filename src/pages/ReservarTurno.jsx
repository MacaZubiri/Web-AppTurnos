import { useState } from "react";
import profesionalesData from "../Data/Profesionales.js"; 

const ReservarTurno = () => {
  // Estado para abrir/cerrar el dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Estado para guardar el profesional seleccionado (todo el objeto)
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-6">Reservar turno</h1>

      {/* Contenedor del formulario */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full max-w-md">
          
          {/* Label fijo */}
          <h2 className="font-medium mt-2 mb-3">Seleccionar un profesional:</h2>

          {/* Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left flex justify-between items-center shadow-sm hover:bg-gray-50"
            >
              {/* Mostramos solo el nombre */}
              {selected ? selected.nombre : "Seleccioná un profesional"}
              <span className="ml-2">▼</span>
            </button>

            {/* Menú desplegable */}
            {isOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                {profesionalesData.map((pro) => (
                  <div
                    key={pro.id}
                    onClick={() => {
                      setSelected(pro);  // guardamos todo el objeto
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                  >
                    {pro.nombre}  {/* solo mostramos el nombre */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservarTurno;
