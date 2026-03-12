import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as z from "zod";
import { SwalSuccess, SwalError } from "../utils/swal";
import { GrStatusGood } from "react-icons/gr";


const schemaUsuario = z.object({
  nombreApellido: z.string().min(2, "El nombre y apellido es obligatorio"),
  usuario: z.string().min(2, "El usuario es obligatorio"),
  email: z.email("Email inválido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  role: z.enum(["usuario", "admin"]).optional(),
  obraSocial: z.object({
    nombre: z.string().min(1, "Debe completar el nombre de obra social").optional(),
    numeroAfiliado: z.string().min(1, "Debe completar el número de afiliado").optional(),
  }),
});

const CrearEditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuarios, crearUsuarioAdmin, editarUsuario } = useAuth();

  const usuarioEncontrado = id ? usuarios.find(u => u.id.toString() === id.toString()) : null;

  const defaultValues = usuarioEncontrado
    ? {
        ...usuarioEncontrado,
        obraSocial: usuarioEncontrado.obraSocial || { nombre: "", numeroAfiliado: "" },
      }
    : {
        nombreApellido: "",
        usuario: "",
        email: "",
        password: "",
        role: "usuario",
        sobreMi: "",
        obraSocial: { nombre: "", numeroAfiliado: "" },
      };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaUsuario),
    defaultValues,
  });

  useEffect(() => {
    if (usuarioEncontrado) {
      reset(defaultValues);
    }
  }, [usuarioEncontrado]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await editarUsuario(id, { ...usuarioEncontrado, ...data });
        SwalSuccess.fire({
          icon: "success",
          title: "Usuario modificado correctamente",
          timer: 2500,
          showConfirmButton: false,
        });
      } else {
        await crearUsuarioAdmin(data);
        SwalSuccess.fire({
          icon: "success",
          title: "Usuario creado correctamente",
          timer: 2500,
          showConfirmButton: false,
        });
        reset(defaultValues); 
      }
      navigate("/admin"); 
    } catch (err) {
      SwalError.fire({
        title: "Error al crear/editar usuario",
        icon: "error",
        timer: 2500,
        showCancelButton: false,
      });
    }
  };

  return (
    <div className="bg-white max-w-4/6 mx-auto pt-24 px-8 pb-10 mt-28 rounded-md">
      <h1 className="text-2xl font-bold mb-6">{id ? "Editar Usuario" : "Crear Usuario"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        
        <div>
          <label>Nombre y Apellido</label>
          <input {...register("nombreApellido")} className="w-full border p-2 rounded"/>
          {errors.nombreApellido && <p className="text-red-500">{errors.nombreApellido.message}</p>}
        </div>

        
        <div>
          <label>Usuario</label>
          <input {...register("usuario")} className="w-full border p-2 rounded"/>
          {errors.usuario && <p className="text-red-500">{errors.usuario.message}</p>}
        </div>

        
        <div>
          <label>Email</label>
          <input {...register("email")} className="w-full border p-2 rounded"/>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        
        <div>
          <label>Contraseña</label>
          <input type="password" {...register("password")} className="w-full border p-2 rounded"/>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        
        <div>
          <label>Rol</label>
          <select {...register("role")} className="w-full border p-2 rounded">
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Obra Social</label>
            <input {...register("obraSocial.nombre")} className="w-full border p-2 rounded"/>
          </div>
          <div>
            <label>Número de Afiliado</label>
            <input {...register("obraSocial.numeroAfiliado")} className="w-full border p-2 rounded"/>
          </div>
        </div>

        <div className="flex gap-8 w-full justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4 cursor-pointer shadow-sm">
          {id ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
        <button type="button"  onClick={() => navigate("/admin")} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded mt-4 cursor-pointer shadow-sm">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearEditarUsuario;