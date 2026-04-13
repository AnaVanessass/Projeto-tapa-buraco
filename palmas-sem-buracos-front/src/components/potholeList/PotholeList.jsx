import './PotholeList.css';

const PotholeList = ({ potholes, onDelete, onViewOnMap }) => {
  if (potholes.length === 0) {
    return (
      <div className="pothole-list empty">
        <p>Sem denúncias por enquanto. Clique no mapa para adicionar uma denúncia!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="pothole-list">
      <h2>Buracos Reportados ({potholes.length})</h2>
      <div className="list-grid">
        {potholes.map(pothole => (
          <article key={pothole.id} className="pothole-card">
            <h3>{pothole.address || 'Endereço Desconhecido'}</h3>
            <p><strong>Quadra:</strong> {pothole.cityBlock}</p>
            <p><strong>Tamaho:</strong> <span className="capitalize">{pothole.size}</span></p>
            <p><strong>Gravidade:</strong> <span className="capitalize">{pothole.severity}</span></p>
            <p><strong>Denunciado em:</strong> {formatDate(pothole.date)}</p>
            {pothole.description && (
              <p><strong>Descrição:</strong> {pothole.description}</p>
            )}
            <div className="card-actions">
              <button 
                onClick={() => onViewOnMap(pothole)}
                aria-label={`View pothole at ${pothole.address} on map`}
              >
                Ver no Mapa
              </button>
              <button 
                onClick={() => onDelete(pothole.id)} 
                className="delete"
                aria-label="Delete pothole"
              >
                Deletar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PotholeList;