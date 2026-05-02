package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.dto.ComplaintDTO;
import estudante.ubiracy.palmassemburacos.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.mapper.PotholeMapper;
import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.User;
import estudante.ubiracy.palmassemburacos.repository.ComplaintRepository;
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
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }

    public Complaint findById(Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
    }

    public PotholeResponse save(String email, ComplaintDTO complaint){
        Complaint c = mapper.toEntity(complaint);
        User user = userService.findByEmail(email).orElseThrow();
        c.setUser(user);
        Complaint novo = repo.save(c);
        return mapper.toResponse(novo);
    }

    public void delete(Complaint complaint){
        repo.delete(complaint);
    }
}
