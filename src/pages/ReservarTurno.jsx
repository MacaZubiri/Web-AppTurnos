import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profesionalesData from "../Data/Profesionales.js";
import { useAuth } from "../context/AuthContext";

const ReservarTurno = () => {
  const { id } = useParams();
  const { user } = useAuth(); // usuario logueado, puede ser null
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [turnosGuardados, setTurnosGuardados] = useState([]);

  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  // Cargar turnos del usuario logueado (solo si hay user)
  useEffect(() => {
    if (!user) {
      setTurnosGuardados([]);
      return;
    }

    const turnosPorUsuario =
      JSON.parse(localStorage.getItem("turnosPorUsuario")) || {};
    setTurnosGuardados(turnosPorUsuario[user.id] || []);
  }, [user]);

  // Cargar profesional por ID
  useEffect(() => {
    if (id) {
      const profesionalEncontrado = profesionalesData.find(
        (p) => p.id === Number(id)
      );
      if (profesionalEncontrado) setSelected(profesionalEncontrado);
    }
  }, [id]);

  // Confirmar turno
  const confirmarTurno = () => {
    if (!user) {
      alert("⚠️ Debes iniciar sesión para reservar un turno");
      return;
    }

    if (!horarioSeleccionado) {
      alert("Seleccioná un horario");
      return;
    }

    const nuevoTurno = {
      profesional: selected,
      dia: horarioSeleccionado.dia,
      horario: horarioSeleccionado.hora,
    };

    const turnosPorUsuario =
      JSON.parse(localStorage.getItem("turnosPorUsuario")) || {};
    const turnosUsuario = turnosPorUsuario[user.id] || [];
    const turnosActualizados = [...turnosUsuario, nuevoTurno];

    turnosPorUsuario[user.id] = turnosActualizados;
    localStorage.setItem("turnosPorUsuario", JSON.stringify(turnosPorUsuario));
    setTurnosGuardados(turnosActualizados);

    alert("✅ Turno reservado con éxito");
    setHorarioSeleccionado(null);
  };

  // Borrar turnos del usuario logueado
  const resetearTurnos = () => {
    if (!user) {
      alert("No hay usuario logueado para borrar turnos");
      return;
    }
    if (
      window.confirm(
        "¿Seguro que querés borrar todos tus turnos guardados?"
      )
    ) {
      const turnosPorUsuario =
        JSON.parse(localStorage.getItem("turnosPorUsuario")) || {};
      turnosPorUsuario[user.id] = [];
      localStorage.setItem("turnosPorUsuario", JSON.stringify(turnosPorUsuario));
      setTurnosGuardados([]);
      alert("✅ Tus turnos fueron borrados");
    }
  };

  // Saber si un horario está reservado (solo por usuario actual)
  const estaReservado = (dia, hora) => {
    return turnosGuardados.some(
      (t) =>
        t.profesional.id === selected?.id &&
        t.dia === dia &&
        t.horario === hora
    );
  };

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">
      <h1 className="text-center text-2xl font-bold mb-6">Reservar Turno</h1>

      {/* Selección de profesional */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-8">
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

      {/* Cards de horarios */}
      {selected ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {diasSemana.map((dia) => {
            const horarios = selected.horariosAtencion[dia] || [];
            return (
              <div
                key={dia}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                <h3 className="font-semibold mb-2 capitalize">{dia}</h3>
                {horarios.length > 0 ? (
                  <div className="flex flex-wrap">
                    {horarios.map((hora) => {
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
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">—</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-24">
          Seleccioná un profesional para ver los horarios
        </p>
      )}

      {/* Botón sticky mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50">
        <button
          onClick={confirmarTurno}
          disabled={!horarioSeleccionado}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition"
        >
          Confirmar turno
        </button>
      </div>

      {/* Botón desktop */}
      <div className="hidden sm:flex justify-center mb-4 gap-4">
        <button
          onClick={confirmarTurno}
          disabled={!horarioSeleccionado}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-12 rounded transition"
        >
          Confirmar turno
        </button>
        {user && (
          <button
            onClick={resetearTurnos}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition"
          >
            Borrar mis turnos
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservarTurno;
