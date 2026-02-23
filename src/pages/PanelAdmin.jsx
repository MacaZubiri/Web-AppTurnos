// PanelAdmin.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProf } from "../context/ProfContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { SwalSuccess, SwalWarning } from "../utils/swal";
import Spinner from "../components/Spinner";

const PanelAdmin = () => {
  const navigate = useNavigate();
  const { usuarios, loading: loadingUsuarios, editarUsuario, eliminarUsuario } = useAuth();
  const { prof, loading: loadingProf, eliminarProfesional } = useProf();
  const [isDesktop, setIsDesktop] = useState(true);

  // Detectar si es desktop
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 text-center">
        <p className="text-lg font-medium">
          Para utilizar el Panel Administrador, por favor accede desde una computadora.
        </p>
      </div>
    );
  }

  if (loadingUsuarios || loadingProf) {
    return (
      <div className="flex justify-center items-center mt-10">
            <Spinner size={16} color="blue-500" />
        </div>
    );
  }

  // Función para eliminar usuario con confirmación
  const handleEliminarUsuario = async (id) => {
    const result = await SwalWarning.fire({
      title: "¿Seguro que querés eliminar este usuario?",
      icon: "warning",
      text: "Una vez eliminado no se podrá recuperar",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) return;

    await eliminarUsuario(id);

    SwalSuccess.fire({
      icon: "success",
      title: "Usuario eliminado",
      text: "El usuario se eliminó correctamente",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  // Función para eliminar profesional
  const handleEliminarProfesional = async (id) => {
    const res = await SwalWarning.fire({
      title: "¿Seguro que querés eliminar este profesional?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!res.isConfirmed) return;

    await eliminarProfesional(id);

    SwalSuccess.fire({
      icon: "success",
      title: "Profesional eliminado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Abrir página para editar profesional
  const handleEditarProfesional = (id) => {
    navigate(`/profesionales/editar/${id}`);
  };

  // Abrir página para crear profesional
  const handleCrearProfesional = () => {
    navigate(`/profesionales/crear`);
  };

  // Abrir página para editar usuario
  const handleEditarUsuario = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  // Abrir página para crear usuario
  const handleCrearUsuario = () => {
    navigate(`/usuarios/crear`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel Administrador</h1>

      {/* Usuarios */}
      <section className="mb-10 text-center w-full">
        <div className="bg-amber-50 w-full p-10 rounded-2xl shadow-gray-400 h-auto">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
            Usuarios
          </h2>
          <div className="flex mb-8 items-start">
            <button
              onClick={handleCrearUsuario}
              className="flex gap-2 items-center font-medium bg-green-700 px-4 py-2 rounded-lg shadow-sm text-amber-50 hover:bg-green-900 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              <FaCirclePlus className="h-4 w-4" /> Crear nuevo usuario
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Usuario</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Rol</th>
                  <th className="border p-2">Obra Social</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="border p-2">{u.id}</td>
                    <td className="border p-2">{u.nombreApellido}</td>
                    <td className="border p-2">{u.usuario}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.role || "usuario"}</td>
                    <td className="border p-2">
                      {u.obraSocial?.nombre} ({u.obraSocial?.numeroAfiliado})
                    </td>
                    <td className="border p-2">
                      <div className="flex gap-2 w-full justify-center">
                        <button
                          onClick={() => handleEditarUsuario(u.id)}
                          className="flex gap-1 bg-blue-400 p-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-sm cursor-pointer"
                        >
                          <FaEdit className="text-amber-50" />
                        </button>
                        <button
                          onClick={() => handleEliminarUsuario(u.id)}
                          className="flex gap-1 bg-red-400 p-2 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-sm cursor-pointer"
                        >
                          <FaTrash className="text-amber-50" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Profesionales */}
      <section>
        <div className="bg-amber-50 w-full p-10 rounded-2xl shadow-gray-400 h-auto">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
            Profesionales
          </h2>
          <div className="flex mb-8 items-start">
            <button
              onClick={handleCrearProfesional}
              className="flex gap-2 items-center font-medium bg-green-700 px-4 py-2 rounded-lg shadow-md text-amber-50 hover:bg-green-900 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              <FaCirclePlus className="h-4 w-4" /> Cargar nuevo profesional
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Especialidad</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {prof?.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="border p-2">{p.id}</td>
                    <td className="border p-2">{p.nombre}</td>
                    <td className="border p-2">{p.especialidad}</td>
                    <td className="border p-2">{p.email}</td>
                    <td className="border p-2">
                      <div className="flex gap-2 w-full justify-center">
                        <button
                          onClick={() => handleEditarProfesional(p.id)}
                          className="flex gap-1 bg-blue-400 p-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-sm cursor-pointer"
                        >
                          <FaEdit className="text-amber-50" />
                        </button>
                        <button
                          onClick={() => handleEliminarProfesional(p.id)}
                          className="flex gap-1 bg-red-400 p-2 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-sm cursor-pointer"
                        >
                          <FaTrash className="text-amber-50" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanelAdmin;