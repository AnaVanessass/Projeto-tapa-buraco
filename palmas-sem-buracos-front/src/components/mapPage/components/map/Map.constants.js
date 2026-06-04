import { MAP_CONTAINER_STYLE, POTHOLE_MARKER_ICON } from '../../../../types/pothole.types';

export const mapOptions = {
  mapContainerStyle: MAP_CONTAINER_STYLE,
  options: {
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true
  }
};

export const getMarkerIcon = (status) => {
  switch (status) {
    case "OPEN":
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

    case "PENDING":
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";

    case "FIXED":
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

    default:
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  }
};

export const markerIcon = POTHOLE_MARKER_ICON;