package estudante.ubiracy.palmassemburacos.repository;

import estudante.ubiracy.palmassemburacos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
   <T> Optional<T> findByUsername(String username, Class<T> type);

    <T> Optional<T> findByEmail(String email, Class<T> type);

    Boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
