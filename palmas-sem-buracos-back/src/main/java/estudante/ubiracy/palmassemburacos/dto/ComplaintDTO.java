package estudante.ubiracy.palmassemburacos.dto;

import estudante.ubiracy.palmassemburacos.model.enums.PotholeSeverity;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeSize;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;

public record ComplaintDTO(PotholeSize size,
                           PotholeSeverity severity,
                           PotholeStatus status,
                           String description,
                           AddressDTO address) {
}
