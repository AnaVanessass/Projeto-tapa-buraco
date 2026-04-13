package estudante.ubiracy.palmassemburacos.dto;

import estudante.ubiracy.palmassemburacos.model.enums.UserRole;
import jakarta.validation.constraints.NotNull;

public record UserUpdateDTO(@NotNull String username, String newUsername, UserRole role) {
}
