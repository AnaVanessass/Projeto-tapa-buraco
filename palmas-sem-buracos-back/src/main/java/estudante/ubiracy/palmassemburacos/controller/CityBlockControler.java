package estudante.ubiracy.palmassemburacos.controller;

import estudante.ubiracy.palmassemburacos.model.CityBlock;
import estudante.ubiracy.palmassemburacos.model.dto.CityBlockDTO;
import estudante.ubiracy.palmassemburacos.model.dto.CityBlockResponse;
import estudante.ubiracy.palmassemburacos.model.mapper.CityBlockMapper;
import estudante.ubiracy.palmassemburacos.service.CityBlockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller("/api/blocks")
public class CityBlockControler {
    private final CityBlockService service;
    private final CityBlockMapper mapper;

    public CityBlockControler(CityBlockService service, CityBlockMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public ResponseEntity<List<CityBlockResponse>> findAllBlocks() {
        var blocks = service.findBlocks();
        return ResponseEntity.ok(blocks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityBlock> findById(@PathVariable Long id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @GetMapping("/name")
    public ResponseEntity<CityBlock> findByName(@RequestParam String name) {
        return new ResponseEntity<>(service.findByName(name), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<CityBlockResponse> save(@RequestBody CityBlockDTO cityBlock) {
        var cb = service.create(cityBlock.name());
        return new ResponseEntity<>(mapper.toResponse(cb), HttpStatus.CREATED);
    }

}
