import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = "https://698da1f4b79d1c928ed5fe3a.mockapi.io/Usuarios";
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   
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

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
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

    setUser(newUser); 
    setUsuarios(prev => [...prev, newUser]); 

    return newUser;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

 
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

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  
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

  
  const eliminarUsuario = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const editarUsuario = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Error al editar usuario");
    const updatedUser = await res.json();
    setUsuarios((prev) => prev.map(u => (u.id === id ? updatedUser : u)));
  } catch (err) {
    console.error(err);
    setError(err.message);
  }
};
const crearUsuarioAdmin = async (userData) => {
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
    setUsuarios(prev => [...prev, newUser]); 
    return newUser;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthContext.Provider
      value={{ user,usuarios, login, logout, loading, registerUser, error,crearUsuarioAdmin, updateUser, eliminarUsuario, editarUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);