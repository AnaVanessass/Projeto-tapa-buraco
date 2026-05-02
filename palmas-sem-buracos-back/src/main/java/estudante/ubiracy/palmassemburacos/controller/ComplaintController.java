package estudante.ubiracy.palmassemburacos.controller;

import estudante.ubiracy.palmassemburacos.dto.ComplaintDTO;
import estudante.ubiracy.palmassemburacos.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
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
}
