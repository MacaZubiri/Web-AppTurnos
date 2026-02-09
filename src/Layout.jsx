import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal"; 
import { useState } from "react";

const Layout = () => {
   const [isLoginOpen, setIsLoginOpen] = useState(false);

    const [user, setUser] = useState({
    isLogged: true,
    role: "usuario", // "user" o "professional"
  });



  const handleLogin = () => {
    setUser({
      isLogged: true,
      role: "usuario", // hardcodeado por ahora
    });
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser({
      isLogged: false,
      role: null,
    });
  };

  return (
    <>
      <Navbar user={user} onLoginClick={() => setIsLoginOpen(true)} onLogout={handleLogout} />
        
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />}


      <div className="pt-20"> 
        <Outlet /> 
      </div>
    </>
  );
};

export default Layout;