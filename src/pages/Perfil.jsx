import imagenPerfil from '../assets/imagen-perfil.jpg';
import { MdPhone, MdEmail, MdCreditCard } from "react-icons/md";

const Perfil = () => {
  return (
    <>
    <div className="bg-amber-50 pt-4 pb-16 ml-24 mr-24  rounded-sm shadow-md mt-12">
  {/* Contenedor principal: imagen + datos + span */}
  <div className="flex gap-8">

    {/* Imagen */}
    <img
      src={imagenPerfil}
      alt="Imagen de perfil"
      className="w-40 h-40 rounded-full object-cover mt-9 ml-9"
    />

    {/* Datos y botón juntos en un contenedor flex */}
    <div className="flex flex-1 justify-between mt-9">
      
      {/* Datos */}
      <div className="flex flex-col justify-start leading-9">
        <h1 className="font-bold text-lg mb-2">Maria Fernandez</h1>

        <p className="flex items-center gap-2">
          <MdEmail className="text-blue-600 w-5 h-5" />
          MariaFer@gmail.com
        </p>

        <p className="flex items-center gap-2">
          <MdPhone className="text-blue-600 w-5 h-5" />
          222-222-222
        </p>

        <p className="flex items-center gap-2">
          <MdCreditCard className="text-blue-600 w-5 h-5" />
          IOMA (B25252525/1)
        </p>
      </div>

      {/* Span “Editar” alineado a la derecha */}
      <div className="flex items-start">
        <span className="text-blue-600 font-semibold cursor-pointer hover:underline mr-9">
          Editar datos personales
        </span>
      </div>
    </div>
  </div>
</div>

</>
  );
};

export default Perfil;
