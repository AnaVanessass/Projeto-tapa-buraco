import { useState, useCallback } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from '../map/Map';
import PotholeList from '../potholeList/PotholeList';
import AddPotholeForm from '../addPothole/AddPotholeForm';
import FilterBar from '../filterBar/FilterBar';
import { usePotholes } from '../../hooks/usePotholes';
import { ViewMode, DEFAULT_MAP_CENTER } from '../../types/pothole.types';

const GOOGLE_MAPS_LIBRARIES = ['places'];

function MapRender(){
  const [view, setView] = useState(ViewMode.MAP);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_MAP_CENTER);
  const [mapError, setMapError] = useState(null);
  
  const {
    potholes,
    filterBlock,
    cityBlocks,
    addPothole,
    deletePothole,
    updateFilter,
    clearFilter
  } = usePotholes();

  const handleViewOnMap = useCallback((pothole) => {
    setMapCenter({ lat: pothole.lat, lng: pothole.lng });
    setView(ViewMode.MAP);
  }, []);

  const handleAddPothole = useCallback((potholeData) => {
    addPothole(potholeData);
    setSelectedLocation(null);
  }, [addPothole]);

  const handleLoadError = useCallback((error) => {
    console.error('Google Maps failed to load:', error);
    setMapError('Failed to load Google Maps. Please check your API key.');
  }, []);
  
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🕳️ Pothole Tracker</h1>
        </header>
        <main className="main-content">
          <div className="map-no-key">
            <div>
              <h3>Google Maps API Key Required</h3>
              <p>Please add your Google Maps API key to the .env file:</p>
              <code>VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
              <p>Get a free key from the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🕳️ Tapa Buraco</h1>
        <div className="view-toggle">
          <button 
            className={view === ViewMode.MAP ? 'active' : ''} 
            onClick={() => setView(ViewMode.MAP)}
          >
            Mapa
          </button>
          <button 
            className={view === ViewMode.LIST ? 'active' : ''} 
            onClick={() => setView(ViewMode.LIST)}
          >
            Lista
          </button>
        </div>
      </header>

      <FilterBar 
        filterBlock={filterBlock}
        onFilterChange={updateFilter}
        onClearFilter={clearFilter}
        cityBlocks={cityBlocks}
      />

      <main className="main-content">
        {mapError ? (
          <div className="map-error">{mapError}</div>
        ) : (
          <LoadScript 
            googleMapsApiKey={googleMapsApiKey}
            onError={handleLoadError}
            libraries={GOOGLE_MAPS_LIBRARIES}
            loadingElement={
              <div className="map-loading">
                <div className="loading-spinner"></div>
                <p>Carregando Google Maps...</p>
              </div>
            }
          >
            {view === ViewMode.MAP ? (
              <div className="map-container">
                <Map 
                  potholes={potholes}
                  setSelectedLocation={setSelectedLocation}
                  mapCenter={mapCenter}
                  setMapCenter={setMapCenter}
                />
                {selectedLocation && (
                  <AddPotholeForm 
                    location={selectedLocation}
                    onAdd={handleAddPothole}
                    onCancel={() => setSelectedLocation(null)}
                  />
                )}
              </div>
            ) : (
              <PotholeList 
                potholes={potholes}
                onDelete={deletePothole}
                onViewOnMap={handleViewOnMap}
              />
            )}
          </LoadScript>
        )}
      </main>
    </div>
  );
}

export default MapRender;