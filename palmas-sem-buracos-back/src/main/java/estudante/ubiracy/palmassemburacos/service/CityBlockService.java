package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.exception.ResourceNotFoundException;
import estudante.ubiracy.palmassemburacos.model.CityBlock;
import estudante.ubiracy.palmassemburacos.model.dto.CityBlockResponse;
import estudante.ubiracy.palmassemburacos.model.mapper.CityBlockMapper;
import estudante.ubiracy.palmassemburacos.repository.CityBlockRepository;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityBlockService {
    private final CityBlockRepository repo;
    private final CityBlockMapper mapper;
    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

    public CityBlockService(CityBlockRepository repo, CityBlockMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public CityBlock findByName(String name) {
        return repo.findByName(name.toLowerCase().trim());
    }

    public CityBlock findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Optional<CityBlock> findByIdPlace(String idPlace){
        return repo.findByIdPlace(idPlace, CityBlock.class);
    }
    public CityBlock create(String cityBlock) {
        var novo = repo.findByName(cityBlock);
        if(novo != null) {return novo;}

        CityBlock cb =  new CityBlock();
        cb.setName(cityBlock);

        return repo.save(cb);
    }

    public List<CityBlockResponse> findBlocks() {
        return repo.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public void save(CityBlock block) {
        repo.save(block);
    }

    public CityBlock findByLngLat(Double lng, Double lat) {
        String wktPoint = String.format("POINT(%f %f)", lng, lat);
        return repo.findByCoordinateContaining(wktPoint)
                .orElseThrow(() -> new ResourceNotFoundException("O ponto clicado fica fora das quadras mapeadas de Palmas."));
    }

}
