package estudante.ubiracy.palmassemburacos.controller;

import estudante.ubiracy.palmassemburacos.model.User;
import estudante.ubiracy.palmassemburacos.model.dto.UserAuthDTO;
import estudante.ubiracy.palmassemburacos.model.dto.UserResponseDTO;
import estudante.ubiracy.palmassemburacos.model.dto.UserUpdateDTO;
import estudante.ubiracy.palmassemburacos.model.enums.UserRole;
import estudante.ubiracy.palmassemburacos.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/")
    public ResponseEntity<Page<UserResponseDTO>> getAllUsers(String search, @PageableDefault Pageable pageable) {
        Page<UserResponseDTO> list = userService.findAll(search, pageable);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@AuthenticationPrincipal String email,
                                           @PathVariable Long id, UserUpdateDTO dto) {
        User user = userService.update(id, email, dto);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/role")
    public ResponseEntity<User> updateRole(@PathVariable Long id,
                                           @RequestBody UserRole newRole) {
        var user = userService.updateUserRole(id, newRole);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @PostMapping("/complete-profile")
    public ResponseEntity<User> createUser(@AuthenticationPrincipal String email, @RequestBody Map<String, String> body) {
        User user = userService.createUser(email, body.get("username"));
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserAuthDTO> me(@AuthenticationPrincipal String email) {
        var user = userService.findByEmailForAuth(email);
        return ResponseEntity.ok(user);
    }
}
