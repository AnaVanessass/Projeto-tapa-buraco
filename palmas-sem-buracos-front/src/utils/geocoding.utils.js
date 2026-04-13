// Reverse geocoding to get address from coordinates
export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.results && data.results[0]) {
      return data.results[0].formatted_address;
    }
    return 'Endereço não encontrado';
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Endereço indisponível';
  }
};