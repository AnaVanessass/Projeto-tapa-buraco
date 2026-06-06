import getCloudinaryUrl from "../../../utils/cloudinaryImg";

export default function PotholeDetailsModal({selectedPothole, setSelectedPothole}) {
    const getStatusLabel = (status) => {
        const labels = {
        'PENDING': 'Em Analise',
        'OPEN': 'Aberto',
        'FIXED': 'Resolvido'
        };
        return labels[status] || 'Aguardando';
    };

    return (
    <div className="pothole-modal-backdrop">
        <div className="pothole-modal">
        <button onClick={() => setSelectedPothole(null)}>
            Fechar
        </button>

        <img
            src={getCloudinaryUrl(selectedPothole.imagePublicId) || []}
            alt=""
        />

        <h3>{selectedPothole.address}</h3>

        <span className={`status-badge ${selectedPothole.status.toLowerCase()}`}>
            {getStatusLabel(selectedPothole.status)}
        </span>
        </div>
    </div>
    )
};