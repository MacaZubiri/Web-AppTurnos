import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SwalSuccess } from "../utils/swal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEye, IoEyeOff } from "react-icons/io5";

const schemaUsuario = z.object({
  nombreApellido: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  usuario: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  telefono: z.string().min(8, "Teléfono inválido"),
  email: z.string().email({ message: "Email inválido" }),
  obraSocial: z.object({
    nombre: z.string().min(2, "Debe ingresar el nombre de la obra social").optional().or(z.literal("")),
    numeroAfiliado: z.string().min(3, "Número de afiliado inválido").optional().or(z.literal("")),
  }),
});

const Register = () => {
  const { registerUser, loading, error, usuarios } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaUsuario),
    defaultValues: {
      nombreApellido: "",
      usuario: "",
      password: "",
      telefono: "",
      email: "",
      obraSocial: { nombre: "", numeroAfiliado: "" },
    },
  });

  const onSubmit = async (data) => {
    if (usuarios?.find((u) => u.usuario === data.usuario)) {
      return Swal.fire("Error", "El nombre de usuario ya existe", "error");
    }
    if (usuarios?.find((u) => u.email === data.email)) {
      return Swal.fire("Error", "El email ya está registrado", "error");
    }

    try {
      const usuarioRegistrado = await registerUser(data);
      await SwalSuccess.fire({
        icon: "success",
        title: "Registro exitoso",
        text: `¡Bienvenido, ${usuarioRegistrado.nombreApellido}!`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-6 lg:max-w-2xl bg-gray-50 p-10"
      >
        <h2 className="text-3xl font-semibold text-center mb-4">Registrarse</h2>

        {/* Nombre y apellido */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nombre y apellido"
            {...register("nombreApellido")}
            className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          {errors.nombreApellido && (
            <span className="text-red-500 text-sm mt-1">{errors.nombreApellido.message}</span>
          )}
        </div>

        {/* Usuario */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nombre de usuario"
            {...register("usuario")}
            className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          {errors.usuario && (
            <span className="text-red-500 text-sm mt-1">{errors.usuario.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
          )}
        </div>

        {/* Teléfono */}
        <div className="flex flex-col">
          <input
            type="tel"
            placeholder="Número de teléfono"
            {...register("telefono")}
            className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          {errors.telefono && (
            <span className="text-red-500 text-sm mt-1">{errors.telefono.message}</span>
          )}
        </div>

        {/* Contraseña con ojito */}
        <div className="flex flex-col relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password")}
            className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
          )}
        </div>

        {/* Obra social */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <input
              type="text"
              placeholder="Nombre de la obra social*"
              {...register("obraSocial.nombre")}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            {errors.obraSocial?.nombre && (
              <span className="text-red-500 text-sm mt-1">{errors.obraSocial.nombre.message}</span>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <input
              type="text"
              placeholder="Número de afiliado"
              {...register("obraSocial.numeroAfiliado")}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            {errors.obraSocial?.numeroAfiliado && (
              <span className="text-red-500 text-sm mt-1">{errors.obraSocial.numeroAfiliado.message}</span>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-1">
          *Si usted no posee obra social, puede dejar estos campos vacíos.
        </p>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="sm:px-20 mt-4 bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 w-full lg:w-auto cursor-pointer"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
