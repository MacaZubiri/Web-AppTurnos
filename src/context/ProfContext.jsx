import { createContext, useState, useEffect, useContext } from "react";

export const ProfContext = createContext();

export const ProfProvider = ({ children }) => {
  const API_URL_PROF = "https://698da1f4b79d1c928ed5fe3a.mockapi.io/Profesionales";
  const [prof, setProf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Traer profesionales
  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const res = await fetch(API_URL_PROF);
        const data = await res.json();
        setProf(data);
      } catch (err) {
        console.error("Error al cargar profesionales:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfesionales();
  }, []);

  // 🔹 Crear profesional
  const registrarProfesionales = async (profData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL_PROF, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profData, turnos: [] }),
      });
      if (!res.ok) throw new Error("Error al registrar profesional");
      const newProf = await res.json();
      setProf(prev => [...prev, newProf]);
      return newProf;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Modificar profesional
  const modificarProfesional = async (profId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const profActual = prof.find(p => p.id === profId.toString());
      if (!profActual) throw new Error("Profesional no encontrado");

      const res = await fetch(`${API_URL_PROF}/${profId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profActual, ...updatedData }),
      });
      if (!res.ok) throw new Error("Error al modificar profesional");

      const updatedProf = await res.json();
      setProf(prev => prev.map(p => p.id === profId.toString() ? updatedProf : p));
      return updatedProf;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar profesional
  const eliminarProfesional = async (profId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL_PROF}/${profId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar profesional");
      setProf(prev => prev.filter(p => p.id !== profId.toString()));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Agregar/guardar turnos (adaptado para reemplazar todo si es necesario)
const guardarTurno = async (profId, turno, reemplazar = false) => {
  const profActual = prof.find(p => p.id === profId);
  if (!profActual) throw new Error("Profesional no encontrado");

  // Si reemplazar es true, usamos directamente el array que pasamos; si no, agregamos uno nuevo
  const updatedTurnos = reemplazar ? turno : [...profActual.turnos, turno];

  const res = await fetch(`${API_URL_PROF}/${profId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...profActual, turnos: updatedTurnos }),
  });

  if (!res.ok) throw new Error("Error al guardar turno");

  const updatedProf = await res.json();
  setProf(prev => prev.map(p => (p.id === profId ? updatedProf : p)));
  return updatedProf;
};

  return (
    <ProfContext.Provider
      value={{
        prof,
        loading,
        error,
        registrarProfesionales,
        modificarProfesional,
        eliminarProfesional,
        guardarTurno,
      }}
    >
      {children}
    </ProfContext.Provider>
  );
};

export const useProf = () => useContext(ProfContext);