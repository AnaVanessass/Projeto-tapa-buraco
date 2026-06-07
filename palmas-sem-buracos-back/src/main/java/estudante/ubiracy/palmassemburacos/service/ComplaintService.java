package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.User;
import estudante.ubiracy.palmassemburacos.model.dto.*;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import estudante.ubiracy.palmassemburacos.model.enums.UserRole;
import estudante.ubiracy.palmassemburacos.model.mapper.PotholeMapper;
import estudante.ubiracy.palmassemburacos.repository.ComplaintRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ComplaintService {
    private final ComplaintRepository repo;
    private final UserService userService;
    private final PotholeMapper mapper;

    public ComplaintService(ComplaintRepository repo, UserService userService, PotholeMapper mapper){
        this.repo = repo;
        this.userService = userService;
        this.mapper = mapper;
    }

    public List<PotholeResponse> allComplaints(){
        return repo.findAllByIsDeletedFalse()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public PotholeResponse findById(Long id){
        var complaint = repo.findById(id).orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
        return mapper.toResponse(complaint);
    }

    public PotholeResponse save(String email, ComplaintDTO complaint){
        Complaint c = mapper.toNewEntity(complaint);
        User user = userService.findByEmail(email).orElseThrow();
        c.setUser(user);
        Complaint novo = repo.save(c);
        return mapper.toResponse(novo);
    }

    @Transactional
    public void delete(Long id){
        Complaint c = repo.findById(id).orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
        c.setDeleted(true);
        repo.save(c);
    }

    public PotholeResponse updateStatus(Long id, UpdateStatusDTO dto) {
        Complaint c = repo.findById(id).orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
        if (dto.status() == null) {throw new RuntimeException("Status inválido");}
        c.setStatus(dto.status());
        repo.save(c);
        return mapper.toResponse(c);
    }


    public List<PotholeResponse> allByStatus(PotholeStatus status) {
        return repo.findByStatus(status)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<PotholeResponse> findByAddressNameContaining(String addressName) {
        return repo.findByAddressNameContainingAndIsDeletedFalse(addressName)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public Page<PotholeResponse> findPagesByAddressName(String addressName, Pageable pageable) {
        return repo.findByAddressNameContainingAndIsDeletedFalse(addressName, pageable)
                .map(mapper::toResponse);
    }

    public Page<PotholeResponse> searchPotholes(
            PotholeSearchFilter dto,
            String currentUserEmail,
            Pageable pageable
    ) {
        var user = userService.findByEmail(currentUserEmail).orElseThrow();
        Long userId = user.getId();
        String userRole = user.getRole().name();
        String addrFilter = (dto.address() != null && !dto.address().isBlank()) ? dto.address() : null;
        String blockFilter = (dto.blockName() != null && !dto.blockName().isBlank()) ? dto.blockName() : null;

        Page<Complaint> complaints = repo.findByOptionalFilters(
                userId, userRole, addrFilter, dto.status(), blockFilter,
                dto.startDate(), dto.endDate(), pageable
        );

        return complaints.map(mapper::toResponse);
    }

    public List<PotholeResponse> getMapMarkers(String email) {
        var user = userService.findByEmail(email).orElse(null);
        Long userId = null;
        String userRole = null;

        if (user != null) {
            userId = user.getId();
            userRole = user.getRole().name();
        }

        return repo.findActiveMapMarkers(userId, userRole);
    }

    public TotaisHeader totalComplaintsAndTotalByUser(String email) {
        var user = userService.findByEmail(email).orElse(null);
        Long userId = null;
        if (user != null) {userId = user.getId();}
        return repo.totalComplaintsAndComplaintByUserId(userId);
    }
}
