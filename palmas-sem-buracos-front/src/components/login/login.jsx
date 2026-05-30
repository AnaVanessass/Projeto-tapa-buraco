import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="page-container">
      
      {/* NAVBAR DE RETORNO */}
      <header className="app-navbar">
        <div className="navbar-itens">
          <Link to="/" className="logo-icon">P</Link>
          <span className="txt-brand-name">Palmas sem Buracos</span>
        </div>
        <div className="navbar-itens">
          <Link to="/">
            <button className="btn-secondary-sm">Voltar ao início</button>
          </Link>
        </div>
      </header>

      {/* ÁREA CENTRALIZADA DO CARD */}
      <main className="login-content-box">
        <div className="login-card">
          
          {/* LOGOTIPO DO CARD */}
          <div className="logo-icon-lg">P</div>
          
          {/* TEXTOS INFORMATIVOS */}
          <div className="login-header-group">
            <h1 className="txt-card-title">Entrar no Sistema</h1>
            <p className="txt-card-desc">
              Utilize sua conta institucional ou pessoal para registrar e acompanhar ocorrências
            </p>
          </div>

          {/* BOTÃO GOOGLE OAUTH */}
          <button onClick={handleLoginGoogle} className="btn-google-auth">
            <svg className="google-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Entrar com o Google
          </button>

        </div>
      </main>

      {/* RODAPÉ DO SISTEMA */}
      <footer className="footer">
        <p className="footer-p">IFTO - Projeto de Extensão 2026</p>
      </footer>
      
    </div>
  );
}

export default Login;
