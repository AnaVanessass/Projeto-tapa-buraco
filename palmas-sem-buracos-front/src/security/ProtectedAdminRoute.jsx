import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedAdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-container justify-center items-center">
        <div className="txt-hero-subtitle animate-pulse">
          Validando credenciais administrativas...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isProfileAdmin = user.role === 'ADMIN' || user.roles?.includes('ADMIN');
  
  if (!isProfileAdmin) {
    return <Navigate to="/mapa" replace />;
  }

  return <Outlet />;
}
