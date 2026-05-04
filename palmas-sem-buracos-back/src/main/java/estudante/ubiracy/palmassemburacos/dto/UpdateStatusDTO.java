package estudante.ubiracy.palmassemburacos.dto;

import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;

public record UpdateStatusDTO(Long id, PotholeStatus status) {
}
