import { deletePothole } from "../../../../service/potholeService";
import getCloudinaryUrl from "../../../../utils/cloudinaryImg";
import { createPortal } from "react-dom";

export default function PotholeDetailsModal({selectedPothole, setSelectedPothole, deletePothole}) {
    const getStatusLabel = (status) => {
        const labels = {
        'PENDING': 'Em Analise',
        'OPEN': 'Aberto',
        'FIXED': 'Resolvido'
        };
        return labels[status] || 'Aguardando';
    };

    return createPortal(
    <div className="pothole-modal-backdrop">
        <div className="pothole-modal">
        <button onClick={() => setSelectedPothole(null)}>
            Fechar
        </button>
        <button onClick={() => {deletePothole(selectedPothole.id); setSelectedPothole(null)}}>
            Deletar
        </button>

        <img
            src={getCloudinaryUrl(selectedPothole.imagePublicId, 350, 350) || []}
            alt=""
        />

        <h3>{selectedPothole.address}</h3>
        <p>Quadra: {selectedPothole.blockName}</p>
        <p>Criado em: {new Date(selectedPothole.createdAt).toLocaleDateString("pt-br")}</p>


        <span className={`status-badge ${selectedPothole.status.toLowerCase()}`}>
            {getStatusLabel(selectedPothole.status)}
        </span>
        </div>
    </div>,
    document.body
    )
};