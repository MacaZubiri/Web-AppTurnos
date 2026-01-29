import Navbar from "./components/Navbar";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profesionales from "./pages/BuscarProfesional";
import Perfil from "./pages/Perfil";
import PerfilProfesional from "./pages/PerfilProfesional";
import ReservarTurno from "./pages/ReservarTurno";


function App() {

  return (
  <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar-profesional" element={<Profesionales />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil-profesional" element={<PerfilProfesional />} />
        <Route path="/reservar-turno" element={<ReservarTurno />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
