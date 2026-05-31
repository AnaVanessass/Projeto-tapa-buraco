import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const profileComplete = searchParams.get('profileComplete') === 'true';

    if (profileComplete) {
      navigate('/mapa');
    } else {
      navigate('/completar-perfil');
    }
  }, [navigate, searchParams]);

  return <div>Processando login...</div>;
}
