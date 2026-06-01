package estudante.ubiracy.palmassemburacos.repository;

import estudante.ubiracy.palmassemburacos.model.User;
import estudante.ubiracy.palmassemburacos.model.dto.UserAuthDTO;
import estudante.ubiracy.palmassemburacos.model.dto.UserResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
   <T> Optional<T> findByUsername(String username, Class<T> type);

    <T> Optional<T> findByEmail(String email, Class<T> type);

    Boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    @Query("SELECT new estudante.ubiracy.palmassemburacos.model.dto.UserResponseDTO(" +
            "u.Id, u.username, u.name, u.email, CAST(u.role as string)) " +
            "FROM User u WHERE" +
            "(:search IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<UserResponseDTO> findAll(@Param("search") String search, Pageable pageable);
}
