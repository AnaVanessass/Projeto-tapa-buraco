import { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import { DEFAULT_MAP_CENTER } from '../../types/pothole.types';
import { mapOptions, markerIcon} from './Map.constants';
import './Map.css';

const Map = ({ potholes, setSelectedLocation, mapCenter, setMapCenter }) => {
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
          potholes.map((pothole) => (
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
          ))
        }
      </MarkerClusterer>

      {selectedPothole && (
        <InfoWindow
          position={{ lat: Number(selectedPothole.lat), lng: Number(selectedPothole.lng) }}
          onCloseClick={() => setSelectedPothole(null)}
        >
          <div className="info-window">
            <h3>Detalhes</h3>
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