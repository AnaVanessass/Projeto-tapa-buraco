import { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import { DEFAULT_MAP_CENTER } from '../../types/pothole.types';
import { mapOptions, markerIcon} from './Map.constants';

const Map = ({ potholes, setSelectedLocation, mapCenter, setMapCenter }) => {
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
  const [selectedPothole, setSelectedPothole] = useState(null);

  const onMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }, [setSelectedLocation]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const center = mapCenter || DEFAULT_MAP_CENTER;

  const getCloudinaryUrl = (publicId) => {
    if (!publicId) return null;
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${publicId}`;
  };

  return (
    <GoogleMap
      mapContainerStyle={mapOptions.mapContainerStyle}
      zoom={13}
      center={center}
      onClick={onMapClick}
      options={mapOptions.options}
    >
      <MarkerClusterer>
        {(clusterer) => 
          potholes.map((pothole) => {
            return(
              <Marker
                key={pothole.id}
                position={{
                  lat: Number(pothole.lat),
                  lng: Number(pothole.lng)
                }}
                onClick={() => setSelectedPothole(pothole)}
                clusterer={clusterer}
                icon={markerIcon}
              />
            )
          })
        }
      </MarkerClusterer>

      {selectedPothole && (
        <InfoWindow
          position={{ lat: Number(selectedPothole.lat), lng: Number(selectedPothole.lng) }}
          onCloseClick={() => setSelectedPothole(null)}
        >
          <div className="info-window">
            <div className="info-window-img-box">
              {selectedPothole.imagePublicId ? (
                <img 
                  src={getCloudinaryUrl(selectedPothole.imagePublicId)} 
                  alt="Evidência do Buraco" 
                />
              ) : (
                <div className="info-window-placeholder">
                  <span>📷</span>
                  Sem foto anexada
                </div>
              )}
            </div>
            <p><strong>Local:</strong> {selectedPothole.address || 'Endereço não disponível'}</p>
            <p><strong>Quadra:</strong> {selectedPothole.blockName || 'Quadra não especificada'}</p>
            <p><strong>Data:</strong> {formatDate(selectedPothole.createdAt)}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;