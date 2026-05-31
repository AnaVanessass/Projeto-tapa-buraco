package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.model.dto.UserResponseDTO;
import estudante.ubiracy.palmassemburacos.model.dto.UserUpdateDTO;
import estudante.ubiracy.palmassemburacos.model.User;
import estudante.ubiracy.palmassemburacos.model.enums.UserRole;
import estudante.ubiracy.palmassemburacos.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User createUser(String email, String username){
        User user = repository.findByEmail(email, User.class)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getUsername() != null) {
            throw new RuntimeException("Profile already completed");
        }

        if (repository.existsByUsername(username)) {
            throw new RuntimeException("Usuário indisponível");
        }

        user.setUsername(username);
        return repository.save(user);
    }

    public User processOAuthPostLogin(OAuth2User oAuth2User){
        String email = oAuth2User.getAttribute("email");

        Optional<User> existingUser = repository.findByEmail(email, User.class);

        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // Create incomplete user
        User user = new User();
        user.setEmail(email);
        user.setName(oAuth2User.getAttribute("name"));
        user.setRole(UserRole.CLIENT);
        user.setUsername(null);
        return repository.save(user);
    }

    public User findByUsername(String username) {
        return repository.findByUsername(username, User.class).orElseThrow();
    }

    public Optional<User> findByEmail(String email){
        return repository.findByEmail(email, User.class);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public User update(Long id, String email, UserUpdateDTO updateDTO) {
        User user = this.findById(id);
        if (user.getEmail().equals(email)) {
            throw new BadCredentialsException("Não é possível alterar dados de um usuário distinto da sessão atual");
        }
        if (updateDTO.newUsername() != null) {user.setUsername(updateDTO.newUsername());}
        if (updateDTO.role() != null ) {user.setRole(updateDTO.role());}
        return repository.save(user);
    }

    public User findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Page<UserResponseDTO> findAll(String search, Pageable pageable) {
        return repository.findAll(search, pageable);
    }

}
