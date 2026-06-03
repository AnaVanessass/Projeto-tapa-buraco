import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../security/AuthContext';
import { ViewMode } from '../../types/pothole.types';
import './Header.css';
import { usePotholes } from '../../hooks/usePotholes';
import { useState } from 'react';

function Header({ view, setView, listCount = 0 }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLogout, setShowLogout] = useState(false);
  
  const isMapPage = location.pathname === '/mapa';
  const currentView = searchParams.get('view') || 'map';
  const avatarLetter = user?.username ? String(user.username).charAt(0).toUpperCase() : 'A';

  const { data: potholes = [] } = usePotholes();

  return (
    <header className="app-navbar">
      
      <div className="navbar-itens">
        <Link to="/" className="logo-icon">P</Link>
        <span className="txt-brand-name">Palmas sem Buracos</span>
      </div>

      {isMapPage && (
        <div className="tab-switcher-container">
          <button 
            type="button"
            onClick={() => setSearchParams({ view: 'map' })}
            className={currentView === 'map' ? 'tab-button-active' : 'tab-button-inactive'}
          >
            Análise em Mapa
          </button>
          <button 
            type="button"
            onClick={() => setSearchParams({ view: 'list' })}
            className={currentView === 'list' ? 'tab-button-active' : 'tab-button-inactive'}
          >
            Lista Urbana ({potholes.length}) 
          </button>
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
