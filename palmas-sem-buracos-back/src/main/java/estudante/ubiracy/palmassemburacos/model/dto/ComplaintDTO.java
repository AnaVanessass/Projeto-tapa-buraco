package estudante.ubiracy.palmassemburacos.model.dto;

import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;

public record ComplaintDTO(PotholeStatus status,
                           String imagePublicId,
                           AddressDTO address) {
}
