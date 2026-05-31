import { useState } from 'react';
import './AdminPanel.css';
import { usePotholes, useSearchAddress } from '../../hooks/usePotholes';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('chamados');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: potholes = [], isPending: isPotholesPending } = usePotholes();


  // Helper para injetar a classe correta da tag de status do Figma
  const getStatusClassName = (status) => {
    if (status === 'Aguardando') return 'badge-status-waiting';
    if (status === 'Em andamento') return 'badge-status-progress';
    return 'badge-status-done';
  };
  console.log(potholes);

  return (
    <div className="admin-page-container">
      
      {/* CABEÇALHO DO PAINEL */}
      <header className="admin-header">
        <h1 className="admin-title">Painel Administrativo</h1>
        <div className="admin-user-badge">
          <div className="admin-avatar">A</div>
          <span className="admin-username">Admin</span>
        </div>
      </header>

      {/* ABAS DE NAVEGAÇÃO DO FIGMA */}
      <nav className="admin-nav-tabs">
        <button 
          onClick={() => setActiveTab('chamados')}
          className={`admin-tab-btn ${activeTab === 'chamados' ? 'admin-tab-btn-active' : ''}`}
        >
          Chamados
        </button>
        <button 
          onClick={() => setActiveTab('relatorios')}
          className={`admin-tab-btn ${activeTab === 'relatorios' ? 'admin-tab-btn-active' : ''}`}
        >
          Relatórios
        </button>
        <button 
          onClick={() => setActiveTab('usuarios')}
          className={`admin-tab-btn ${activeTab === 'usuarios' ? 'admin-tab-btn-active' : ''}`}
        >
          Usuários
        </button>
      </nav>

      {/* BARRA DE FILTROS E BUSCA */}
      <section className="admin-filter-bar">
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-select-filter"
        >
          <option value="todos">Status 🧭 - Todos</option>
          <option value="Aguardando">Aguardando</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>

        <input 
          type="text" 
          placeholder="Buscar endereço..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="admin-search-input"
        />
      </section>

      {/* SUB-BARRA: AÇÕES E CONTADOR */}
      <section className="admin-action-row">
        <button type="button" className="btn-csv-report">
          📄 Gerar relatório CSV
        </button>
        <span className="admin-counter-text">
          {potholes.length} resultados
        </span>
      </section>

      {/* TABELA DE DADOS DO FIGMA */}
      <div className="admin-table-wrapper">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Endereço</th>
              <th>Quadra</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {potholes.map((chamado) => (
              <tr key={chamado.id}>
                <td className="id">{chamado.id}</td>
                <td>{chamado.address}</td>
                <td>{chamado.blockName}</td>
                <td>
                  <span className={`badge-status-base ${getStatusClassName(chamado.status)}`}>
                    {chamado.status}
                  </span>
                </td>
                <td>{new Date(chamado.createdAt).toLocaleDateString()}</td>
                <td>
                  <button type="button" className="btn-table-edit">
                    ✏️ Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINAÇÃO INFERIOR */}
      <footer className="admin-pagination-box">
        <button className="btn-page-arrow" disabled={currentPage === 1}>&larr;</button>
        <button className="btn-page-number btn-page-number-active">1</button>
        <button className="btn-page-number">2</button>
        <button className="btn-page-number">3</button>
        <button className="btn-page-arrow">&rarr;</button>
      </footer>

    </div>
  );
}

export default AdminPanel;
