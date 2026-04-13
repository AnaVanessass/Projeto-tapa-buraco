import { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
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

  const center = mapCenter || DEFAULT_MAP_CENTER;

  return (
    <GoogleMap
      mapContainerStyle={mapOptions.mapContainerStyle}
      zoom={13}
      center={center}
      onClick={onMapClick}
      options={mapOptions.options}
    >
      {potholes.map((pothole) => (
        <Marker
          key={pothole.id}
          position={{ lat: pothole.lat, lng: pothole.lng }}
          onClick={() => setSelectedPothole(pothole)}
          icon={markerIcon}
        />
      ))}

      {selectedPothole && (
        <InfoWindow
          position={{ lat: selectedPothole.lat, lng: selectedPothole.lng }}
          onCloseClick={() => setSelectedPothole(null)}
        >
          <div className="info-window">
            <h3>Detalhes</h3>
            <p><strong>Local:</strong> {selectedPothole.address || 'Address not available'}</p>
            <p><strong>Quadra:</strong> {selectedPothole.cityBlock || 'Not specified'}</p>
            <p><strong>Tamanho:</strong> {selectedPothole.size || 'Not specified'}</p>
            <p><strong>Gravidade:</strong> {selectedPothole.severity || 'Not specified'}</p>
            <p><strong>Data:</strong> {new Date(selectedPothole.date).toLocaleDateString()}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;