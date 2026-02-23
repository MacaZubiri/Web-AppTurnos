import { MdPhone, MdEmail, MdCreditCard } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { ProfContext } from "../context/ProfContext";
import ModalDatosPersonales from "../components/ModalDatosPersonales";
import { SwalWarning, SwalSuccess } from "../utils/swal";

const Perfil = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { prof, guardarTurno } = useContext(ProfContext);
  const [turnosUsuario, setTurnosUsuario] = useState([]);

  // 🔹 Filtrar los turnos del usuario
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

  // 🔹 Cancelar turno
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

  return (
    <>
      {/* 🔹 Card de datos del usuario */}
      <div className="bg-amber-50 w-full py-3 px-4 shadow-md mt-20 flex flex-col justify-center items-center sm:justify-between sm:items-start">
        <div className="mt-2 sm:flex sm:justify-between sm:items-start w-full">
          {/* Datos */}
          <div className="flex flex-col leading-10 items-center sm:justify-start sm:items-start">
            <h1 className="font-bold text-lg mb-2">{user.nombreApellido}</h1>

            <div className="sm:hidden w-full h-px bg-gray-300 mb-5"></div>

            <div className="mb-5">
              <p className="flex items-center gap-2">
                <MdEmail className="text-blue-600 w-5 h-5" />
                {user.email}
              </p>

              <p className="flex items-center gap-2">
                <MdPhone className="text-blue-600 w-5 h-5" />
                {user.telefono}
              </p>

              <p className="flex items-center gap-2">
                <MdCreditCard className="text-blue-600 w-5 h-5" />
                {user.obraSocial?.nombre} ({user.obraSocial?.numeroAfiliado})
              </p>
            </div>
          </div>

          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen h-px bg-gray-300 my-4 sm:hidden"></div>

          {/* Botón Editar */}
          <div className="flex w-full items-center justify-center sm:justify-end">
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setIsOpen(true)}
            >
              Editar datos personales
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 Modal */}
      {isOpen && <ModalDatosPersonales user={user} onClose={() => setIsOpen(false)} />}

      

      {/* 🔹 Mis Turnos - bloque separado */}
      <div className="pt-8 px-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Mis Turnos</h1>

        {turnosUsuario.length === 0 ? (
          <p className="text-gray-500 text-center">No tenés turnos reservados aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {turnosUsuario.map((turno, index) => {
              // 🔹 Parsear la fecha correctamente
              const fecha = new Date(turno.fecha); // turno.fecha viene de tu nuevo contexto
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
        )}
      </div>
    </>
  );
};

export default Perfil;