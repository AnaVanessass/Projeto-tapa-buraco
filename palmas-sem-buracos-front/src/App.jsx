import MapPage from './components/mapPage/MapPage';
import Login from './components/login/login';
import Home from './components/home/Home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthCallback } from './components/auth/AuthCallback';
import CompletarPerfil from './components/profile/CompleteProfile';
import AdminPanel from './components/adminPage/AdminPanel';
import { ProtectedAdminRoute } from './security/ProtectedAdminRoute';
import { ProtectedRoute } from './security/ProtectedRoute';
import { RootLayout } from './layout/RootLayout';
import ListPage from './components/listPage/ListPage';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/completar-perfil" element={<CompletarPerfil />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/listagem" element={<ListPage />} />
        </Route>
        
        <Route element={<ProtectedAdminRoute/>}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;