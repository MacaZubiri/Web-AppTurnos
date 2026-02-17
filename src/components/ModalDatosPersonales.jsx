import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const EditProfileModal = ({ user, onClose }) => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    nombreApellido: user.nombreApellido || "",
    email: user.email || "",
    usuario: user.usuario || "",
    password: user.password || "",
    obraSocialNombre: user.obraSocial?.nombre || "",
    obraSocialNumero: user.obraSocial?.numeroAfiliado || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedUser = {
      nombreApellido: formData.nombreApellido,
      email: formData.email,
      usuario: formData.usuario,
      password: formData.password,
      obraSocial: {
        nombre: formData.obraSocialNombre,
        numeroAfiliado: formData.obraSocialNumero,
      },
    };

    try {
      await updateUser(updatedUser); // 🔥 llamada al context
      onClose(); // cerrar modal
    } catch (error) {
      alert("Hubo un error al actualizar el perfil");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="nombreApellido"
            placeholder="Nombre y Apellido"
            value={formData.nombreApellido}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="usuario"
            placeholder="Nombre de usuario"
            value={formData.usuario}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="obraSocialNombre"
            placeholder="Obra Social"
            value={formData.obraSocialNombre}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="obraSocialNumero"
            placeholder="Número de Afiliado"
            value={formData.obraSocialNumero}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
