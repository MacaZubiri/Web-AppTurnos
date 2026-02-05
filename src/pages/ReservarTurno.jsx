import { useState, useEffect } from "react";
import profesionalesData from "../Data/Profesionales.js";
import { useParams } from "react-router-dom";

const ReservarTurno = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [turnosGuardados, setTurnosGuardados] = useState([]);

  // Cargar turnos guardados desde localStorage
  useEffect(() => {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    setTurnosGuardados(turnos);
  }, []);

  const confirmarTurno = () => {
    if (!horarioSeleccionado) {
      alert("Seleccioná un horario");
      return;
    }

    const nuevoTurno = {
      profesional: selected,
      dia: horarioSeleccionado.dia,
      horario: horarioSeleccionado.hora,
    };

    const turnosActualizados = [...turnosGuardados, nuevoTurno];
    setTurnosGuardados(turnosActualizados);
    localStorage.setItem("turnos", JSON.stringify(turnosActualizados));

    alert("Turno reservado con éxito ✅");

    // reset selección
    setHorarioSeleccionado(null);
  };

  // Función para saber si un horario está reservado
  const estaReservado = (dia, hora) => {
    return turnosGuardados.some(
      (t) =>
        t.profesional.id === selected?.id &&
        t.dia === dia &&
        t.horario === hora
    );
  };

  useEffect(() => {
  if (id) {
    const profesionalEncontrado = profesionalesData.find(
      (p) => p.id === Number(id)
    );

    if (profesionalEncontrado) {
      setSelected(profesionalEncontrado);
    }
  }
}, [id]);
  



  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Reservar Turno</h1>
      {/* Selección de profesional */}
      <div className="flex flex-row items-center gap-4 w-full">
        <h2 className="font-medium">Seleccionar un profesional:</h2>

        <div className="relative flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left flex justify-between items-center shadow-sm hover:bg-gray-50"
          >
            {selected ? selected.nombre : "Seleccioná un profesional"}
            <span className="ml-2">▼</span>
          </button>

          {isOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
              {profesionalesData.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => {
                    setSelected(prop);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  {prop.nombre}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabla de horarios */}
      <div className="mt-6 text-center">
        <table className="table-auto border border-gray-200 text-center w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-8 py-2">Lunes</th>
              <th className="border px-8 py-2">Martes</th>
              <th className="border px-8 py-2">Miércoles</th>
              <th className="border px-8 py-2">Jueves</th>
              <th className="border px-8 py-2">Viernes</th>
            </tr>
          </thead>
          <tbody>
            {selected ? (
              <tr>
                {["lunes", "martes", "miercoles", "jueves", "viernes"].map(
                  (dia) => {
                    const horarios = selected.horariosAtencion[dia] || [];

                    return (
                      <td key={dia} className="border px-4 py-2">
                        {horarios.length > 0
                          ? horarios.map((hora) => {
                              const reservado = estaReservado(dia, hora);
                              const seleccionado =
                                horarioSeleccionado?.dia === dia &&
                                horarioSeleccionado?.hora === hora;

                              return (
                                <span
                                  key={hora}
                                  onClick={() =>
                                    !reservado &&
                                    setHorarioSeleccionado({ dia, hora })
                                  }
                                  className={`inline-block rounded px-3 py-1 mx-1 my-1 text-sm cursor-pointer
                                    ${
                                      reservado
                                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                        : seleccionado
                                        ? "bg-green-600 text-white"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                  {hora}
                                </span>
                              );
                            })
                          : "—"}
                      </td>
                    );
                  }
                )}
              </tr>
            ) : (
              <tr>
                <td colSpan={5} className="border px-4 py-2">
                  Seleccioná un profesional para ver los horarios
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Botón confirmar */}
        <button
          onClick={confirmarTurno}
          disabled={!horarioSeleccionado}
          className=" cursor-pointer mt-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-12 rounded"
        >
          Confirmar turno
        </button>
      </div>
    </div>
  );
};

export default ReservarTurno;
