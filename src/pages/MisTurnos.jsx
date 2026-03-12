import { useState, useEffect, useContext } from "react";
import { ProfContext } from "../context/ProfContext";
import { useAuth } from "../context/AuthContext";
import { SwalWarning, SwalSuccess } from "../utils/swal";

const MisTurnos = () => {
  const { prof, guardarTurno } = useContext(ProfContext);
  const { user } = useAuth();
  const [turnosUsuario, setTurnosUsuario] = useState([]);

  // Filtrar de turnos del usuario
  useEffect(() => {
    if (!user || !prof) return;

    const turnos = prof
      .map((p) =>
        p.turnos
          ?.filter((t) => t.userId === user.id)
          .map((t) => ({ ...t, profesional: { id: p.id, nombre: p.nombre } }))
      )
      .flat();
    setTurnosUsuario(turnos || []);
  }, [user, prof]);

  // Cancelar turno
  const cancelarTurno = async (turno) => {
    if (!user) return;

    const result = await SwalWarning.fire({
      title: "¿Estás seguro de cancelar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const profesional = prof.find((p) => p.id === turno.profesional.id);
        if (!profesional) throw new Error("Profesional no encontrado");

        const turnosActualizados = profesional.turnos.filter(
          (t) =>
            !(t.userId === user.id && t.fecha === turno.fecha && t.hora === turno.hora)
        );

        await guardarTurno(profesional.id, turnosActualizados, true);

        SwalSuccess.fire({
          icon: "success",
          title: "Turno cancelado",
          text: "El turno se eliminó correctamente",
          timer: 2500,
          showConfirmButton: false,
        });

        setTurnosUsuario((prev) =>
          prev.filter(
            (t) =>
              !(t.userId === user.id && t.fecha === turno.fecha && t.hora === turno.hora && t.profesional.id === turno.profesional.id)
          )
        );
      } catch (err) {
        console.error(err);
        alert("Error al cancelar el turno, intente nuevamente");
      }
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

  if (turnosUsuario.length === 0) {
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
        {turnosUsuario.map((turno, index) => {
          
          const fecha = new Date(turno.fecha);
          const opciones = { weekday: "long", day: "numeric", month: "long" };
          const fechaFormateada = fecha.toLocaleDateString("es-AR", opciones);

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
            >
              <h2 className="font-semibold text-lg text-center mb-2">
                Turno con Dr. {turno.profesional.nombre}
              </h2>

              <p>
                <span className="font-medium">El día:</span> {fechaFormateada}
              </p>

              <p>
                <span className="font-medium">A las:</span> {turno.hora} hs
              </p>

              <button
                onClick={() => cancelarTurno(turno)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition cursor-pointer"
              >
                Cancelar Turno
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MisTurnos;