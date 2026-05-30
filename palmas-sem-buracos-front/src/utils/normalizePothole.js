export const normalizePothole = (p) => {
  // Converte a geometria do backend (GeoJSON) para o formato do Google Maps Paths
  // Ignora o primeiro nível de array se o banco retornar a estrutura padrão de Polygon Multi-Array
  const googlePolygonCoords = p.cityBlock?.coordinate?.coordinates?.[0]?.map(coord => ({
    lng: coord[0], // GeoJSON primeiro traz Longitude
    lat: coord[1]  // Depois Latitude
  })) || [];

  return {
    ...p,
    lat: Number(p.lat ?? p.address?.lat),
    lng: Number(p.lng ?? p.address?.lng),
    cityBlock: p.cityBlock 
          ? String(p.cityBlock.name).toLowerCase().replace("quadra", "").trim() 
          : "",
    // Dados prontos para o Google Maps desenhar se necessário
    cityBlockCoords: googlePolygonCoords, 
    address: p.address || "Via não informada",
  };
};
