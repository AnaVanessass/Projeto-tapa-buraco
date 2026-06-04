import { useState, useEffect } from 'react';
import { getAddressFromCoordinates } from '../../../utils/geocoding.utils';
import { PotholeSize, PotholeSeverity } from '../../../types/pothole.types';
import './AddPothole.css';
import { openCloudinaryWidget } from '../../../service/imgUpload';

const AddPotholeForm = ({ location, onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    lat: location.lat,
    lng: location.lng,
    address: '',
    imagePublicId:''
  });

  const [isPending, setIsPending] = useState(true);

  
  useEffect(() => {
    const fetchAddress = async () => {
      setIsPending(true);
      const address = await getAddressFromCoordinates(location.lat, location.lng);
      setFormData(prev => ({
        ...prev,
        address: address,
        lat: Number(location.lat),
        lng: Number(location.lng)
      }));
      setIsPending(false);
    };

    fetchAddress();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      status: "OPEN",
      imagePublicId:formData.imagePublicId,

      address: {
        name: formData.address,
        lat: formData.lat,
        lng: formData.lng,
      }
    };
    onAdd(payload);
  };

  const handleImgUpload = () => {
    openCloudinaryWidget((publicId) => {
      console.log("Recebi o ID:", publicId);
      setFormData(prev => ({...prev, imagePublicId: publicId}))
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="add-pothole-form">
      <h3>Denunciar buraco no asfalto</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">Endereço:</label>
          <input
            placeholder='Buscando Endereço...'
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={isPending}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleImgUpload} className="btn-secondary-sm">
            {formData.imagePublicId ? '✅ Foto Anexada' : '📷 Anexar Foto'}
          </button>
          <button type="submit" disabled={isPending} className="btn-action-primary">
            {isPending ? 'Carregando...' : 'Enviar Denúncia'}
          </button>
          <button type="button" onClick={onCancel} className="modal-btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPotholeForm;