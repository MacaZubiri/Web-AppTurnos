import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = "https://698da1f4b79d1c928ed5fe3a.mockapi.io/Usuarios";
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Cargar todos los usuarios desde MockAPI
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setUsuarios(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // 🔹 Recuperar usuario logueado de LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Registrar usuario (role por defecto = "usuario")
  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    const userWithRole = { ...userData, role: "usuario" };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userWithRole),
      });

      if (!response.ok) throw new Error("Error al registrar usuario");

      const newUser = await response.json();
      setUser(newUser); // Loguear automáticamente
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login
  const login = (usuarioInput, passwordInput) => {
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuarioInput && u.password === passwordInput
    );
    if (usuarioEncontrado) {
      setUser(usuarioEncontrado);
      localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
      return true;
    }
    return false;
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔹 Actualizar usuario logueado
  const updateUser = async (updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user,usuarios, login, logout, loading, registerUser, error, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el context de forma cómoda
export const useAuth = () => useContext(AuthContext);