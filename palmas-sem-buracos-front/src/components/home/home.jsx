import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container">
      
      {/* NAVBAR */}
      <header className="app-navbar">
        <div className="navbar-itens">
          <div className="logo-icon">P</div>
          <span className="txt-brand-name">Palmas sem Buracos</span>
        </div>
        
        <div className="navbar-itens">
          <Link to="/login"><button className="btn-secondary-sm">Entrar</button></Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL - Caixa controladora de largura */}
      <main className="main-content-box">
        
        <div className="hero-container">
          <h1 className="txt-hero-title">Ajude a mapear os buracos de Palmas</h1>
          <p className="txt-hero-subtitle">Participe da melhoria da nossa cidade</p>
        </div>

        {/* CONTAINER MOLDURA FIGMA */}
        <div className="figma-map-frame">
          <img src="src/assets/map-placeholder-860-420.jpeg" alt="Mapa demonstrativo" />
        </div>

        {/* BOTÕES DE NAVEGAÇÃO INTERMEDIÁRIOS */}
        <div className="link-container">
          <Link to="/mapa" className="link">
            <button type="button" className="btn-action-primary">🗺️ Ver mapa público</button>
          </Link>
          <Link to="/admin" className="link">
            <button type="button" className="btn-action-admin">⚙️ Painel Admin</button>
          </Link>
        </div>

        {/* GRIDS DOS CARDS INFERIORES */}
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

      {/* RODAPÉ */}
      <footer className="footer">
        <p className="footer-p">IFTO - Projeto de Extensão 2026</p>
        <p className="footer-p">Palmas - TO</p>
      </footer>
    </div>
    );
}

export default Home;
