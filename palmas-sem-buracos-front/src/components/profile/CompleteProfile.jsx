import {api} from '../../service/apiClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function CompletarPerfil (){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleCompletion = async (e) => {
    e.preventDefault();
    try{
      await api.post('/user/complete-profile',{username});
      navigate('/dashboard')
    }catch(error){
      console.log('Algo deu errado: ' + error)
    }
  };

  function handleChange(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="profile-complete-container">
      <h1>Escolha seu nome de usuário</h1>
      <form onSubmit={handleCompletion}>
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
  );
};

export default CompletarPerfil;