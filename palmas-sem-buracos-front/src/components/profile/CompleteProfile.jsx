import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../service/apiClient';
import './CompleteProfile.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

function CompletarPerfil() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleCompletion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/complete-profile', { username });
      navigate('/mapa');
    } catch (error) {
      console.log('Algo deu errado: ' + error);
    }
  };

  function handleChange(e) {
    setUsername(e.target.value);
  }

  return (
    <main className="profile-complete-box">
      <div className="profile-card">
        
        <div className="profile-header-group">
          <h1 className="txt-card-title text-xl mb-2">Escolha seu nome de usuário</h1>
          <p className="txt-card-desc">
            Este nome não será exibido publicamente junto às suas denúncias no mapa urbano, ele é utilizado somente para controle interno.
          </p>
        </div>

        <form onSubmit={handleCompletion} className="profile-form">
          <input 
            type="text" 
            value={username} 
            onChange={handleChange} 
            placeholder="Ex: Jacinto"
            required
          />
          <button type="submit">Registrar</button>
        </form>

      </div>
    </main>
  );
}

export default CompletarPerfil;
