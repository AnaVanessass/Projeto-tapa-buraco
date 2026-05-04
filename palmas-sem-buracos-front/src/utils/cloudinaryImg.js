import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import api from "../service/apiClient";

const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_NAME }
});

const MyImage = ({ publicId }) => {
  // Reconstrói a URL e adiciona otimizações automáticas
  const myImage = cld.image(publicId);
  myImage.resize(fill().width(400).height(400));

  return <AdvancedImage cldImg={myImage} />;
};


