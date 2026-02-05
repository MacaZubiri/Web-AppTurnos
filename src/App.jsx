
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profesionales from "./pages/BuscarProfesional";
import Perfil from "./pages/Perfil";
import PerfilProfesional from "./pages/PerfilProfesional";
import ReservarTurno from "./pages/ReservarTurno";
import Layout from "./Layout";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buscar-profesional" element={<Profesionales />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/reservar-turno" element={<ReservarTurno />} />
          <Route path="/perfil-profesional/:id" element={<PerfilProfesional />} />
          <Route path="/reservar-turno/:id" element={<ReservarTurno />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
