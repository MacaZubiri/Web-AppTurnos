import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProf } from "../context/ProfContext";
import { FaUser, FaUserTie } from "react-icons/fa";

const PanelAdmin = () => {
  const { usuarios, loading: loadingUsuarios } = useAuth();
  const { prof, loading: loadingProf } = useProf();
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
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel Administrador</h1>

      {/* Usuarios */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUser /> Usuarios
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Usuario</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Rol</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Profesionales */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUserTie /> Profesionales
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Especialidad</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {prof?.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.nombre}</td>
                  <td className="border p-2">{p.especialidad}</td>
                  <td className="border p-2">{p.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PanelAdmin;