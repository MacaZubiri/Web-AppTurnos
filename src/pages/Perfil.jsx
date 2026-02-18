import { useState } from "react"; // 🔹 IMPORTANTE
import { MdPhone, MdEmail, MdCreditCard } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import ModalDatosPersonales from "../components/ModalDatosPersonales";


const Perfil = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // 🔹 Estado para abrir/cerrar modal

  if (!user) return <p>No hay usuario logueado</p>;

  
  

  return (
    <>
      <div className="bg-amber-50 w-full py-3 px-4 shadow-md mt-20 flex flex-col justify-center items-center sm:justify-between sm:items-start">
        {/* Datos y botón juntos en un contenedor flex */}
        <div className="mt-2 sm:flex sm:justify-between sm:items-start w-full">
          
          {/* Datos */}
          <div className="flex flex-col leading-10 items-center sm:justify-start sm:items-start">
            <h1 className="font-bold text-lg mb-2">{user.nombreApellido}</h1>

            <div className="sm:hidden w-full h-px bg-gray-300 mb-5"></div>
          
            <div className="mb-5">
              <p className="flex items-center gap-2">
                <MdEmail className="text-blue-600 w-5 h-5" />
                {user.email}
              </p>

              <p className="flex items-center gap-2">
                <MdPhone className="text-blue-600 w-5 h-5" />
                {user.telefono}
              </p>

              <p className="flex items-center gap-2">
                <MdCreditCard className="text-blue-600 w-5 h-5" />
                {user.obraSocial?.nombre} ({user.obraSocial?.numeroAfiliado})
              </p>
            </div>
          </div>

          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen h-px bg-gray-300 my-4 sm:hidden"></div>

          {/* Span “Editar” alineado a la derecha */}
          <div className="flex w-full items-center justify-center sm:justify-end">
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setIsOpen(true)} // 🔹 Abrir modal al hacer click
            >
              Editar datos personales
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 Renderizar modal solo si isOpen es true */}
      {isOpen && (
        <ModalDatosPersonales user={user} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Perfil;
