import './PotholeList.css';
import { useState } from 'react';
import MyImage from '../../utils/cloudinaryImg';

const PotholeList = ({ potholes, onDelete, onViewOnMap }) => {
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
  
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
      'PENDING': 'Aguardando',
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

  const getCloudinaryUrl = (publicId) => {
    if (!publicId) return null;
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${publicId}`;
  };

  const handleMouseEnter = (publicId, e) => {
    if (publicId) {
      setHoveredImage(getCloudinaryUrl(publicId));
      setMousePos({ x: e.clientX + 15, y: e.clientY + 15 });
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <div className="pothole-list-container">
      <div className="list-rows">
        {potholes.map(pothole => (
          <article 
            key={pothole.id} 
            className="pothole-row-card"
            onClick={() => onViewOnMap(pothole)}
            onMouseEnter={(e) => handleMouseEnter(pothole.imagePublicId, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-info">
              <h3>{pothole.address || `${pothole.blockName || 'Sem quadra'}`}</h3>
            </div>
            
            <div className="card-status-wrapper">
              <span className={`status-badge ${pothole.status?.toLowerCase() || 'pending'}`}>
                {getStatusLabel(pothole.status)}
              </span>
            </div>
          </article>
        ))}
      </div>

      {hoveredImage && (
        <div 
          className="image-hover-preview"
          style={{ top: `${mousePos.y}px`, left: `${mousePos.x}px` }}
        >
          {isImageLoading && (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          )}
          <img 
            src={hoveredImage} 
            alt="Preview do buraco" 
            onLoad={() => setIsImageLoading(false)}
            style={{ display: isImageLoading ? 'none' : 'block' }}
          />
        </div>
      )}
    </div>
  );
};

export default PotholeList;