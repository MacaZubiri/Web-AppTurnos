import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const estadosColores = {
  confirmado: "bg-green-500 text-white",
  cancelado: "bg-red-500 text-white",
  ausente: "bg-yellow-400 text-black",
  asistio: "bg-blue-500 text-white",
};

const MisTurnos = () => {
  const { user } = useAuth();
  const [turnos, setTurnos] = useState([]);

  // Cargar turnos del usuario
  useEffect(() => {
    if (!user) return;

    const turnosPorUsuario =
      JSON.parse(localStorage.getItem("turnosPorUsuario")) || {};
    setTurnos(turnosPorUsuario[user.id] || []);
  }, [user]);

  // Cancelar turno: lo elimina y libera el horario
  const cancelarTurno = (index) => {
    if (!user) return;
    if (!window.confirm("¿Querés cancelar este turno?")) return;

    const turnosPorUsuario =
      JSON.parse(localStorage.getItem("turnosPorUsuario")) || {};
    const turnosUsuario = turnosPorUsuario[user.id] || [];

    // Eliminamos el turno del array
    const turnosActualizados = turnosUsuario.filter((_, i) => i !== index);

    // Guardamos en localStorage y actualizamos estado
    turnosPorUsuario[user.id] = turnosActualizados;
    localStorage.setItem("turnosPorUsuario", JSON.stringify(turnosPorUsuario));
    setTurnos(turnosActualizados);

    alert("✅ Turno cancelado. Este horario ya está disponible para reservar.");
  };

  if (!user) {
    return (
      <div className="pt-24 px-4 text-center">
        <p className="text-red-500 font-medium">
          Debes iniciar sesión para ver tus turnos.
        </p>
      </div>
    );
  }

  if (turnos.length === 0) {
    return (
      <div className="pt-24 px-4 text-center">
        <p className="text-gray-500">No tenés turnos reservados aún.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Mis Turnos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {turnos.map((turno, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
          >
            <h2 className="font-semibold text-lg">{turno.profesional.nombre}</h2>
            <p>
              <span className="font-medium">Día:</span> {turno.dia}
            </p>
            <p>
              <span className="font-medium">Hora:</span> {turno.horario}
            </p>

            {/* Estado */}
            <span
              className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                estadosColores[turno.estado || "confirmado"]
              }`}
            >
              {turno.estado || "confirmado"}
            </span>

            {/* Botón cancelar */}
            <button
              onClick={() => cancelarTurno(index)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition"
            >
              Cancelar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisTurnos;
