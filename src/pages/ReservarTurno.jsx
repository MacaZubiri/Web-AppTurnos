import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfContext } from "../context/ProfContext";
import { useAuth } from "../context/AuthContext";
import { SwalSuccess } from "../utils/swal";
import { IoArrowBack } from "react-icons/io5";

const ReservarTurno = () => {
  const navigate = useNavigate();
  const { prof, loading, guardarTurno } = useContext(ProfContext);
  const { user } = useAuth();
  const { id } = useParams();

  // 🔹 Hooks de estado al nivel superior
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [profSeleccionado, setProfSeleccionado] = useState(null);
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [dropdownNombre, setDropdownNombre] = useState(false);
  const [dropdownEspecialidad, setDropdownEspecialidad] = useState(false);

  const nombreRef = useRef(null);
  const especialidadRef = useRef(null);
  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  // 🔹 Cerrar dropdowns al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nombreRef.current && !nombreRef.current.contains(event.target)) {
        setDropdownNombre(false);
      }
      if (especialidadRef.current && !especialidadRef.current.contains(event.target)) {
        setDropdownEspecialidad(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Cargar profesional si viene id en URL
  useEffect(() => {
    if (id && prof.length > 0) {
      const profEncontrado = prof.find((p) => p.id.toString() === id.toString());
      setProfSeleccionado(profEncontrado || null);
    }
  }, [id, prof]);

  if (loading) return <p className="pt-24 text-center">Cargando profesionales...</p>;

  // 🔹 Listados para dropdowns
  const nombresProfesionales = Array.from(new Set(prof.map((p) => p.nombre)));
  const especialidades = Array.from(new Set(prof.map((p) => p.especialidad)));

  // 🔹 Filtrado de profesionales
  const profesionalesFiltrados = !id
    ? prof.filter(
        (p) =>
          (nombreSeleccionado === "" || p.nombre === nombreSeleccionado) &&
          (especialidad === "" || p.especialidad === especialidad)
      )
    : profSeleccionado
    ? [profSeleccionado]
    : [];

  // 🔹 Comprobar si el horario ya está reservado por el usuario
  const estaReservado = (prof, dia, hora) =>
    prof.turnos?.some((t) => t.userId === user?.id && t.dia === dia && t.hora === hora);

  // 🔹 Confirmar turno
  const confirmarTurno = async () => {
    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }
    if (!horarioSeleccionado || !profSeleccionado) {
      alert("Seleccioná un profesional y un horario");
      return;
    }

    const nuevoTurno = {
      dia: horarioSeleccionado.dia,
      hora: horarioSeleccionado.hora,
      userId: user.id,
      nombreUsuario: user.nombre,
    };

    try {
      await guardarTurno(profSeleccionado.id, nuevoTurno);
      SwalSuccess.fire({
        icon: "success",
        title: "Turno reservado",
        text: "Se guardó correctamente y podés verlo en Mis Turnos",
        timer: 3000,
        showConfirmButton: false,
      });
      setHorarioSeleccionado(null);
    } catch (err) {
      alert("Error al reservar el turno");
      console.error(err);
    }
  };

  // 🔹 Volver al listado
  const volverListado = () => navigate(-1);

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">
      {/* Botón volver */}
      <button
        onClick={volverListado}
        className="flex items-center gap-2 mb-7 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <IoArrowBack size={20} /> Volver 
      </button>

      <h1 className="text-center text-2xl font-bold mb-6">Reservar Turno</h1>

      {/* 🔹 Dropdowns solo si no viene id */}
      {!id && (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          {/* Dropdown Nombre */}
          <div className="relative w-full md:w-1/2" ref={nombreRef}>
            <button
              onClick={() => setDropdownNombre(!dropdownNombre)}
              className="w-full border px-4 py-2 rounded bg-gray-100 shadow-sm h-10 flex justify-between items-center cursor-pointer"
            >
              {nombreSeleccionado || "Seleccioná un profesional"}
              <span className="text-gray-500">▼</span>
            </button>
            {dropdownNombre && (
              <ul className="absolute z-20 w-full max-h-60 overflow-y-auto bg-white border rounded shadow mt-1">
                <li
                  onClick={() => {
                    setNombreSeleccionado("");
                    setDropdownNombre(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  Todos los profesionales
                </li>
                {nombresProfesionales.map((nombre) => (
                  <li
                    key={nombre}
                    onClick={() => {
                      setNombreSeleccionado(nombre);
                      setDropdownNombre(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dropdown Especialidad */}
          <div className="relative w-full md:w-1/2" ref={especialidadRef}>
            <button
              onClick={() => setDropdownEspecialidad(!dropdownEspecialidad)}
              className="w-full border px-4 py-2 rounded bg-gray-100 shadow-sm h-10 flex justify-between items-center cursor-pointer"
            >
              {especialidad || "Todas las especialidades"}
              <span className="text-gray-500">▼</span>
            </button>
            {dropdownEspecialidad && (
              <ul className="absolute z-20 w-full max-h-60 overflow-y-auto bg-white border rounded shadow mt-1">
                <li
                  onClick={() => {
                    setEspecialidad("");
                    setDropdownEspecialidad(false);
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
                      setDropdownEspecialidad(false);
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
      )}

      {/* 🔹 Cards de horarios */}
      {profesionalesFiltrados.length === 0 ? (
        <p className="text-center mt-10">No se encontraron profesionales</p>
      ) : (
        profesionalesFiltrados.map((profActual) => (
          <div key={profActual.id} className="mb-10">
            <h2 className="font-semibold text-xl mb-4">{profActual.nombre}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {diasSemana.map((dia) => {
                const horarios = profActual.horariosAtencion[dia];
                if (!horarios || horarios.length === 0) return null;
                return (
                  <div key={dia} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                    <h3 className="font-semibold mb-2 capitalize">{dia}</h3>
                    <div className="flex flex-wrap">
                      {horarios.map((hora) => {
                        const reservado = estaReservado(profActual, dia, hora);
                        const seleccionado =
                          horarioSeleccionado?.dia === dia &&
                          horarioSeleccionado?.hora === hora &&
                          profSeleccionado?.id === profActual.id;
                        return (
                          <span
                            key={hora}
                            onClick={() => {
                              if (!reservado) {
                                setHorarioSeleccionado({ dia, hora });
                                setProfSeleccionado(profActual);
                              }
                            }}
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
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* 🔹 Botón Reservar sticky Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50">
        <button
          onClick={confirmarTurno}
          disabled={!profSeleccionado || !horarioSeleccionado}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition"
        >
          Reservar turno
        </button>
      </div>

      {/* 🔹 Botón Reservar Desktop */}
      <div className="hidden sm:flex justify-center mb-10">
        <button
          onClick={confirmarTurno}
          disabled={!profSeleccionado || !horarioSeleccionado}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-12 rounded transition cursor-pointer"
        >
          Reservar turno
        </button>
      </div>
    </div>
  );
};

export default ReservarTurno;