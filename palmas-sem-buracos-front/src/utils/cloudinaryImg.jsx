const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const getCloudinaryUrl = (publicId, width, height) => {
  if (!publicId) return "";

  const transformations = width && height ? `w_${width},h_${height},c_limit,f_auto,q_auto` : "w_240,h_240,c_limit,f_auto,q_auto";

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

export default getCloudinaryUrl;