package estudante.ubiracy.palmassemburacos.model.mapper;

import estudante.ubiracy.palmassemburacos.model.CityBlock;
import estudante.ubiracy.palmassemburacos.model.dto.CityBlockResponse;
import estudante.ubiracy.palmassemburacos.repository.CityBlockRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CityBlockMapper {
    private final CityBlockRepository repo;

    public CityBlockMapper(CityBlockRepository repo) {
        this.repo = repo;
    }

    public CityBlock toEntity(CityBlockResponse req) {
        return repo.findByIdPlace(req.idPlace(), CityBlock.class).orElse(null);
    }

    public CityBlockResponse toResponse(CityBlock cb){
        return new CityBlockResponse(cb.getIdPlace(), cb.getName(), convertPolygonToList(cb.getCoordinate()));
    }

    public static List<List<Double[]>> convertPolygonToList(Polygon polygon) {
        if (polygon == null) {
            return null;
        }

        List<List<Double[]>> geoJsonCoordinates = new ArrayList<>();

        // 1. Mapeia o anel externo (as bordas da quadra)
        LineString exteriorRing = polygon.getExteriorRing();
        geoJsonCoordinates.add(extractCoords(exteriorRing));

        // 2. Mapeia os anéis internos (caso a quadra possua "buracos" / praças internas vazadas)
        int numInteriorRings = polygon.getNumInteriorRing();
        for (int i = 0; i < numInteriorRings; i++) {
            LineString interiorRing = polygon.getInteriorRingN(i);
            geoJsonCoordinates.add(extractCoords(interiorRing));
        }

        return geoJsonCoordinates;
    }

    private static List<Double[]> extractCoords(LineString lineString) {
        List<Double[]> coordinateList = new ArrayList<>();

        for (Coordinate coord : lineString.getCoordinates()) {
            // GeoJSON especifica a ordem obrigatoriamente como [Longitude, Latitude]
            Double[] point = new Double[]{ coord.getX(), coord.getY() };
            coordinateList.add(point);
        }

        return coordinateList;
    }
}
