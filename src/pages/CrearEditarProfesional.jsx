import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfContext } from "../context/ProfContext";
import * as z from "zod";
import { SwalSuccess, SwalError } from "../utils/swal";


const schemaProfesional = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  especialidad: z.string().min(2, "La especialidad es obligatoria"),
  email: z.email("Email inválido"),
  telefono: z.string().optional(),
  sobreMi:z.string().min(20, "Debe escribir algo sobre el profesional"),
  imagen:z.url("Debe ser una URL válida").or(z.literal("")).optional(),
  formacion: z.array(z.string().min(1, "Debe completar la formación")),
  obrasSociales: z.array(z.string().min(1, "Debe completar obras sociales")),
  duracionTurno: z.number().min(5, "Duración mínima 5 min"),
  rangoMeses: z.number().min(1).max(2, "Debe elegir una cantidad de meses"),
  disponibilidad: z.array(
    z.object({
      diaSemana: z.number().min(1).max(5),
      bloques: z.array(
        z.object({
          inicio: z.string(),
          fin: z.string()
        })
      )
    })
  )
});


const diasSemanaOptions = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
];

const CrearEditarProfesional = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { prof, registrarProfesionales, editarProfesional } = useContext(ProfContext);

  const profEncontrado = id ? prof.find(p => p.id.toString() === id.toString()) : null;

  const defaultValues = profEncontrado
    ? {
        ...profEncontrado,
        disponibilidad: profEncontrado.disponibilidad?.map(d => ({
          diaSemana: Number(d.diaSemana),
          bloques: d.bloques?.map(b => ({
            inicio: b.inicio || "09:00",
            fin: b.fin || "14:00",
          })) || [{ inicio: "09:00", fin: "14:00" }],
        })) || [],
      }
    : {
        nombre: "",
        especialidad: "",
        imagen: "",
        email: "",
        telefono: "",
        formacion: [""],
        obrasSociales: [""],
        duracionTurno: 30,
        rangoMeses: 1,
        disponibilidad: [],
      };

  const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schemaProfesional),
    defaultValues
  });

  const { fields: diasFields, append: appendDia, remove: removeDia } = useFieldArray({
    control,
    name: "disponibilidad"
  });

  useEffect(() => {
    if (profEncontrado) {
      reset(defaultValues);
    }
  }, [profEncontrado]);

  const formacion = watch("formacion");
  const obrasSociales = watch("obrasSociales");

  const onSubmit = async (data) => {
   
    try {
      if (id) {
        await editarProfesional(id, { ...profEncontrado, ...data });
        SwalSuccess.fire({
        icon: "success",
        title: "Profesional modificado correctamente",
        timer: 3000,
        showConfirmButton: false,
      });
      } else {
        await registrarProfesionales({ ...data, turnos: [] });
        SwalSuccess.fire({
        icon: "success",
        title: "Profesional registrado correctamente",
        timer: 3000,
        showConfirmButton: false,
      });
      }
      navigate("/admin");
    } catch (err) {
      SwalError.fire({
            title: "Error al modificar/crear profesional",
            icon: "warning",
            showCancelButton: false,
            timer: 3000,
          });
    }
  };

  return (
    <div className="bg-white max-w-4/6 mx-auto pt-24 px-16 h-auto pb-10">
      <h1 className="text-2xl font-bold mb-6">{id ? "Editar Profesional" : "Crear Profesional"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        
        <div>
          <label>Nombre y Apellido</label>
          <input {...register("nombre")} className="w-full border p-2 rounded"/>
          {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
        </div>

        
        <div>
          <label>Especialidad</label>
          <input {...register("especialidad")} className="w-full border p-2 rounded"/>
          {errors.especialidad && <p className="text-red-500">{errors.especialidad.message}</p>}
        </div>

         
        <div>
          <label>Sobre mí...</label>
          <textarea {...register("sobreMi")} className="w-full border p-2 rounded " rows={8} />
          {errors.sobreMi && <p className="text-red-500">{errors.sobreMi.message}</p>}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Email</label>
            <input {...register("email")} className="w-full border p-2 rounded"/>
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label>Teléfono</label>
            <input {...register("telefono")} className="w-full border p-2 rounded"/>
          </div>
        </div>
         
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Imagen (URL)</label>
            <input {...register("imagen")} className="w-full border p-2 rounded" />
            {errors.imagen && <p className="text-red-500">{errors.imagen.message}</p>}
          </div>
        </div>

        
        <div>
          <label>Formación</label>
          {formacion.map((f, i) => (
            <div key={i} className="flex gap-2 my-1">
              <input {...register(`formacion.${i}`)} className="flex-1 border p-2 rounded"/>
              <button
              className= "text-red-600 cursor-pointer hover:underline "
               type="button" onClick={() => {
                const copy = [...formacion]; copy.splice(i,1); setValue("formacion", copy);
              }}>Eliminar</button>
            </div>
          ))}
          <button
          className="bg-green-600 px-2 py-1 rounded-sm text-white cursor-pointer shadow-sm"
           type="button" onClick={() => setValue("formacion", [...formacion, ""])}>Agregar formación</button>
        </div>

        
        <div>
          <label>Obras Sociales</label>
          {obrasSociales.map((o,i) => (
            <div key={i} className="flex gap-2 my-1">
              <input {...register(`obrasSociales.${i}`)} className="flex-1 border p-2 rounded"/>
              <button className= "text-red-600 cursor-pointer hover:underline " type="button" onClick={() => { const copy=[...obrasSociales]; copy.splice(i,1); setValue("obrasSociales", copy); }}>Eliminar</button>
            </div>
          ))}
          <button className="bg-green-600 px-2 py-1 rounded-sm text-white cursor-pointer shadow-sm" type="button" onClick={() => setValue("obrasSociales", [...obrasSociales, ""])}>Agregar obra social</button>
        </div>

        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Duración de turno (minutos)</label>
            <input
              type="number"
              {...register("duracionTurno", { setValueAs: v => Number(v) })}
              className="w-full border p-2 rounded"
            />
            {errors.duracionTurno && <p className="text-red-500">{errors.duracionTurno.message}</p>}
          </div>
          <div>
            <label>Rango de meses a mostrar</label>
            <select
              {...register("rangoMeses", { setValueAs: v => Number(v) })}
              className="w-full border p-2 rounded"
            >
              <option value={1}>1 mes</option>
              <option value={2}>2 meses</option>
            </select>
            {errors.rangoMeses && <p className="text-red-500">{errors.rangoMeses.message}</p>}
          </div>
        </div>

        
        <div>
          <label className="font-semibold">Disponibilidad</label>
          {diasFields.map((dia, i) => (
            <div key={dia.id} className="border p-2 rounded my-2">
              <div className="flex items-center gap-2 mb-2">
                <select {...register(`disponibilidad.${i}.diaSemana`, { setValueAs: v => Number(v) })} className="border p-1 rounded">
                  {diasSemanaOptions.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
                <button type="button" onClick={() => removeDia(i)} className= "text-red-600 hover:underline cursor-pointer">Eliminar día</button>
              </div>
              <FieldArrayBloques control={control} indexDia={i} register={register} />
            </div>
          ))}
          <button type="button" onClick={() => appendDia({diaSemana:1, bloques:[{inicio:"09:00", fin:"14:00"}]})} className="bg-green-600 text-white py-2 px-2 rounded cursor-pointer ml-2">
            Agregar día de atención
          </button>
        </div>

        <div className="flex gap-8 w-full justify-end">

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4 cursor-pointer shadow-sm">
            Guardar profesional
          </button>
          <button type="button"  onClick={() => navigate("/admin")} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded mt-4 cursor-pointer shadow-sm">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

const FieldArrayBloques = ({ control, indexDia, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `disponibilidad.${indexDia}.bloques`
  });

  return (
    <div className="mt-2">
      {fields.map((bloque, j) => (
        <div key={bloque.id} className="flex gap-2 my-1">
          <input type="time" {...register(`disponibilidad.${indexDia}.bloques.${j}.inicio`, { setValueAs: v => String(v) })} className="border p-1 rounded"/>
          <input type="time" {...register(`disponibilidad.${indexDia}.bloques.${j}.fin`, { setValueAs: v => String(v) })} className="border p-1 rounded"/>
          <button type="button" onClick={() => remove(j)} className="bg-red-600 text-white px-2 rounded cursor-pointer">Eliminar bloque</button>
        </div>
      ))}
    </div>
  );
};

export default CrearEditarProfesional;