import { useState, useCallback, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from './components/map/Map';
import PotholeForm from './components/potholeForm/PotholeForm';
import FilterBar from '../filterBar/FilterBar';
import { useCreatePothole, useDeletePothole, usePotholeMarkers } from '../../hooks/usePotholes';
import { DEFAULT_MAP_CENTER } from '../../types/pothole.types';
import { useCityBlocks} from '../../hooks/useCityBlocks';
import './MapPage.css';

const GOOGLE_MAPS_LIBRARIES = ['places'];

function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_MAP_CENTER);
  const [mapError, setMapError] = useState(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { data: blocks = [], isPending: isBlocksPending } = useCityBlocks();
  const { data: potholeMarkers = [], isPending: isPotholeMarkersPending } = usePotholeMarkers();
  const createMutation = useCreatePothole();
  const deleteMutation = useDeletePothole();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [activeStatuses, setActiveStatuses] = useState(['OPEN', 'PENDING', 'FIXED']);
  
  const handleToggleStatus = (status) => {
    setActiveStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const filteredPotholes = potholeMarkers.filter((pothole) => {
    const matchesBlock = !selectedBlock || pothole.blockIdPlace === selectedBlock;
    const matchesStatus = activeStatuses.includes(pothole.status);
    
    return matchesBlock && matchesStatus;
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const handleViewOnMap = useCallback((pothole) => {
    setMapCenter({ lat: pothole.lat, lng: pothole.lng });
  }, []);

  const handleAddPothole = async (payload) => {
    try {
      setErrorAlertMessage(null);
      await createMutation.mutateAsync(payload);
      setSelectedLocation(null);
      setShowSuccessAlert(true);
    } catch (err) {
      console.error("Erro ao salvar buraco", err);
      if (err.response?.status === 401) {
        setErrorAlertMessage("Acesso negado. Você precisa estar logado para denunciar.");
      } else {
        setErrorAlertMessage("Ops! Algo deu errado ao salvar. Tente novamente.");
      }
    }
  };

  const handleDelete = (potholeId) => {
    if (window.confirm("Deletar denúncia?")) {
      deleteMutation.mutate(potholeId);
    }
  };

  const handleLoadError = useCallback((error) => {
    console.error('Google Maps falhou:', error);
    setMapError('Erro técnico ao renderizar os mapas públicos.');
  }, []);

  useEffect(() => {
    if (errorAlertMessage) {
      const timer = setTimeout(() => setErrorAlertMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorAlertMessage]);

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => setShowSuccessAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert])

  return (
      <main className="map-content-box">
        
        <div className="filter-wrapper-card">
          <FilterBar 
            selectedBlock={selectedBlock}
            onBlockChange={setSelectedBlock}
            cityBlocks={blocks}
            activeStatuses={activeStatuses}
            onToggleStatus={handleToggleStatus}
          />
        </div>

        <div className="live-map-frame">
          {showSuccessAlert && (
            <div className="alert-success-toast">
              ✅ Denúncia registrada com sucesso em Palmas!
            </div>
          )}
          {errorAlertMessage && (
            <div className="alert-error-toast">
              {errorAlertMessage}
            </div>
          )}

          {loadError ? (
            <div className="map-api-error-box">
              Chave Mapas Ausente no arquivo .env
            </div>
          ) : !isLoaded ? (
            <div className="map-api-error-box">
              Carregando infraestrutura de mapas...
            </div>
          ) : (
            <div className="map-container">
              <Map 
                potholes={filteredPotholes || []}
                setSelectedLocation={setSelectedLocation}
                mapCenter={mapCenter}
                setMapCenter={setMapCenter}
              />

              {selectedLocation && (
                <div className="pothole-floating-modal">
                  {createMutation.isPending && (
                    <div className="modal-loading-overlay">
                      <div className="loading-spinner !w-8 !h-8 !border-2"></div>
                    </div>
                  )}
                  <h4 className="model-tittle">📍 Novo Ponto Identificado</h4>
                  <PotholeForm 
                    location={selectedLocation}
                    onAdd={handleAddPothole}
                    onCancel={() => setSelectedLocation(null)}
                    isPending={createMutation.isPending}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
  );
}

export default MapPage;
