package estudante.ubiracy.palmassemburacos.model.dto;

public record PotholeMapMarker(
        Long id,
        Double lat,
        Double lng,
        String status,
        boolean isMine
) {}

