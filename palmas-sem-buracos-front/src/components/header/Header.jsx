import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../security/AuthContext';
import './Header.css';
import { useTotalsHeader } from '../../hooks/usePotholes';
import { useState } from 'react';

function Header({ view, setView, listCount = 0 }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  
  const isMapPage = location.pathname === '/mapa';
  const isListPage = location.pathname === '/listagem';
  const avatarLetter = user?.username ? String(user.username).charAt(0).toUpperCase() : 'A';

  const { data: totals = [] } = useTotalsHeader();
  const denunciasUsuario = totals.totalUsuario !== 0 ? totals.totalUsuario : 0;
  const totalHeader = totals.total;

  return (
    <header className="app-navbar">
      
      <div className="navbar-itens">
        <Link to="/" className="logo-icon">P</Link>
        <span className="txt-brand-name">Palmas sem Buracos</span>
      </div>

      {isMapPage && (
        <div className="tab-switcher-container">
          <Link
            to="/mapa"
            className="tab-button-active"
          >
            Mapa ({totalHeader})
          </Link>
          <Link 
            to="/listagem"
            className="tab-button-inactive"
          >
            Minhas Denúncias ({denunciasUsuario}) 
          </Link>
        </div>
      )}

      {isListPage && (
        <div className="tab-switcher-container">
          <Link
            to="/mapa"
            className="tab-button-inactive"
          >
            Mapa ({totalHeader})
          </Link>
          <Link 
            to="/listagem"
            className="tab-button-active"
          >
            Minhas Denúncias ({denunciasUsuario}) 
          </Link>
        </div>
      )}

      <div className="navbar-itens">
        {user ? (
          <div 
            className="admin-user-badge"
            onClick={() => setShowLogout(s => !s)}
            onBlur={() => setShowLogout(false)}
            tabIndex={0}
          >
            <div className="admin-avatar">{avatarLetter}</div>
            <span className="admin-username">
              {user.username}
            </span>
            
            <button 
              type="button" 
              onClick={logout} 
              className="btn-logout-overlay"
              style={{ display: showLogout ? 'block' : undefined }}
            >
              Sair da Conta
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button type="button" className="btn-secondary-sm">
              Entrar
            </button>
          </Link>
        )}
      </div>

    </header>
  );
}

export default Header;
