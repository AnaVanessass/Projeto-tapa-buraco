package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ComplaintService {
    private final ComplaintRepository repository;

    public ComplaintService(ComplaintRepository repository) {
        this.repository = repository;
    }

    public Complaint create(Complaint complaint) {
        return repository.save(complaint);
    }

    public Complaint update(Complaint complaint) {
        return repository.save(complaint);
    }
    public void delete(Complaint complaint) {
        repository.delete(complaint);
    }

    public Complaint findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Set<Complaint> findAll() {
        return new HashSet<>(repository.findAll());
    }
}
