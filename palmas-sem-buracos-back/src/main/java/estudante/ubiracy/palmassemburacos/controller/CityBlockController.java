package estudante.ubiracy.palmassemburacos.controller;

import estudante.ubiracy.palmassemburacos.model.CityBlock;
import estudante.ubiracy.palmassemburacos.model.dto.CityBlockDTO;
import estudante.ubiracy.palmassemburacos.model.dto.CityBlockResponse;
import estudante.ubiracy.palmassemburacos.model.mapper.CityBlockMapper;
import estudante.ubiracy.palmassemburacos.service.CityBlockService;
import estudante.ubiracy.palmassemburacos.service.ScraperService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blocks")
public class CityBlockController {
    private final CityBlockService service;
    private final CityBlockMapper mapper;
    private final ScraperService scraperService;

    public CityBlockController(CityBlockService service, CityBlockMapper mapper, ScraperService scraperService) {
        this.service = service;
        this.mapper = mapper;
        this.scraperService = scraperService;
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

    @GetMapping("/scrape")
    public ResponseEntity<String> scrape() {
        scraperService.runPythonGeoScraper();
        return new ResponseEntity<>("Done", HttpStatus.OK);
    }

}
