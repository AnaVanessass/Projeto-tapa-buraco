import { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Map from '../map/Map';
import PotholeList from '../potholeList/PotholeList';
import AddPotholeForm from '../addPothole/AddPotholeForm';
import FilterBar from '../filterBar/FilterBar';
import { usePotholes } from '../../hooks/usePotholes';
import { ViewMode, DEFAULT_MAP_CENTER } from '../../types/pothole.types';
import { usePotholesOld } from '../../hooks/usePotholesOld';
import { useCreatePothole } from '../../hooks/useCreatePothole';
import { useDeletePothole } from '../../hooks/useDeletePothole';
import { useCityBlocks} from '../../hooks/useCityBlocks';
import './MapRender.css';

const GOOGLE_MAPS_LIBRARIES = ['places'];

function MapRender() {
  const [view, setView] = useState(ViewMode.MAP);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_MAP_CENTER);
  const [mapError, setMapError] = useState(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  const { filterBlock, cityBlocks, updateFilter, clearFilter } = usePotholesOld();
  const { data: blocks = [], isPending: isBlocksPending } = useCityBlocks();
  const { data: potholes = [], isPending: isPotholesPending } = usePotholes();
  const createMutation = useCreatePothole();
  const deleteMutation = useDeletePothole();

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [activeStatuses, setActiveStatuses] = useState(['OPEN', 'PENDING', 'FIXED']);
  
  const handleToggleStatus = (status) => {
    setActiveStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const filteredPotholes = potholes.filter((pothole) => {
    const matchesBlock = !selectedBlock || pothole.cityBlockId === selectedBlock;
    const matchesStatus = activeStatuses.includes(pothole.status);
    
    return matchesBlock && matchesStatus;
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const handleViewOnMap = useCallback((pothole) => {
    setMapCenter({ lat: pothole.lat, lng: pothole.lng });
    setView(ViewMode.MAP);
  }, []);

  const handleAddPothole = async (payload) => {
    try {
      await createMutation.mutateAsync(payload);
      setSelectedLocation(null);
    } catch (err) {
      console.error("Erro ao salvar buraco", err);
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

    // console.log("=== DEBUG FILTRAGEM URBANA ===");
    // console.log("Filtro Selecionado na Tela:", JSON.stringify(selectedBlock));
    // potholes.forEach((p, index) => {
    //   console.log(`Buraco #${index + 1} [ID: ${p.id}]:`, {
    //     originalNoBanco: p.cityBlock,
    //     aposNormalizacao: p.cityBlock,
    //     bateComOFiltro: p.cityBlock === String(selectedBlock).toLowerCase().replace("quadra", "").trim()
    //   });
    // });
    // console.log("===============================");

  return (
    <div className="page-container">
      
      <Header view={view} setView={setView} listCount={potholes.length} />

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
          {loadError ? (
            <div className="map-api-error-box">
              Chave Mapas Ausente no arquivo .env
            </div>
          ) : !isLoaded ? (
            <div className="map-api-error-box">
              Carregando infraestrutura de mapas...
            </div>
          ) : (
              view === ViewMode.MAP ? (
                <div className="map-container">
                  <Map 
                    potholes={potholes || []}
                    setSelectedLocation={setSelectedLocation}
                    mapCenter={mapCenter}
                    setMapCenter={setMapCenter}
                  />

                  {selectedLocation && (
                    <div className="pothole-floating-modal">
                      <h4 className="model-tittle">📍 Novo Ponto Identificado</h4>
                      <AddPotholeForm 
                        location={selectedLocation}
                        onAdd={handleAddPothole}
                        onCancel={() => setSelectedLocation(null)}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="list-container">
                  <PotholeList 
                    potholes={potholes}
                    onDelete={handleDelete}
                    onViewOnMap={handleViewOnMap}
                  />
                </div>
              )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MapRender;
