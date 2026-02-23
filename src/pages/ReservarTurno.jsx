import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfContext } from "../context/ProfContext";
import { useAuth } from "../context/AuthContext";
import { SwalSuccess } from "../utils/swal";
import { IoArrowBack } from "react-icons/io5";
import Spinner from "../components/Spinner"

const diasNombre = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const nombresMes = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

const ReservarTurno = () => {
  const navigate = useNavigate();
  const { prof, loading, guardarTurno } = useContext(ProfContext);
  const { user } = useAuth();
  const { id } = useParams();

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [profSeleccionado, setProfSeleccionado] = useState(null);
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [dropdownNombre, setDropdownNombre] = useState(false);
  const [dropdownEspecialidad, setDropdownEspecialidad] = useState(false);

  const nombreRef = useRef(null);
  const especialidadRef = useRef(null);

  // 🔹 Cerrar dropdowns al click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nombreRef.current && !nombreRef.current.contains(event.target)) setDropdownNombre(false);
      if (especialidadRef.current && !especialidadRef.current.contains(event.target)) setDropdownEspecialidad(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Cargar profesional por id
  useEffect(() => {
    if (id && prof.length > 0) {
      const encontrado = prof.find((p) => p.id.toString() === id.toString());
      setProfSeleccionado(encontrado || null);
    }
  }, [id, prof]);

  if (loading) return <div className="flex justify-center items-center mt-10">
        <Spinner size={16} color="blue-500" />
      </div>;

  const nombresProfesionales = Array.from(new Set(prof.map((p) => p.nombre)));
  const especialidades = Array.from(new Set(prof.map((p) => p.especialidad)));

  const profesionalesFiltrados = !id
    ? prof.filter(
        (p) =>
          (nombreSeleccionado === "" || p.nombre === nombreSeleccionado) &&
          (especialidad === "" || p.especialidad === especialidad)
      )
    : profSeleccionado
    ? [profSeleccionado]
    : [];

  // 🔹 Generar horarios a partir de bloques y duración
  const generarHorarios = (bloques, duracion) => {
    const horarios = [];
    bloques.forEach(({ inicio, fin }) => {
      let [hInicio, mInicio] = inicio.split(":").map(Number);
      let [hFin, mFin] = fin.split(":").map(Number);
      let actual = new Date();
      actual.setHours(hInicio, mInicio, 0);
      const limite = new Date();
      limite.setHours(hFin, mFin, 0);
      while (actual < limite) {
        horarios.push(actual.toTimeString().slice(0, 5));
        actual.setMinutes(actual.getMinutes() + duracion);
      }
    });
    return horarios;
  };

  // 🔹 Generar array de fechas solo con disponibilidad
  const generarFechasMes = (profActual) => {
    const fechas = [];
    const hoy = new Date();
    const fin = new Date();
    fin.setMonth(hoy.getMonth() + 1);

    for (let d = new Date(hoy); d <= fin; d.setDate(d.getDate() + 1)) {
      const diaSemana = d.getDay();
      const disponibilidadDelDia = profActual.disponibilidad.find(b => b.diaSemana === diaSemana);
      if (disponibilidadDelDia && disponibilidadDelDia.bloques.length > 0) {
        const horarios = generarHorarios(disponibilidadDelDia.bloques, profActual.duracionTurno);
        if (horarios.length > 0) {
          fechas.push({
            fecha: new Date(d),
            diaSemana,
            horarios
          });
        }
      }
    }
    return fechas;
  };

  // 🔹 Verificar si turno está ocupado
  const estaReservado = (profActual, fecha, hora) =>
    profActual.turnos?.some(
      (t) =>
        new Date(t.fecha).toDateString() === fecha.toDateString() &&
        t.hora === hora
    );

  // 🔹 Confirmar turno
  const confirmarTurno = async () => {
    if (!user) return alert("Debes iniciar sesión");
    if (!horarioSeleccionado || !profSeleccionado) return alert("Seleccioná profesional y horario");

    const nuevoTurno = {
      fecha: horarioSeleccionado.fecha.toISOString(),
      diaSemana: horarioSeleccionado.diaSemana,
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

  const volverListado = () => navigate(-1);

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto pb-36">

      {/* Botón volver */}
      <button
        onClick={volverListado}
        className="flex items-center gap-2 mb-7 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <IoArrowBack size={20} /> Volver 
      </button>

      <h1 className="text-center text-2xl font-bold mb-6">Reservar Turno</h1>

      {/* Dropdowns */}
      {!id && (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
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
                  onClick={() => { setNombreSeleccionado(""); setDropdownNombre(false); }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  Todos los profesionales
                </li>
                {nombresProfesionales.map((nombre) => (
                  <li
                    key={nombre}
                    onClick={() => { setNombreSeleccionado(nombre); setDropdownNombre(false); }}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
                  onClick={() => { setEspecialidad(""); setDropdownEspecialidad(false); }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  Todas las especialidades
                </li>
                {especialidades.map((esp) => (
                  <li
                    key={esp}
                    onClick={() => { setEspecialidad(esp); setDropdownEspecialidad(false); }}
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

      {/* Cards de días y horarios */}
      {profesionalesFiltrados.length === 0 ? (
        <p className="text-center mt-10">No se encontraron profesionales</p>
      ) : (
        profesionalesFiltrados.map((profActual) => {
          const fechas = generarFechasMes(profActual);
          return (
            <div key={profActual.id} className="mb-10">
              <h2 className="font-semibold text-xl mb-4">{profActual.nombre}</h2>

              <div className="flex flex-wrap gap-4">
                {fechas.map(f => (
                  <div 
                    key={f.fecha.toISOString()} 
                    className="bg-white p-4 rounded-lg shadow-md text-center flex-1 min-w-50 md:min-w-62.5"
                  >
                    <h3 className="font-semibold mb-4">
                      {diasNombre[f.diaSemana].charAt(0).toUpperCase() + diasNombre[f.diaSemana].slice(1)} {f.fecha.getDate()} de {nombresMes[f.fecha.getMonth()]}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-2">
                      {f.horarios.map(hora => {
                        const reservado = estaReservado(profActual, f.fecha, hora);
                        const seleccionado =
                          horarioSeleccionado?.hora === hora &&
                          horarioSeleccionado?.fecha?.toDateString() === f.fecha.toDateString() &&
                          profSeleccionado?.id === profActual.id;
                        return (
                          <span
                            key={`${f.fecha.toISOString()}-${hora}`}
                            onClick={() => {
                              if (!reservado) setHorarioSeleccionado({ hora, fecha: f.fecha, diaSemana: f.diaSemana, profId: profActual.id, profNombre: profActual.nombre });
                              setProfSeleccionado(profActual);
                            }}
                            className={`inline-flex justify-center items-center rounded text-sm cursor-pointer
                              ${reservado ? "bg-gray-400 text-gray-700 cursor-not-allowed px-2 py-1"
                              : seleccionado ? "bg-green-600 text-white px-2 py-1"
                              : "bg-blue-500 text-white hover:bg-blue-600 px-2 py-1"
                            }`}
                          >
                            {hora}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Botones Reservar */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50 flex justify-center ">
        <button
          onClick={confirmarTurno}
          disabled={!profSeleccionado || !horarioSeleccionado}
          className={`w-full md:w-auto 
            ${!profSeleccionado || !horarioSeleccionado 
              ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" 
              : "bg-green-600 hover:bg-green-700 cursor-pointer"} 
            text-white font-medium py-3 px-12 rounded-lg transition`}
        >
          Reservar turno
        </button>
      </div>
    </div>
  );
};

export default ReservarTurno;