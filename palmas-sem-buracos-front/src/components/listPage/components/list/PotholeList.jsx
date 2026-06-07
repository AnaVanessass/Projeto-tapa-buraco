import '../../ListPage.css';
import { useState, useCallback } from 'react';
import getCloudinaryUrl from '../../../../utils/cloudinaryImg.jsx';

const PotholeList = ({potholes, onSelected}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (potholes.length === 0) {
    return (
      <div className="pothole-list empty">
        <p>Sem denúncias por enquanto. Clique no mapa para adicionar uma denúncia!</p>
      </div>
    );
  }

  const getStatusLabel = (status) => {
    const labels = {
      'PENDING': 'Em Analise',
      'OPEN': 'Aberto',
      'FIXED': 'Resolvido'
    };
    return labels[status] || 'Aguardando';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const onCardClick = (item) => {onSelected(item)};

  return (
    <div className="pothole-list-container">
      <div className="list-rows">
        {potholes.map(item => (
          <article 
            key={item.id} 
            className="pothole-row-card"
            onClick={() => onCardClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-info">
              <h3>{item.address || `${item.blockName || 'Sem quadra'}`}</h3>
            </div>
            
            <div className="card-status-wrapper">
              <span className={`status-badge ${item.status?.toLowerCase() || 'pending'}`}>
                {getStatusLabel(item.status)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PotholeList;