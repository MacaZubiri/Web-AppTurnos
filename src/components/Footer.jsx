import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white pt-4 pb-2 w-full ">
    
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-base mb-1">INSTITUCIONAL</h2>
          <p className="hover:underline cursor-pointer text-sm sm:text-lg">Nosotros</p>
          <p className="hover:underline cursor-pointer text-sm sm:text-lg">Especialidades</p>
          <p className="hover:underline cursor-pointer text-sm sm:text-lg">Reservar turno</p>
          <p className="hover:underline cursor-pointer text-sm sm:text-lg">Trabaja con nosotros</p>
        </div>

        
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-base mb-1">HORARIOS DE ATENCIÓN</h2>
          <p className="text-sm sm:text-lg">Lunes a Viernes: 08:00hs a 17:00hs</p>
          <p className="text-sm sm:text-lg">Sábados: 09:00hs a 13:00hs</p>
        </div>

        <div className="flex flex-col gap-2 items-center sm:items-start">
          <h2 className="font-semibold text-base mb-1">CONTACTO</h2>
          <p className="flex justify-center sm:justify-start items-center gap-2 text-sm sm:text-lg"><IoLocationOutline className="text-base lg:text-xl" /> Avenida Libre N°123</p>
          <p className="flex justify-center sm:justify-start items-center gap-2 text-sm sm:text-lg "><FaWhatsapp className="text-base lg:text-xl" /> 22154856965</p>
          <p className="flex justify-center sm:justify-start items-center gap-2 text-sm sm:text-lg"><MdOutlineEmail className="text-base lg:text-xl" /> Vitalix@gmail.com</p>
        </div>
      </div>
    
      <div className="mt-8 text-center text-xs text-gray-300 sm:text-md">
        <p>© 2026 Vitalix - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;