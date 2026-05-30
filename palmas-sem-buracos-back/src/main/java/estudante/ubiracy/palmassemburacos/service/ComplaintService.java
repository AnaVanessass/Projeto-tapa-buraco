package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.User;
import estudante.ubiracy.palmassemburacos.model.dto.ComplaintDTO;
import estudante.ubiracy.palmassemburacos.model.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.model.dto.UpdateStatusDTO;
import estudante.ubiracy.palmassemburacos.model.mapper.PotholeMapper;
import estudante.ubiracy.palmassemburacos.repository.ComplaintRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return repo.findAll()
                .stream()
                .filter(r -> !r.isDeleted())
                .map(mapper::toResponse)
                .toList();
    }

    public Complaint findById(Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
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
        Complaint c = this.findById(id);
        c.setDeleted(true);
        repo.save(c);
    }

    public PotholeResponse updateStatus(UpdateStatusDTO dto) {
        Complaint c = this.findById(dto.id());
        c.setStatus(dto.status());
        repo.save(c);
        return mapper.toResponse(c);
    }


}
