const profesionales = [
  // ------------------- DENTISTAS -------------------
  {
    id: 1,
    nombre: "Ana García",
    especialidad: "Odontología General",
    sobreMi: "Odontóloga dedicada a tratamientos integrales para todas las edades.",
    diasAtencion: ["Lunes", "Miércoles", "Viernes"],
    horariosAtencion: {
      lunes: ["09:00","10:00","11:00","12:00","13:00","14:00"],
      miercoles: ["09:00","10:00","11:00","12:00","13:00","14:00"],
      viernes: ["09:00","10:00","11:00","12:00","13:00","14:00"]
    },
    obrasSociales: ["OSDE","Galeno","Medifé"],
    formacion: ["UBA - Odontología","Curso de Estética Dental"],
    email: "ana.garcia@email.com",
    telefono: "+54 11 1234-5678",
    ubicacion: { calle: "Av. Belgrano 1234", ciudad: "Buenos Aires", provincia: "CABA" }
  },
  {
    id: 2,
    nombre: "MaríaLópez",
    especialidad: "Odontología Pediátrica",
    sobreMi: "Especializada en ortodoncia infantil, me encanta trabajar con niños y familias.",
    diasAtencion: ["Martes","Jueves"],
    horariosAtencion: {
      martes: ["09:00","10:00","11:00","12:00"],
      jueves: ["09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["OSDE","Swiss Medical","Medifé"],
    formacion: ["UBA - Odontología","Especialización en Odontología Pediátrica"],
    email: "maria.lopez@email.com",
    telefono: "+54 11 2345-6789",
    ubicacion: { calle: "Calle Falsa 456", ciudad: "Buenos Aires", provincia: "CABA" }
  },

  // ------------------- MEDICOS CLINICOS -------------------
  {
    id: 3,
    nombre: "Juan Pérez",
    especialidad: "Medicina Clínica",
    sobreMi: "Médico clínico con experiencia en diagnóstico y seguimiento de enfermedades crónicas.",
    diasAtencion: ["Lunes","Miércoles","Viernes"],
    horariosAtencion: {
      lunes: ["10:00","11:00","12:00","13:00"],
      miercoles: ["10:00","11:00","12:00","13:00"],
      viernes: ["10:00","11:00","12:00","13:00"]
    },
    obrasSociales: ["OSDE","Galeno"],
    formacion: ["UBA - Medicina","Residencia en Medicina Interna"],
    email: "juan.perez@email.com",
    telefono: "+54 11 3456-7890",
    ubicacion: { calle: "Av. Corrientes 789", ciudad: "Buenos Aires", provincia: "CABA" }
  },
  {
    id: 4,
    nombre: "Lucía Fernández",
    especialidad: "Medicina Clínica",
    sobreMi: "Prevención y cuidado integral del adulto, enfocada en salud preventiva.",
    diasAtencion: ["Martes","Jueves"],
    horariosAtencion: {
      martes: ["09:00","10:00","11:00","12:00"],
      jueves: ["09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["Swiss Medical","Medifé"],
    formacion: ["UBA - Medicina","Curso de Medicina Preventiva"],
    email: "lucia.fernandez@email.com",
    telefono: "+54 11 4567-8901",
    ubicacion: { calle: "Calle Libertad 321", ciudad: "Buenos Aires", provincia: "CABA" }
  },

  // ------------------- TRAUMATOLOGOS -------------------
  {
    id: 5,
    nombre: "Carlos Gómez",
    especialidad: "Traumatología",
    sobreMi: "Traumatólogo con experiencia en lesiones deportivas y ortopedia general.",
    diasAtencion: ["Lunes","Miércoles"],
    horariosAtencion: {
      lunes: ["08:00","09:00","10:00","11:00","12:00"],
      miercoles: ["08:00","09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["OSDE","Galeno","Swiss Medical"],
    formacion: ["UBA - Medicina","Residencia en Traumatología y Ortopedia"],
    email: "carlos.gomez@email.com",
    telefono: "+54 11 5678-9012",
    ubicacion: { calle: "Av. Santa Fe 456", ciudad: "Buenos Aires", provincia: "CABA" }
  },
  {
    id: 6,
    nombre: "Sofía Ramírez",
    especialidad: "Traumatología",
    sobreMi: "Especializada en lesiones de extremidades y rehabilitación postquirúrgica.",
    diasAtencion: ["Martes","Jueves","Viernes"],
    horariosAtencion: {
      martes: ["09:00","10:00","11:00","12:00"],
      jueves: ["09:00","10:00","11:00","12:00"],
      viernes: ["09:00","10:00","11:00","12:00"]
    },
    obrasSociales: ["OSDE","Medifé"],
    formacion: ["UBA - Medicina","Residencia en Traumatología"],
    email: "sofia.ramirez@email.com",
    telefono: "+54 11 6789-0123",
    ubicacion: { calle: "Calle Montevideo 123", ciudad: "Buenos Aires", provincia: "CABA" }
  }
];

export default profesionales;
