import { useState } from 'react';
import { useSearchAddress, useChangePotholeStatus, useDeletePothole } from '../../../hooks/usePotholes';
import { normalizePothole } from '../../../utils/normalizePothole';
import { useDebounce } from '../../../hooks/useDebounce';
import { AdminPagination } from './AdminPagination';
import { useAlert } from '../../../alerts/AlertContext';
import exportCSV from '../../../utils/exportCSV';

export function ComplaintsTable() {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0); 
  const pageSize = 10;

  const {triggerSuccess, triggerError} = useAlert();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: potholesPage, isPending: isPotholesPending } = useSearchAddress({
    address: debouncedSearchQuery,
    status: statusFilter === 'todos' ? '' : statusFilter,
    page: currentPage,
    size: pageSize
  });

  const { mutate: updateStatus, isPending: isUpdating } = useChangePotholeStatus();
  const { mutate: deletePothole, isPending: isDeleting } = useDeletePothole();

  const potholesList = potholesPage?.content.map(normalizePothole) || [];
  const totalPages = potholesPage?.totalPages || 1;
  const totalElements = potholesPage?.totalElements || 0;

  const getStatusClassName = (status) => {
    if (status === 'PENDING') return 'badge-status-waiting';
    if (status === 'OPEN') return 'badge-status-progress';
    return 'badge-status-done';
  };

  const handleExportCSV = () =>{
    exportCSV(potholesList);
  }

  return (
    <>
      <section className="admin-filter-bar">
        <select 
          value={statusFilter} 
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
          className="admin-select-filter"
        >
          <option value="todos">Status - Todos</option>
          <option value="PENDING">Aguardando</option>
          <option value="OPEN">Em andamento</option>
          <option value="FIXED">Concluído</option>
        </select>

        <input 
          type="text" 
          placeholder="Buscar endereço..." 
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
          className="admin-search-input"
        />
      </section>

      <section className="admin-action-row">
        <button 
        type="button" 
        className="btn-csv-report"
        onClick={handleExportCSV}>Gerar relatório CSV</button>
        <span className="admin-counter-text">
          {totalElements} resultados {(isUpdating || isDeleting) && " - Atualizando..."}
        </span>
      </section>

      {isPotholesPending ? (
        <div className="loading-box">Carregando chamados...</div>
      ) : (
        <>
          {/* DESKTOP TABLE: Visible on large screens, hidden on mobile */}
          <div className="admin-table-wrapper desktop-only">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Endereço</th>
                  <th>Quadra</th>
                  <th>Status atual</th>
                  <th>Alterar Status</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {potholesList.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                      Nenhum chamado encontrado.
                    </td>
                  </tr>
                ) : (
                  potholesList.map((chamado) => (
                    <tr key={chamado.id}>
                      <td className="id">#{chamado.id}</td>
                      <td>{chamado.address}</td>
                      <td>{chamado.blockName}</td>
                      <td>
                        <span className={`badge-status-base ${getStatusClassName(chamado.status)}`}>
                          {chamado.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={chamado.status}
                          onChange={(e) => updateStatus({ id: chamado.id, status: e.target.value })}
                          className="admin-table-select"
                          disabled={isUpdating}
                        >
                          <option value="PENDING">Aguardando</option>
                          <option value="OPEN">Em andamento</option>
                          <option value="FIXED">Concluído</option>
                        </select>
                      </td>
                      <td>{new Date(chamado.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          type="button" 
                          onClick={() => window.confirm(`Excluir chamado #${chamado.id}?`) && deletePothole(chamado.id) }
                          disabled={isDeleting}
                          className="btn-table-delete"
                        >
                          🗑️ Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS: Visible on mobile, hidden on desktop */}
          <div className="admin-mobile-cards mobile-only">
            {potholesList.length === 0 ? (
              <div className="no-data-card">Nenhum chamado encontrado.</div>
            ) : (
              potholesList.map((chamado) => (
                <div key={chamado.id} className="admin-card">
                  <div className="card-header">
                    <span className="card-id">#{chamado.id}</span>
                    <span className={`badge-status-base ${getStatusClassName(chamado.status)}`}>
                      {chamado.status}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <p><strong>Endereço:</strong> {chamado.address}</p>
                    <p><strong>Quadra:</strong> {chamado.blockName}</p>
                    <p><strong>Data:</strong> {new Date(chamado.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="card-actions">
                    <div className="action-select-wrapper">
                      <label>Alterar Status:</label>
                      <select
                        value={chamado.status}
                        onChange={(e) => updateStatus({ id: chamado.id, status: e.target.value })}
                        className="admin-table-select"
                        disabled={isUpdating}
                      >
                        <option value="PENDING">Aguardando</option>
                        <option value="OPEN">Em andamento</option>
                        <option value="FIXED">Concluído</option>
                      </select>
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={() => window.confirm(`Excluir chamado #${chamado.id}?`) && deletePothole(chamado.id) }
                      disabled={isDeleting}
                      className="btn-card-delete"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      <AdminPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </>
  );
}