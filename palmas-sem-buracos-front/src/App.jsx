import MapRender from './components/mapRender/MapRender';
import Login from './components/login/login';
import Home from './components/home/home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthCallback } from './components/auth/AuthCallback';
import CompletarPerfil from './components/profile/CompleteProfile';
import AdminPanel from './components/adminPage/AdminPanel';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mapa" element={<MapRender />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/completar-perfil" element={<CompletarPerfil />} />
      <Route path="/dashboard" element={<MapRender />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;