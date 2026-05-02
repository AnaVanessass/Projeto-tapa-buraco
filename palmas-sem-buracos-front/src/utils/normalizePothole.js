export const normalizePothole = (p) => ({
  ...p,
  lat: p.lat ?? p.address?.lat,
  lng: p.lng ?? p.address?.lng,
  cityBlock: p.cityBlock ?? p.address?.cityBlock,
  address: p.address?.name ?? p.address,
});
