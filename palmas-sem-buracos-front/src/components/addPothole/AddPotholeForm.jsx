import { useState, useEffect } from 'react';
import { getAddressFromCoordinates } from '../../utils/geocoding.utils';
import { PotholeSize, PotholeSeverity } from '../../types/pothole.types';
import './AddPothole.css';
import { openCloudinaryWidget } from '../../service/imgUpload';

const AddPotholeForm = ({ location, onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    lat: location.lat,
    lng: location.lng,
    address: '',
    cityBlock: '',
    size: PotholeSize.MEDIUM,
    severity: PotholeSeverity.MEDIUM,
    description: '',
    imagePublicId:''
  });

  const [isPending, setIsPending] = useState(true);

  
  useEffect(() => {
    const fetchAddress = async () => {
      setIsPending(true);
      const address = await getAddressFromCoordinates(location.lat, location.lng);
      setFormData(prev => ({
        ...prev,
        address,
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
      size: formData.size,
      severity: formData.severity,
      description: formData.description,
      status: "OPEN",
      imagePublicId:formData.imagePublicId,

      address: {
        name: formData.address,
        cityBlock: formData.cityBlock,
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
            placeholder='Avenida NS 5'
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={isPending}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cityBlock">Quadra:</label>
          <input
            type="text"
            id="cityBlock"
            name="cityBlock"
            value={formData.cityBlock}
            onChange={handleChange}
            placeholder="ex: 1005 Sul"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="size">Tamanho:</label>
          <select id="size" name="size" value={formData.size} onChange={handleChange}>
            <option value={PotholeSize.SMALL}>Pequeno (Até 10CM)</option>
            <option value={PotholeSize.MEDIUM}>Médio (Até 30CM)</option>
            <option value={PotholeSize.LARGE}>Grande (Acima de 30CM)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="severity">Gravidade:</label>
          <select id="severity" name="severity" value={formData.severity} onChange={handleChange}>
            <option value={PotholeSeverity.LOW}>Baixa</option>
            <option value={PotholeSeverity.MEDIUM}>Média</option>
            <option value={PotholeSeverity.HIGH}>Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            placeholder='ex: Buraco na rotátoria'
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleImgUpload}>Anexar Foto</button>
          <button type="submit" disabled={isPending}>{isPending ? 'Carregando...' : 'Denunciar'}</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddPotholeForm;