import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const API_URL = "https://698da1f4b79d1c928ed5fe3a.mockapi.io/Usuarios";
    const [user, setUser] = useState (null);
    const [usuarios, setUsuarios] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState(null);

    
    
    useEffect (() => {
        const fetchUsuarios = async () => {
            try {
                const res= await fetch (API_URL);
                const data = await res.json ();
                setUsuarios (data);
                setLoading (false);}
                catch (error) {
                    console.error ("Error al cargar usuarios:", error);
                    setLoading (false);
                }
            };
        fetchUsuarios ();
    }, []);

    
    const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      const newUser = await response.json();
      setUser(newUser); // lo dejamos logueado automáticamente

      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


    const login = (usuarioInput, passwordInput) =>{
        const usuarioEncontrado = usuarios.find((u) => u.usuario === usuarioInput && u.password === passwordInput);
        if (usuarioEncontrado) {
            setUser (usuarioEncontrado);
            localStorage.setItem ("user", JSON.stringify(usuarioEncontrado));
            return true;
        }
        return false;
    };



    const logout = () =>{
        setUser (null);
        localStorage.removeItem ("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, registerUser, error }}>
            {children}
        </AuthContext.Provider>
    )
};

// Hook para usar el context más cómodo
export const useAuth = () => {
  return useContext(AuthContext);
};