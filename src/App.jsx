import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profesionales from "./pages/BuscarProfesional";
import Perfil from "./pages/Perfil";
import PerfilProfesional from "./pages/PerfilProfesional";
import ReservarTurno from "./pages/ReservarTurno";
import MisTurnos from "./pages/MisTurnos";
import { AuthProvider } from './context/AuthContext';
import { ProfProvider } from './context/ProfContext';
import NavBar from './components/Navbar';
import Registro from "./components/Registro";
import PrivateRoute from "./components/PrivateRoute";
import PanelAdmin from "./pages/PanelAdmin";
import CrearEditarProfesional from "./pages/CrearEditarProfesional"; 
import CrearEditarUsuario from "./pages/CrearEditarUsuario";
import Footer from "./components/Footer"
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <ProfProvider>
      <AuthProvider>
        <BrowserRouter>
        <Analytics/>
          <NavBar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={
                  <>
                    <Home />
                    <Footer />
                  </>
                }  />
            <Route path="/buscar-profesional" element={<Profesionales />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil-profesional/:id" element={<PerfilProfesional />} />
            <Route path="/reservar-turno" element={<ReservarTurno />} />
            <Route path="/reservar-turno/:id" element={<ReservarTurno />} />
            <Route path="/mis-turnos" element={<MisTurnos />} />
            <Route path="/registro" element={<Registro />} />

            {/* Rutas privadas */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute role="admin">
                  <PanelAdmin />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profesionales/crear" 
              element={
                <PrivateRoute role="admin">
                  <CrearEditarProfesional />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profesionales/editar/:id" 
              element={
                <PrivateRoute role="admin">
                  <CrearEditarProfesional />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/usuarios/crear" 
              element={
                <PrivateRoute role="admin">
                  <CrearEditarUsuario />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/usuarios/editar/:id" 
              element={
                <PrivateRoute role="admin">
                  <CrearEditarUsuario />
                </PrivateRoute>
              } 
            />
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ProfProvider>
  );
}

export default App;