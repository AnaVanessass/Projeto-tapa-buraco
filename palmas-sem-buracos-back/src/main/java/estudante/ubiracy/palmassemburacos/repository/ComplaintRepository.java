package estudante.ubiracy.palmassemburacos.repository;

import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.dto.PotholeMapMarker;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import estudante.ubiracy.palmassemburacos.model.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    @EntityGraph(attributePaths = {"address", "address.cityBlock"})
    List<Complaint> findByStatus(PotholeStatus status);
    @EntityGraph(attributePaths = {"address", "address.cityBlock"})
    List<Complaint> findByAddressNameContainingAndIsDeletedFalse(String addressName);
    @EntityGraph(attributePaths = {"address", "address.cityBlock"})
    List<Complaint> findAllByIsDeletedFalse();
    @EntityGraph(attributePaths = {"address", "address.cityBlock"})
    Page<Complaint> findByAddressNameContainingAndIsDeletedFalse(String addressName, Pageable pageable);

    @EntityGraph(attributePaths = {"address", "address.cityBlock"})
    @Query("SELECT c FROM Complaint c WHERE " +
            "c.isDeleted = false " +
            "AND (:isAdmin = 'ADMIN' OR c.user.Id = :currentUserId OR c.status != 'PENDING') " +
            "AND (:address IS NULL OR LOWER(c.address.name) LIKE LOWER(CONCAT('%', :address, '%'))) " +
            "AND (:status IS NULL OR c.status = :status) " +
            "AND (:blockName IS NULL OR LOWER(c.address.cityBlock.name) LIKE LOWER(CONCAT('%', :blockName, '%')))"+
            "AND (cast(:startDate as timestamp) IS NULL OR c.createdAt >= :startDate) " +
            "AND (cast(:endDate as timestamp) IS NULL OR c.createdAt <= :endDate)")

    Page<Complaint> findByOptionalFilters(
            @Param("currentUserId") Long currentUserId,
            @Param("isAdmin") UserRole isAdmin,
            @Param("address") String address,
            @Param("status") PotholeStatus status,
            @Param("blockName") String blockName,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable
    );

    @Query("SELECT new estudante.ubiracy.palmassemburacos.model.dto.PotholeMapMarker(" +
            "c.Id, c.address.lat, c.address.lng, CAST(c.status as string), " +
            "CASE WHEN c.user.Id = :currentUserId THEN true ELSE false END) " +
            "FROM Complaint c " +
            "WHERE c.isDeleted = false " +
            "AND (:isAdmin = 'ADMIN' OR c.user.Id = :currentUserId OR c.status != 'PENDING')")
    List<PotholeMapMarker> findActiveMapMarkers(
            @Param("currentUserId") Long currentUserId,
            @Param("isAdmin")UserRole role
            );

}
