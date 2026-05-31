import { useAuth } from '../../../security/AuthContext';

export function AdminHeader() {
  const { user } = useAuth();

  const avatarLetter = user?.username ? String(user.username).charAt(0).toUpperCase() : 'A';

  return (
    <header className="admin-header">
      <h1 className="admin-title">Painel Administrativo</h1>
      
      <div className="admin-user-badge">
        <div className="admin-avatar">{avatarLetter}</div>
        <span className="admin-username">
          {user?.username || 'Administrador'}
        </span>
      </div>
    </header>
  );
}
