import { Link, useLocation } from 'react-router-dom';
import { ViewMode } from '../../types/pothole.types';
import './Header.css';

function Header({ view, setView, listCount = 0 }) {
  const location = useLocation();
  
  // Verifica se a rota atual é exatamente a do mapa público
  const isMapPage = location.pathname === '/mapa';

  // Simulação de verificação de autenticação (mude conforme o seu contexto de rotas ou contexto global)
  const isLoggedIn = !!localStorage.getItem('token_pothole_oauth');

  return (
    <header className="app-navbar">
      
      {/* LADO ESQUERDO: IDENTIDADE VISUAL */}
      <div className="navbar-itens">
        <Link to="/" className="logo-icon">P</Link>
        <span className="txt-brand-name">Palmas sem Buracos</span>
      </div>

      {/* CENTRO: ALTERNADOR DE ABAS (APARECE APENAS NA ROTA /MAPA) */}
      {isMapPage && (
        <div className="tab-switcher-container">
          <button 
            type="button"
            onClick={() => setView(ViewMode.MAP)}
            className={view === ViewMode.MAP ? 'tab-button-active' : 'tab-button-inactive'}
          >
            Análise em Mapa
          </button>
          <button 
            type="button"
            onClick={() => setView(ViewMode.LIST)}
            className={view === ViewMode.LIST ? 'tab-button-active' : 'tab-button-inactive'}
          >
            Lista Urbana ({listCount})
          </button>
        </div>
      )}

      {/* LADO DIREITO: CONTROLE DE SESSÃO / CONTA */}
      <div className="navbar-itens">
        {isLoggedIn ? (
          <span className="txt-card-title text-sm font-medium">Conectado</span>
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
