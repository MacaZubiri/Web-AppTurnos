import fotomedico1 from '../assets/imagenes-medicoclinico/beatriz.jpg';
import fotomedico2 from '../assets/imagenes-medicoclinico/magdalena.jpg';
import fotomedico3 from '../assets/imagenes-medicoclinico/franco.jpg';
import fotomedico4 from '../assets/imagenes-odontologos/analia.jpg';
import fotomedico5 from '../assets/imagenes-odontologos/gerardo.jpg';
import fotomedico6 from '../assets/imagenes-odontologos/mariafernanda.jpg';

const profesionales = [
  // ------------------- DENTISTAS -------------------
  {
    id: 1,
    nombre: "Beatriz García",
    especialidad: "Odontología General",
    imagen: fotomedico1,
    sobreMi: "Soy odontóloga general, dedicada a brindar una atención integral y personalizada, enfocada en la prevención, el diagnóstico y el tratamiento de la salud bucal. Mi objetivo es ofrecer soluciones adecuadas a cada paciente, cuidando tanto la funcionalidad como la estética de la sonrisa.Me caracterizo por un trato cercano y empático, priorizando la escucha y la explicación clara de cada procedimiento para generar confianza y tranquilidad. Busco que cada consulta sea una experiencia positiva, acompañando a mis pacientes en el cuidado de su salud bucal y en la adopción de hábitos saludables.",
    diasAtencion: ["Lunes", "Miércoles", "Viernes"],
    horariosAtencion: {
      lunes: ["09:00","10:00","11:00","12:00","13:00","14:00"],
      miercoles: ["09:00","10:00","11:00","12:00","13:00","14:00"],
      viernes: ["09:00","10:00","11:00","12:00","13:00","14:00"]
    },
    obrasSociales: ["OSDE","Galeno","Medifé"],
    formacion: ["UBA - Odontología","Curso de Estética Dental", "Capacitación en Rehabilitación Dental y Prótesis", "Curso de Manejo de Pacientes y Atención Humanizada" ],
    email: "beatriz.garcia@email.com",
    telefono: "+54 11 1234-5678",
  },
  {
    id: 2,
    nombre: "Magdalena López",
    especialidad: "Odontología Pediátrica",
    imagen: fotomedico2,
    sobreMi: "Soy odontóloga especializada en odontología pediátrica, dedicada a brindar atención integral y cercana a los más pequeños. Mi enfoque combina la prevención, el cuidado de la salud bucal y la educación en hábitos saludables, buscando que cada niño tenga una experiencia positiva y libre de ansiedad en el consultorio.Me caracterizo por generar un ambiente cálido y de confianza, adaptando cada procedimiento a las necesidades y emociones de cada paciente. Trabajo junto a las familias para promover sonrisas saludables y hábitos que perduren toda la vida.",
    diasAtencion: ["Martes","Jueves"],
    horariosAtencion: {
      martes: ["09:00","10:00","11:00","12:00"],
      jueves: ["09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["OSDE","Swiss Medical","Medifé"],
    formacion: ["UBA - Odontología","Especialización en Odontología Pediátrica", "Curso de Manejo de Pacientes Pediátricos y Conducta Dental", "Taller de Prevención y Educación en Salud Bucal Infantil"],
    email: "maria.lopez@email.com",
    telefono: "+54 11 2345-6789",
  },

  // ------------------- MEDICOS CLINICOS -------------------
  {
    id: 3,
    nombre: "Franco Pérez",
    especialidad: "Medicina Clínica",
    imagen: fotomedico3,
    sobreMi: "Soy médico clínico dedicado a ofrecer una atención integral y personalizada, enfocada en la prevención, el diagnóstico y el tratamiento de las enfermedades, buscando siempre el bienestar general de mis pacientes y un acompañamiento cercano durante todo el proceso de atención. Me caracterizo por un trato empático y responsable, priorizando la escucha activa, la explicación clara de los procedimientos y la promoción de hábitos saludables para mantener una vida plena y equilibrada.",
    diasAtencion: ["Lunes","Miércoles","Viernes"],
    horariosAtencion: {
      lunes: ["10:00","11:00","12:00","13:00"],
      miercoles: ["10:00","11:00","12:00","13:00"],
      viernes: ["10:00","11:00","12:00","13:00"]
    },
    obrasSociales: ["OSDE","Galeno"],
    formacion: ["UBA - Medicina","Residencia en Medicina Interna", "Curso de Actualización en Diagnóstico y Tratamiento de Enfermedades Crónicas","aller de Atención Integral y Comunicación con Pacientes"],
    email: "juan.perez@email.com",
    telefono: "+54 11 3456-7890",
  },
  {
    id: 4,
    nombre: "Analia Fernández",
    especialidad: "Medicina Clínica",
    imagen: fotomedico4,
    sobreMi: "Soy médica clínica dedicada a brindar atención integral y personalizada, enfocándome en la prevención, el diagnóstico y el tratamiento de enfermedades para cuidar la salud y el bienestar de mis pacientes, ofreciendo un seguimiento cercano durante todo el proceso. Me caracterizo por un trato empático y responsable, priorizando la escucha activa, la explicación clara de cada procedimiento y la promoción de hábitos saludables que favorezcan una vida equilibrada.",
    diasAtencion: ["Martes","Jueves"],
    horariosAtencion: {
      martes: ["09:00","10:00","11:00","12:00"],
      jueves: ["09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["Swiss Medical","Medifé"],
    formacion: ["UBA - Medicina","Curso de Medicina Preventiva", "Taller de Comunicación Efectiva con Pacientes", "Curso de Actualización en Diagnóstico y Tratamiento de Enfermedades Crónicas", "Curso de Manejo Integral del Paciente con Enfermedades Crónicas"],
    email: "lucia.fernandez@email.com",
    telefono: "+54 11 4567-8901",
  },

  // ------------------- TRAUMATOLOGOS -------------------
  {
    id: 5,
    nombre: "Gerardo Gómez",
    especialidad: "Traumatología",
    imagen: fotomedico5,
    sobreMi: "Soy traumatólogo especializado en el diagnóstico, tratamiento y rehabilitación de lesiones musculoesqueléticas, comprometido con la atención integral de mis pacientes y la recuperación de su movilidad y calidad de vida. Me caracterizo por un enfoque preciso y cercano, combinando el conocimiento clínico con la tecnología y técnicas modernas para lograr resultados seguros y efectivos.",
    diasAtencion: ["Lunes","Miércoles"],
    horariosAtencion: {
      lunes: ["08:00","09:00","10:00","11:00","12:00"],
      miercoles: ["08:00","09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["OSDE","Galeno","Swiss Medical"],
    formacion: ["UBA - Medicina","Residencia en Traumatología y Ortopedia", "Especialización en Cirugía Articular", "Curso de Rehabilitación Postquirúrgica", "Curso de Manejo Integral del Paciente con Lesiones Musculoesqueléticas"],
    email: "carlos.gomez@email.com",
    telefono: "+54 11 5678-9012",
  },
  {
    id: 6,
    nombre: "Maria Fernanda Ramírez",
    especialidad: "Traumatología",
    imagen: fotomedico6,
    sobreMi: "Soy traumatóloga pediátrica dedicada al diagnóstico, tratamiento y rehabilitación de lesiones musculoesqueléticas en niños y adolescentes, enfocándome en la atención integral y personalizada para favorecer su crecimiento y movilidad saludable. Me caracterizo por un trato cercano y empático, adaptando cada procedimiento a las necesidades de los pacientes más jóvenes y trabajando junto a las familias para asegurar un seguimiento completo y confiable.",
    diasAtencion: ["Martes","Jueves","Viernes"],
    horariosAtencion: {
      martes: ["09:00","10:00","11:00","12:00"],
      jueves: ["09:00","10:00","11:00","12:00"],
      viernes: ["09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["OSDE","Medifé"],
    formacion: ["UBA - Medicina","Residencia en Traumatología","Especialización en Traumatología Pediátrica", "Curso de Rehabilitación Infantil", "Curso de Manejo Integral del Paciente Pediátrico con Lesiones Musculoesqueléticas"],
    email: "sofia.ramirez@email.com",
    telefono: "+54 11 6789-0123",
    ubicacion: { calle: "Calle Montevideo 123", ciudad: "Buenos Aires", provincia: "CABA" }
  }
];

export default profesionales;
