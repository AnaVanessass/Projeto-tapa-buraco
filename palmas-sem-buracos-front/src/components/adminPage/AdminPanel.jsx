import { useState } from 'react';
import './AdminPanel.css';
import { ComplaintsTable } from './components/ComplaintsTable';
import { ReportsDashboard } from './components/ReportsDashboard';
import { UsersManagement } from './components/UsersManagement';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('chamados');

  // Mapeamento dinâmico dos componentes por aba
  const renderTabContent = () => {
    switch (activeTab) {
      case 'chamados':
        return <ComplaintsTable />;
      case 'relatorios':
        return <ReportsDashboard />;
      case 'usuarios':
        return <UsersManagement />;
      default:
        return <ComplaintsTable />;
    }
  };

  return (
    <div className="admin-page-container">
      
      <header className="admin-header">
        <h1 className="admin-title">Painel Administrativo</h1>
        <div className="admin-user-badge">
          <div className="admin-avatar">A</div>
          <span className="admin-username">Admin</span>
        </div>
      </header>

      <nav className="admin-nav-tabs">
        {['chamados', 'relatorios', 'usuarios'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`admin-tab-btn ${activeTab === tab ? 'admin-tab-btn-active' : ''}`}
          >
            {tab === 'chamados' && 'Chamados'}
            {tab === 'relatorios' && 'Relatórios'}
            {tab === 'usuarios' && 'Usuários'}
          </button>
        ))}
      </nav>

      {/* Conteúdo renderizado dinamicamente */}
      <main className="admin-main-content">
        {renderTabContent()}
      </main>

    </div>
  );
}

export default AdminPanel;
