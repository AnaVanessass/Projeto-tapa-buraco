import api from './apiClient';

export const openCloudinaryWidget = (onSuccess) => {
  const folderName = 'pmwsb'

  if (!window.cloudinary) {
    console.error("Cloudinary not loaded yet");
    return;
  }

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
      apiKey: import.meta.env.VITE_CLOUDINARY_KEY,
      folder: folderName,
      uploadSignature: async (callback, paramsToSign) => {
        try {
          const { data } = await api.post('/cloudinary/sign', paramsToSign);
          callback(data.signature);
        } catch (err) {
          console.error("Erro na assinatura do Cloudinary", err);
        }
      },
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        onSuccess(result.info.public_id);
      }
    }
  );

  widget.open();
};