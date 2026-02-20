import { useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwalSuccess } from "../utils/swal";
import { useEffect } from "react";

const schemaUsuario = z.object({
  nombreApellido: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  usuario: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  telefono: z.string().min(8, "Teléfono inválido").optional(),
  email: z.string().email("Email inválido"),
  obraSocial: z.object({
    nombre: z.string().min(2, "Debe ingresar el nombre de la obra social").optional().or(z.literal("")),
    numeroAfiliado: z.string().min(3, "Número de afiliado inválido").optional().or(z.literal("")),
  }),
});

const UserModal = ({ isOpen, onClose, user, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schemaUsuario),
    defaultValues: user || {}
  });

  // Cada vez que cambia el usuario seleccionado, reseteamos el form
  useEffect(() => {
    reset(user || {});
  }, [user, reset]);

  if (!isOpen) return null;

  const submitHandler = async (data) => {
    await onSave({ ...user, ...data }); // conservamos el id y lo que no se edita
    onClose();
   SwalSuccess.fire({
        icon: "success",
        title: "¡Usuario actualizado!",
        text: "Los cambios se guardaron correctamente.",
        timer: 3000,
        showConfirmButton: false,
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Editar usuario</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-2">
             <label htmlFor="NombreApellido" className="text-sm font-light mb-1">
                Nombre y Apellido
              </label>
            <input
              type="text"
              placeholder="Nombre completo"
              {...register("nombreApellido")}
              className="border w-full p-2 rounded  border-gray-500"
            />
            {errors.nombreApellido && <p className="text-red-500 text-sm">{errors.nombreApellido.message}</p>}
          </div>

          <div className="mb-2">
             <label htmlFor="usuario" className="text-sm font-light mb-1">
                Nombre de usuario
              </label>
            <input
              type="text"
              placeholder="Usuario"
              {...register("usuario")}
              className="border w-full p-2 rounded  border-gray-500"
            />
            {errors.usuario && <p className="text-red-500 text-sm">{errors.usuario.message}</p>}
          </div>

          <div className="mb-2">
             <label htmlFor="email" className="text-sm font-light mb-1">
                Email
              </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border w-full p-2 rounded  border-gray-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
             <label htmlFor="role" className="text-sm font-light mb-1">
                Rol
              </label>
            <input
              type="text"
              placeholder="Rol"
              {...register("role")}
              className="border w-full p-2 rounded  border-gray-500"
            />
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
                className="border border-gray-500 p-2 rounded "
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

          <div className="flex justify-end gap-2 mt-10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;