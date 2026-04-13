import { MAP_CONTAINER_STYLE, POTHOLE_MARKER_ICON } from '../../types/pothole.types';

export const mapOptions = {
  mapContainerStyle: MAP_CONTAINER_STYLE,
  options: {
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true
  }
};

export const markerIcon = POTHOLE_MARKER_ICON;