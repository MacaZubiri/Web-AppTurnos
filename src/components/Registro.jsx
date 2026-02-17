import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser, loading, error, usuarios } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreApellido: "",
    usuario: "",
    password: "",
    telefono: "",
    email: "",
    obraSocial: {
      nombre: "",
      numeroAfiliado: "",
    },
  });

  // Manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "obraSocialNombre") {
      setFormData((prev) => ({
        ...prev,
        obraSocial: { ...prev.obraSocial, nombre: value },
      }));
    } else if (name === "obraSocialNumero") {
      setFormData((prev) => ({
        ...prev,
        obraSocial: { ...prev.obraSocial, numeroAfiliado: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validaciones
  const validateForm = () => {
    const { nombreApellido, usuario, email, password, telefono, obraSocial } = formData;

    if (!nombreApellido || !usuario || !email || !password || !telefono || !obraSocial.nombre || !obraSocial.numeroAfiliado) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire("Error", "El email no es válido", "error");
      return false;
    }

    // Validar password (mínimo 6 caracteres)
    if (password.length < 6) {
      Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
      return false;
    }

    // Validar teléfono
    const telefonoRegex = /^[0-9\-]+$/;
    if (!telefonoRegex.test(telefono)) {
      Swal.fire("Error", "Número de teléfono no válido", "error");
      return false;
    }

    // Validar duplicados
    if (usuarios?.find(u => u.usuario === usuario)) {
      Swal.fire("Error", "El nombre de usuario ya existe", "error");
      return false;
    }
    if (usuarios?.find(u => u.email === email)) {
      Swal.fire("Error", "El email ya está registrado", "error");
      return false;
    }

    return true;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const usuarioRegistrado = await registerUser(formData);

      await Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: `¡Bienvenido, ${usuarioRegistrado.nombreApellido}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/"); // redirige al dashboard
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex mt-20 justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col w-full gap-6 lg:w-full lg:max-w-3/5 bg-gray-50 p-10 lg:flex lg:flex-col lg:gap-6 lg:mx-20"
      >
        <h2 className="text-3xl font-semibold text-center mb-4">
          Registrarse
        </h2>

        <input
          name="nombreApellido"
          type="text"
          placeholder="Nombre y apellido"
          value={formData.nombreApellido}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />

        <input
          name="usuario"
          type="text"
          placeholder="Nombre de usuario"
          value={formData.usuario}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />

        <input
          name="telefono"
          type="tel"
          placeholder="Número de teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />

        {/* Obra social: dos inputs al lado */}
        <div className=" flex flex-col lg:flex gap-4">
          <input
            name="obraSocialNombre"
            type="text"
            placeholder="Nombre de la obra social"
            value={formData.obraSocial.nombre}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <input
            name="obraSocialNumero"
            type="text"
            placeholder="Número de afiliado"
            value={formData.obraSocial.numeroAfiliado}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        <div className="flex justify-center">
            <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer w-lg  "
            >
            {loading ? "Registrando..." : "Registrarse"}
            </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Register;
