import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState (null);
    const [usuarios, setUsuarios] = useState ([]);
    const [loading, setLoading] = useState (true);
    
    useEffect (() => {
        const fetchUsuarios = async () => {
            try {
                const res= await fetch ("https://698da1f4b79d1c928ed5fe3a.mockapi.io/Usuarios");
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
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
};

// Hook para usar el context más cómodo
export const useAuth = () => {
  return useContext(AuthContext);
};