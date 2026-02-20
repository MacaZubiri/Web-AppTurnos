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

  // 🔹 Editar profesional
  const editarProfesional = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL_PROF}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Error al editar profesional");
      const updatedProf = await res.json();
      setProf(prev => prev.map(p => (p.id === id.toString() ? updatedProf : p)));
      return updatedProf;
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Guardar turnos
  const guardarTurno = async (profId, turno, reemplazar = false) => {
    const profActual = prof.find(p => p.id === profId.toString());
    if (!profActual) throw new Error("Profesional no encontrado");

    const updatedTurnos = reemplazar ? turno : [...profActual.turnos, turno];

    const res = await fetch(`${API_URL_PROF}/${profId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...profActual, turnos: updatedTurnos }),
    });

    if (!res.ok) throw new Error("Error al guardar turno");

    const updatedProf = await res.json();
    setProf(prev => prev.map(p => (p.id === profId.toString() ? updatedProf : p)));
    return updatedProf;
  };

  // 🔹 Eliminar profesional
  const eliminarProfesional = async (id) => {
    try {
      await fetch(`${API_URL_PROF}/${id}`, { method: "DELETE" });
      setProf(prev => prev.filter(p => p.id !== id.toString()));
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    }
  };

  return (
    <ProfContext.Provider
      value={{
        prof,
        loading,
        error,
        registrarProfesionales,
        editarProfesional,
        eliminarProfesional,
        guardarTurno,
      }}
    >
      {children}
    </ProfContext.Provider>
  );
};

export const useProf = () => useContext(ProfContext);