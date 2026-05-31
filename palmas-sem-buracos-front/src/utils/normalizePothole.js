export const normalizePothole = (p) => {
  return {
    ...p,
    lat: Number(p.lat ?? p.address?.lat),
    lng: Number(p.lng ?? p.address?.lng),
    address: p.address.split(', Palmas')[0] || "Via não informada",
  };
};
