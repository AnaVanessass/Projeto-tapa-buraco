package estudante.ubiracy.palmassemburacos.model.dto;

public record PotholeResponse(
        Long id,
        String imagePublicId,
        Double lat,
        Double lng,
        String blockName,
        String address,
        String createdAt,
        String blockIdPlace,
        String status
){};