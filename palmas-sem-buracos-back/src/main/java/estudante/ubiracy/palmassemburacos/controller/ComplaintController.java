package estudante.ubiracy.palmassemburacos.controller;

import estudante.ubiracy.palmassemburacos.model.dto.*;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import estudante.ubiracy.palmassemburacos.service.ComplaintService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    @GetMapping("/status")
    public ResponseEntity<List<PotholeResponse>> allByStatus(@RequestParam PotholeStatus status){
        List<PotholeResponse> complaints = service.allByStatus(status);
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<PotholeResponse>> searchPotholes(
            PotholeSearchFilter dto,
            @AuthenticationPrincipal String currentUserEmail,
            @PageableDefault Pageable pageable
    ) {
        Page<PotholeResponse> response = service.searchPotholes(dto, currentUserEmail, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/map-points")
    public ResponseEntity<List<PotholeMapMarker>> getMapPoints(@AuthenticationPrincipal String email) {
        List<PotholeMapMarker> markers = service.getMapMarkers(email);
        return ResponseEntity.ok(markers);
    }


    @GetMapping("/address")
    public ResponseEntity<List<PotholeResponse>> allByAddressContaining(@RequestParam String addressName){
        List<PotholeResponse> complaints = service.findByAddressNameContaining(addressName);
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @GetMapping("/address/page")
    public ResponseEntity<Page<PotholeResponse>> pagesByAddressContaining(
            @RequestParam String addressName,
            @PageableDefault Pageable pageable){
        Page<PotholeResponse> complaints = service.findPagesByAddressName(addressName, pageable);
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<PotholeResponse> create(@AuthenticationPrincipal String email, @RequestBody ComplaintDTO dto){
        PotholeResponse created = service.save(email, dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PotholeResponse> findById(@PathVariable Long id){
        PotholeResponse found = service.findById(id);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}")
    public ResponseEntity<PotholeResponse> updateStatus(@AuthenticationPrincipal String email,
                                                        @PathVariable Long id,
                                                        @RequestBody UpdateStatusDTO dto){
        PotholeResponse updated = service.updateStatus(id, dto);
        return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
    }
}
