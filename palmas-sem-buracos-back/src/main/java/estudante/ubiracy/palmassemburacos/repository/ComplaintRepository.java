package estudante.ubiracy.palmassemburacos.repository;

import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.dto.PotholeMapMarker;
import estudante.ubiracy.palmassemburacos.model.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.model.dto.TotaisHeader;
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
import java.util.Map;

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
            "AND (:isAdmin = 'ADMIN' OR c.user.Id = :currentUserId) " +
            "AND (:address IS NULL OR LOWER(c.address.name) LIKE LOWER(CONCAT('%', :address, '%'))) " +
            "AND (:status IS NULL OR c.status = :status) " +
            "AND (:blockName IS NULL OR LOWER(c.address.cityBlock.name) LIKE LOWER(CONCAT('%', :blockName, '%')))"+
            "AND (cast(:startDate as timestamp) IS NULL OR c.createdAt >= :startDate) " +
            "AND (cast(:endDate as timestamp) IS NULL OR c.createdAt <= :endDate)")

    Page<Complaint> findByOptionalFilters(
            @Param("currentUserId") Long currentUserId,
            @Param("isAdmin") String isAdmin,
            @Param("address") String address,
            @Param("status") PotholeStatus status,
            @Param("blockName") String blockName,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable
    );

    @EntityGraph(attributePaths = {"address", "address.cityBlock"})
    @Query("SELECT new estudante.ubiracy.palmassemburacos.model.dto.PotholeResponse(" +
            "c.Id, c.imagePublicId, a.lat, a.lng, cb.name," +
            " a.name,CAST(c.createdAt as string), cb.idPlace, CAST(c.status as string)) " +
            "FROM Complaint c LEFT JOIN c.address a LEFT JOIN a.cityBlock cb" +
            " WHERE c.isDeleted = false " +
            "AND (:isAdmin = 'ADMIN' OR c.user.Id = :currentUserId OR c.status != 'PENDING')")
    List<PotholeResponse> findActiveMapMarkers(
            @Param("currentUserId") Long currentUserId,
            @Param("isAdmin")String role
            );

    @Query("SELECT new estudante.ubiracy.palmassemburacos.model.dto.TotaisHeader(" +
            "COUNT(c.isDeleted) AS total, " +
            "SUM(CASE WHEN c.user.Id = :currentUserId THEN 1 ELSE 0 END) AS totalUsuario," +
            "SUM(CASE WHEN c.status = 'OPEN' THEN 1 ELSE 0 END) AS aberto, " +
            "SUM(CASE WHEN c.status = 'PENDING' THEN 1 ELSE 0 END) AS emAndamento," +
            "SUM(CASE WHEN c.status = 'FIXED' THEN 1 ELSE 0 END) AS resolvido) " +
            "FROM Complaint c WHERE c.isDeleted = false")
    TotaisHeader totalComplaintsAndComplaintByUserId(Long currentUserId);
}
