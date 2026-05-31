import { useState } from 'react';
import './AdminPanel.css';
import { useSearchAddress } from '../../hooks/usePotholes';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('chamados');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentPage, setCurrentPage] = useState(0); 
  const pageSize = 10;

  const { data: potholesPage, isPending: isPotholesPending } = useSearchAddress({
    address: searchQuery,
    status: statusFilter === 'todos' ? '' : statusFilter, // Trata o valor "todos"
    page: currentPage,
    size: pageSize
  });

  const potholesList = potholesPage?.content || [];
  const totalPages = potholesPage?.totalPages || 1;
  const totalElements = potholesPage?.totalElements || 0;

  const getStatusClassName = (status) => {
    if (status === 'PENDING') return 'badge-status-waiting';
    if (status === 'OPEN') return 'badge-status-progress';
    return 'badge-status-done';
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
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
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <section className="admin-filter-bar">
        <select 
          value={statusFilter} 
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(0); // Reseta para a primeira página ao filtrar
          }}
          className="admin-select-filter"
        >
          <option value="todos">Status 🧭 - Todos</option>
          <option value="PENDING">Aguardando (PENDING)</option>
          <option value="OPEN">Em andamento (OPEN)</option>
          <option value="FIXED">Concluído (FIXED)</option>
        </select>

        <input 
          type="text" 
          placeholder="Buscar endereço..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0); // Reseta para a primeira página ao digitar
          }}
          className="admin-search-input"
        />
      </section>

      <section className="admin-action-row">
        <button type="button" className="btn-csv-report">
          📄 Gerar relatório CSV
        </button>
        <span className="admin-counter-text">
          {totalElements} resultados 
        </span>
      </section>

      <div className="admin-table-wrapper">
        {isPotholesPending ? (
          <div className="loading-box">Carregando chamados...</div>
        ) : (
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
              {potholesList.map((chamado) => (
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
        )}
      </div>

      <footer className="admin-pagination-box">
        <button 
          className="btn-page-arrow" 
          onClick={handlePrevPage} 
          disabled={currentPage === 0}
        >
          &larr;
        </button>
        
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`btn-page-number ${currentPage === pageNumber ? 'btn-page-number-active' : ''}`}
          >
            {pageNumber + 1}
          </button>
        ))}

        <button 
          className="btn-page-arrow" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages - 1}
        >
          &rarr;
        </button>
      </footer>

    </div>
  );
}

export default AdminPanel;
