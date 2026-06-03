import { Link } from 'react-router-dom';
import './Home.css'
import { useAuth } from '../../security/AuthContext';

function Home() {
  const { user } = useAuth();
  const admin = user?.role === "ADMIN";

  return (
      <main className="main-content-box">
        
        <div className="hero-container">
          <h1 className="txt-hero-title">Ajude a mapear os buracos de Palmas</h1>
          <p className="txt-hero-subtitle">Participe da melhoria da nossa cidade</p>
        </div>

        <Link to="/mapa">
          <div className="map-frame">
            <img src="src/assets/map-placeholder-1000x420.webp" alt="Mapa demonstrativo" />
          </div>
        </Link>

        { admin ? 
          <div className="link-container">
            <Link to="/mapa" className="link">
              <button type="button" className="btn-action-primary">🗺️ Ver mapa público</button>
            </Link>
            <Link to="/admin" className="link">
              <button type="button" className="btn-action-admin">⚙️ Painel Admin</button>
            </Link>
          </div>
        : <div></div>}

        <div className="grid-card">
          <div className="step-card">
            <div className="step-card-icon">🔍</div>
            <h3 className="txt-card-title">1. Identifique o problema</h3>
            <p className="txt-card-desc">Encontre buracos e pontos críticos nas vias da cidade</p>
          </div>

          <div className="step-card">
            <div className="step-card-icon">📝</div>
            <h3 className="txt-card-title">2. Registre no app</h3>
            <p className="txt-card-desc">Envie fotos e localização do problema</p>
          </div>

          <div className="step-card">
            <div className="step-card-icon">✅</div>
            <h3 className="txt-card-title">3. Acompanhe a solução</h3>
            <p className="txt-card-desc">Veja o status da manutenção em tempo real</p>
          </div>
        </div>
      </main>
    );
}

export default Home;
