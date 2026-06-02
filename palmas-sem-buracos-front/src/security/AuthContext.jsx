import { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (error) {
        console.log("Nenhum usuário logado na sessão ativa.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  const logout = () => {
    setUser(null);
    window.location.href = 'http://localhost:8080/logout';
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
