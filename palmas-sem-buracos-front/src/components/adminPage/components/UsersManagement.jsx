import { useState } from 'react';
import { useSearchUsers, useChangeUserPermission, useDeleteUser } from '../../../hooks/useUsers';
import { useDebounce } from '../../../hooks/useDebounce';
import { AdminPagination } from './AdminPagination';

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: usersPage, isPending: isUsersPending } = useSearchUsers({
    search: debouncedSearchQuery,
    page: currentPage,
    size: pageSize
  });

  const { mutate: changeRole, isPending: isUpdatingRole } = useChangeUserPermission();
  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  const usersList = usersPage?.content || [];
  const totalPages = usersPage?.totalPages || 1;
  const totalElements = usersPage?.totalElements || 0;

  const handleRoleChange = (data) => {
    console.log(data);
    changeRole(data);
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Tem certeza que deseja remover o usuário ${name}?`)) {
      deleteUser(id);
    }
  };

  const getRoleClassName = (role) => {
    if (role === 'ADMIN') return 'badge-status-done';     
    if (role === 'SERVER') return 'badge-status-progress'; 
    return 'badge-status-waiting';                        
  };

  const getRoleLabel = (role) => {
    if (role === 'ADMIN') return 'Administrador';
    if (role === 'SERVER') return 'Servidor';
    return 'Cidadão';
  };

 return (
    <>
      <section className="admin-filter-bar">
        <input 
          type="text" 
          placeholder="Buscar usuário por nome ou email..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0);
          }}
          className="admin-search-input"
        />
      </section>

      <section className="admin-action-row">
        <div></div>
        <span className="admin-counter-text">
          {totalElements} usuários cadastrados {(isUpdatingRole || isDeletingUser) && " - Atualizando..."}
        </span>
      </section>

      {isUsersPending ? (
        <div className="loading-box">Carregando usuários...</div>
      ) : (
        <>
          {/* TABELA DESKTOP: Oculta no mobile, visível em telas grandes */}
          <div className="admin-table-wrapper desktop-only">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Nível Atual</th>
                  <th>Alterar Permissão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usersList.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                ) : (
                  usersList.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="id">#{usuario.id}</td>
                      <td>{usuario.name}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className={`badge-status-base ${getRoleClassName(usuario.role)}`}>
                          {getRoleLabel(usuario.role)}
                        </span>
                      </td>
                      <td>
                        <select
                          value={usuario.role}
                          onChange={(e) => handleRoleChange({ id: usuario.id, role: e.target.value })}
                          className="admin-table-select"
                          disabled={isUpdatingRole}
                        >
                          <option value="CLIENT">Cidadão</option>
                          <option value="SERVER">Servidor</option>
                          <option value="ADMIN">Administrador</option>
                        </select>
                      </td>
                      <td>
                        <button 
                          type="button" 
                          onClick={() => window.confirm(`Remover usuário ${usuario.name}?`) && deleteUser(usuario.id)}
                          disabled={isDeletingUser}
                          className="btn-table-delete"
                        >
                          🗑️ Remover
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* LISTA DE CARDS MOBILE: Visível apenas em smartphones */}
          <div className="admin-mobile-cards mobile-only">
            {usersList.length === 0 ? (
              <div className="no-data-card">Nenhum usuário encontrado.</div>
            ) : (
              usersList.map((usuario) => (
                <div key={usuario.id} className="admin-card">
                  <div className="card-header">
                    <span className="card-id">#{usuario.id}</span>
                    <span className={`badge-status-base ${getRoleClassName(usuario.role)}`}>
                      {getRoleLabel(usuario.role)}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <p><strong>Nome:</strong> {usuario.name}</p>
                    <p><strong>E-mail:</strong> {usuario.email}</p>
                  </div>
                  
                  <div className="card-actions">
                    <div className="action-select-wrapper">
                      <label>Permissão:</label>
                      <select
                        value={usuario.role}
                        onChange={(e) => handleRoleChange({ id: usuario.id, role: e.target.value })}
                        className="admin-table-select"
                        disabled={isUpdatingRole}
                      >
                        <option value="CLIENT">Cidadão</option>
                        <option value="SERVER">Servidor</option>
                        <option value="ADMIN">Administrador</option>
                      </select>
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={() => window.confirm(`Remover usuário ${usuario.name}?`) && deleteUser(usuario.id)}
                      disabled={isDeletingUser}
                      className="btn-card-delete"
                    >
                      🗑️ Remover
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
