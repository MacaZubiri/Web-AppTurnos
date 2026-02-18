import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwalError, SwalSuccess } from "../utils/swal";
import { IoEye, IoEyeOff } from "react-icons/io5";

// Esquema de validación
const schemaUsuario = z.object({
  nombreApellido: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  usuario: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  telefono: z.string().min(8, "Teléfono inválido").optional(),
  email: z.string().email("Email inválido"),
  obraSocial: z.object({
    nombre: z.string().min(2, "Debe ingresar el nombre de la obra social").optional().or(z.literal("")),
    numeroAfiliado: z.string().min(3, "Número de afiliado inválido").optional().or(z.literal("")),
  }),
});

const EditProfileModal = ({ user, onClose }) => {
  const { updateUser, usuarios } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(user.password || ""); // 🔹 contraseña por defecto

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(schemaUsuario),
    defaultValues: {
      nombreApellido: user.nombreApellido || "",
      usuario: user.usuario || "",
      password: password,
      email: user.email || "",
      telefono: user.telefono || "",
      obraSocial: {
        nombre: user.obraSocial?.nombre || "",
        numeroAfiliado: user.obraSocial?.numeroAfiliado || "",
      },
    },
  });

  const onSubmit = async (data) => {
    // Si el password no fue modificado, usar el valor del estado local
    if (!data.password) data.password = password;

    // Validación de duplicados (excluyendo al usuario actual)
    if (usuarios?.find((u) => u.usuario === data.usuario && u.id !== user.id)) {
      return SwalError.fire({
        icon: "error",
        title: "Error",
        text: "El nombre de usuario ya existe",
      });
    }
    if (usuarios?.find((u) => u.email === data.email && u.id !== user.id)) {
      return SwalError.fire({
        icon: "error",
        title: "Error",
        text: "El email ingresado ya se encuentra registrado",
      });
    }

    try {
      await updateUser({ ...user, ...data });
      await SwalSuccess.fire({
        icon: "success",
        title: "¡Perfil actualizado!",
        text: "Tus cambios se guardaron correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      onClose();
    } catch (error) {
      alert("Hubo un error al actualizar el perfil");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">Editar Perfil</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Nombre y Apellido */}
          <div className="flex flex-col">
            <label htmlFor="nombreApellido" className="text-sm font-light mb-1">
              Nombre y Apellido
            </label>
            <input
              id="nombreApellido"
              type="text"
              placeholder="Ingrese su nombre y apellido"
              {...register("nombreApellido")}
              className="border border-gray-500 p-2 rounded"
            />
            {errors.nombreApellido && (
              <span className="text-red-500 text-sm">{errors.nombreApellido.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-light mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingrese su email"
              {...register("email")}
              className="border border-gray-500 p-2 rounded"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Usuario */}
          <div className="flex flex-col">
            <label htmlFor="usuario" className="text-sm font-light mb-1">
              Nombre de usuario
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Ingrese su usuario"
              {...register("usuario")}
              className="border border-gray-500 p-2 rounded"
            />
            {errors.usuario && (
              <span className="text-red-500 text-sm">{errors.usuario.message}</span>
            )}
          </div>

          {/* Contraseña con ojito */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-light mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValue("password", e.target.value); // actualizar RHF
              }}
              className="border border-gray-500 p-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Obra Social */}
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex-1 flex flex-col">
              <label htmlFor="obraSocialNombre" className="text-sm font-light mb-1">
                Obra Social
              </label>
              <input
                id="obraSocialNombre"
                type="text"
                placeholder="Ingrese obra social"
                {...register("obraSocial.nombre")}
                className="border border-gray-500 p-2 rounded"
              />
              {errors.obraSocial?.nombre && (
                <span className="text-red-500 text-sm">{errors.obraSocial.nombre.message}</span>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <label htmlFor="obraSocialNumero" className="text-sm font-light mb-1">
                Número de Afiliado
              </label>
              <input
                id="obraSocialNumero"
                type="text"
                placeholder="Ingrese número de afiliado"
                {...register("obraSocial.numeroAfiliado")}
                className="border border-gray-500 p-2 rounded"
              />
              {errors.obraSocial?.numeroAfiliado && (
                <span className="text-red-500 text-sm">{errors.obraSocial.numeroAfiliado.message}</span>
              )}
            </div>
          </div>

          {/* Botones */}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
