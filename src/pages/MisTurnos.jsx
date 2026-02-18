import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {SwalWarning} from "../utils/swal";

const MisTurnos = () => {
  const { user } = useAuth();
  const [turnos, setTurnos] = useState([]);

  // Cargar turnos del usuario
  useEffect(() => {
    if (!user) return;
    const turnosPorUsuario = JSON.parse(localStorage.getItem("turnosPorUsuario")) || {};
    setTurnos(turnosPorUsuario[user.id] || []);
  }, [user]);

  // Cancelar turno
  const cancelarTurno = async (index) => {
    if (!user) return;

    const result = await SwalWarning.fire({
      title: "¿Estás seguro de que quieres cancelar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // Actualizamos localStorage y estado
      const turnosPorUsuario = JSON.parse(localStorage.getItem("turnosPorUsuario")) || {};
      const turnosUsuario = turnosPorUsuario[user.id] || [];
      const turnosActualizados = turnosUsuario.filter((_, i) => i !== index);
      turnosPorUsuario[user.id] = turnosActualizados;
      localStorage.setItem("turnosPorUsuario", JSON.stringify(turnosPorUsuario));
      setTurnos(turnosActualizados);

      Swal.fire("Turno cancelado", "El turno fue eliminado correctamente", "success");
    }
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
            <h2 className="font-semibold text-lg text-center mb-2">
              Turno con Dr. {turno.profesional.nombre}
            </h2>
            <p>
              <span className="font-medium">El día:</span> {turno.dia}
            </p>
            <p>
              <span className="font-medium">A las:</span> {turno.horario} horas.
            </p>

            <button
              onClick={() => cancelarTurno(index)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition cursor-pointer"
            >
              Cancelar Turno
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisTurnos;
