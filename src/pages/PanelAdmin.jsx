import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProf } from "../context/ProfContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import EditarUsuario from "../components/EditarUsuario"; // tu modal de usuario
import EditarProfesional from "../components/EditarProfesional"; 
import CrearUsuarioModal from "../components/CrearUsuarioModal"; // versión adaptada del modal

const PanelAdmin = () => {
  const { usuarios, loading: loadingUsuarios, editarUsuario, eliminarUsuario } = useAuth();
  const { prof, loading: loadingProf, editarProfesional, eliminarProfesional } = useProf();
  const [isDesktop, setIsDesktop] = useState(true);

  // Estados para modal de usuario
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  // Estados para modal de profesional
  const [profModalOpen, setProfModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState(null);

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
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando datos...</p>
      </div>
    );
  }

  // Función para eliminar usuario con confirmación
  const handleEliminarUsuario = async (id) => {
    const result = await Swal.fire({
      title: "¿Seguro que querés eliminar este usuario?",
      icon: "warning",
      text: "Una vez eliminado no se podrá recuperar",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    await eliminarUsuario(id);

    Swal.fire({
      icon: "success",
      title: "Usuario eliminado",
      text: "El usuario se eliminó correctamente",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  // Abrir modal para editar usuario
  const handleEditarUsuario = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  // Abrir modal para crear usuario
  const handleCrearUsuario = () => {
    setCreateUserModalOpen(true);
  };

  // Abrir modal para editar profesional
  const handleEditarProfesional = (prof) => {
    setSelectedProf(prof);
    setProfModalOpen(true);
  };

  // Guardar cambios de profesional
  const handleGuardarProfesional = async (updatedProf) => {
    await editarProfesional(selectedProf.id, updatedProf);
    setProfModalOpen(false);
    setSelectedProf(null);
    Swal.fire("¡Actualizado!", "El profesional fue editado correctamente.", "success");
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
          <div className="flex mb-10">
            <button
              onClick={handleCrearUsuario}
              className="flex gap-2 items-center font-medium bg-blue-600 px-4 py-2 rounded-lg shadow-md text-amber-50 hover:bg-blue-900 transition-colors duration-300 ease-in-out"
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
                          onClick={() => handleEditarUsuario(u)}
                          className="flex gap-1 bg-blue-400 p-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-sm"
                        >
                          <FaEdit className="text-amber-50" />
                        </button>
                        <button
                          onClick={() => handleEliminarUsuario(u.id)}
                          className="flex gap-1 bg-red-400 p-2 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-sm"
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
          <div className="flex mb-10">
            <button className="flex gap-2 items-center font-medium bg-blue-600 px-4 py-2 rounded-lg shadow-md text-amber-50 hover:bg-blue-900 transition-colors duration-300 ease-in-out">
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
                          onClick={() => handleEditarProfesional(p)}
                          className="flex gap-1 bg-blue-400 p-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-sm"
                        >
                          <FaEdit className="text-amber-50" />
                        </button>
                        <button
                          onClick={async () => {
                            const res = await Swal.fire({
                              title: "¿Seguro que querés eliminar este profesional?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Sí, eliminar",
                              cancelButtonText: "Cancelar",
                            });
                            if (!res.isConfirmed) return;
                            await eliminarProfesional(p.id);
                            Swal.fire({
                              icon: "success",
                              title: "Profesional eliminado",
                              timer: 2000,
                              showConfirmButton: false,
                            });
                          }}
                          className="flex gap-1 bg-red-400 p-2 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-sm"
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

      {/* Modales */}
      <EditarUsuario
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        user={selectedUser}
        onSave={async (updatedUser) => {
          await editarUsuario(updatedUser.id, updatedUser);
          setUserModalOpen(false);
          Swal.fire("¡Actualizado!", "El usuario fue editado correctamente.", "success");
        }}
      />

      <EditarProfesional
        profesional={selectedProf}
        isOpen={profModalOpen}
        onClose={() => setProfModalOpen(false)}
        onSave={handleGuardarProfesional}
      />

      <CrearUsuarioModal
        isOpen={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
      />
    </div>
  );
};

export default PanelAdmin;