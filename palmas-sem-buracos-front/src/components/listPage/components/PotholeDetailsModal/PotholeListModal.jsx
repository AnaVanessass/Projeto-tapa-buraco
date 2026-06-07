import { deletePothole } from "../../../../service/potholeService";
import getCloudinaryUrl from "../../../../utils/cloudinaryImg";
import { createPortal } from "react-dom";
import { useState } from "react";

export default function PotholeDetailsModal(
    {selectedPothole, setSelectedPothole, deletePothole, isDeleting}
) {
    const [isConfirming, setIsConfirming] = useState(false);

    const getStatusLabel = (status) => {
        const labels = {
        'PENDING': 'Em Analise',
        'OPEN': 'Aberto',
        'FIXED': 'Resolvido'
        };
        return labels[status] || 'Aguardando';
    };

    const getElapsedTime = (dateString) => {
        const createdDate = new Date(dateString);
        const now = new Date();
        
        // Calcula a diferença em milissegundos
        const diffInMs = now - createdDate;
        
        // Conversões de tempo básicas
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInMonths = Math.floor(diffInDays / 30);

        // Inicializa o formatador nativo em Português
        const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

        // Retorna a unidade de tempo ideal baseada no quão antigo é
        if (diffInMinutes < 1) return "Agora mesmo";
        if (diffInMinutes < 60) return rtf.format(-diffInMinutes, "minute");
        if (diffInHours < 24) return rtf.format(-diffInHours, "hour");
        if (diffInDays < 30) return rtf.format(-diffInDays, "day");
        
        return rtf.format(-diffInMonths, "month");
    };

    return createPortal(
    <div className="pothole-modal-backdrop" onClick={() => setSelectedPothole(null)}>
        <div className="pothole-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
                <span className={`status-badge ${selectedPothole.status.toLowerCase()}`}>
                    {getStatusLabel(selectedPothole.status)}
                </span>
                <button className="close-btn" onClick={() => setSelectedPothole(null)}>
                    Fechar
                </button>
            </header>
            <div className="modal-content">
                {selectedPothole.imagePublicId ? (
                    <img
                        src={getCloudinaryUrl(selectedPothole.imagePublicId, 350, 350) || []}
                        alt="Foto buraco na via"
                    />
                ):(
                    <div className="img-placeholder"></div>
                )}

                <div className="modal-info">
                    <h3>{selectedPothole.address}</h3>
                    <p>{selectedPothole.blockName}</p>
                    <p>{getElapsedTime(selectedPothole.createdAt)}</p>
                </div>
                <footer className="modal-actions">
                    {!isConfirming ? (
                        <button className="delete-btn" onClick={() => setIsConfirming(true)}>
                            Deletar Registro
                        </button>
                    ) : (
                        <div className="confirmation-box">
                            <p>Tem certeza que deseja excluir esta denúncia?</p>
                            <div className="confirmation-buttons">
                                <button 
                                className="confirm-yes-btn"
                                disabled={isDeleting} 
                                onClick={() => {
                                    deletePothole(selectedPothole.id);
                                    setSelectedPothole(null);   
                                }}>
                                    {isDeleting ? "Deletando..." : "Sim, Deletar"}
                                </button>
                                <button className="confirm-no-btn" onClick={() => setIsConfirming(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </footer>
            </div>
        </div>
    </div>,
    document.body
    )
};