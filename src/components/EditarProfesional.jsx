// components/EditarProfesionalModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  especialidad: z.string().min(2, "Especialidad requerida"),
  imagen: z.string().url("Debe ser una URL válida"),
  sobreMi: z.string().min(2, "Debe completar sobre mí"),
  diasAtencion: z.array(z.string()).nonempty("Debe seleccionar al menos un día"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(6, "Teléfono inválido"),
  obrasSociales: z.array(z.string()).optional(),
  formacion: z.array(z.string()).optional(),
  horariosAtencion: z
    .object({
      lunes: z.array(z.string()).optional(),
      martes: z.array(z.string()).optional(),
      miercoles: z.array(z.string()).optional(),
      jueves: z.array(z.string()).optional(),
      viernes: z.array(z.string()).optional(),
    })
    .optional(),
});

const EditarProfesionalModal = ({ profesional, isOpen, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: profesional,
  });

  useEffect(() => {
    if (profesional) {
      reset(profesional);
    }
  }, [profesional, reset]);

  if (!isOpen) return null;

  const submitHandler = (data) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Editar Profesional</h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label>Nombre</label>
            <input {...register("nombre")} className="border p-2 w-full" />
            {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
          </div>

          <div>
            <label>Especialidad</label>
            <input {...register("especialidad")} className="border p-2 w-full" />
            {errors.especialidad && <p className="text-red-500">{errors.especialidad.message}</p>}
          </div>

          <div>
            <label>Imagen (URL)</label>
            <input {...register("imagen")} className="border p-2 w-full" />
            {errors.imagen && <p className="text-red-500">{errors.imagen.message}</p>}
          </div>

          <div>
            <label>Sobre mí</label>
            <textarea {...register("sobreMi")} className="border p-2 w-full" rows={4} />
            {errors.sobreMi && <p className="text-red-500">{errors.sobreMi.message}</p>}
          </div>

          <div>
            <label>Días de atención (coma separado)</label>
            <input
              {...register("diasAtencion", {
                setValueAs: (v) => v.split(",").map(s => s.trim())
              })}
              className="border p-2 w-full"
            />
            {errors.diasAtencion && <p className="text-red-500">{errors.diasAtencion.message}</p>}
          </div>

          <div>
            <label>Email</label>
            <input {...register("email")} className="border p-2 w-full" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label>Teléfono</label>
            <input {...register("telefono")} className="border p-2 w-full" />
            {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
          </div>

          <div>
            <label>Obras sociales (coma separado)</label>
            <input
              {...register("obrasSociales", {
                setValueAs: (v) => v ? v.split(",").map(s => s.trim()) : [],
              })}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Formación (coma separado)</label>
            <input
              {...register("formacion", {
                setValueAs: (v) => v ? v.split(",").map(s => s.trim()) : [],
              })}
              className="border p-2 w-full"
            />
          </div>

          {/* Para horarios se podría hacer inputs separados por día */}
          <div className="grid grid-cols-2 gap-2">
            {["lunes","martes","miercoles","jueves","viernes"].map((dia) => (
              <div key={dia}>
                <label>{dia}</label>
                <input
                  {...register(`horariosAtencion.${dia}`, {
                    setValueAs: (v) => v ? v.split(",").map(s=>s.trim()) : [],
                  })}
                  className="border p-2 w-full"
                  placeholder="09:00,10:00,11:00"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProfesionalModal;