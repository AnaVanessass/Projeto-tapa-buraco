package estudante.ubiracy.palmassemburacos.dto;

public record PotholeResponse(
        Long id,
        String size,
        String severity,
        String description,
        String imageUrl,
        Double lat,
        Double lng,
        String cityBlock,
        String address,
        String createdAt
){};