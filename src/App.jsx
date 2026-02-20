
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profesionales from "./pages/BuscarProfesional";
import Perfil from "./pages/Perfil";
import PerfilProfesional from "./pages/PerfilProfesional";
import ReservarTurno from "./pages/ReservarTurno";
import MisTurnos from "./pages/MisTurnos";
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/Navbar';
import Registro from "./components/Registro";
import {ProfProvider} from './context/ProfContext';



function App() {
 
  return (
    <ProfProvider>
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buscar-profesional" element={<Profesionales />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/reservar-turno" element={<ReservarTurno />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/perfil-profesional/:id" element={<PerfilProfesional />} />
              <Route path="/reservar-turno/:id" element={<ReservarTurno />} />
              <Route path="/mis-turnos" element={<MisTurnos/>} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ProfProvider>
  );
}

export default App;
