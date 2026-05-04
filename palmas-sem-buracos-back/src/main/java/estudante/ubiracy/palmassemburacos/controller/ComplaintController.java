package estudante.ubiracy.palmassemburacos.controller;

import estudante.ubiracy.palmassemburacos.dto.UpdateStatusDTO;
import estudante.ubiracy.palmassemburacos.model.dto.ComplaintDTO;
import estudante.ubiracy.palmassemburacos.model.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    private final ComplaintService service;

    public ComplaintController(ComplaintService service){
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity<List<PotholeResponse>> allComplaints(){
        List<PotholeResponse> complaints = service.allComplaints();
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<PotholeResponse> create(@AuthenticationPrincipal String email, @RequestBody ComplaintDTO dto){
        PotholeResponse created = service.save(email, dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/changeStatus")
    public ResponseEntity<PotholeResponse> updateStatus(@AuthenticationPrincipal String email,
                                                        @RequestBody UpdateStatusDTO dto){
        PotholeResponse updated = service.updateStatus(dto);
        return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
    }
}
