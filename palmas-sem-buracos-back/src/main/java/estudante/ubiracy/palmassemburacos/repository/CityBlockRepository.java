package estudante.ubiracy.palmassemburacos.repository;

import estudante.ubiracy.palmassemburacos.model.CityBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.locationtech.jts.geom.Point;
import java.util.Optional;

public interface CityBlockRepository extends JpaRepository<CityBlock, Long> {
    <T> Optional<T> findByIdPlace(String idPlace, Class<T> clazz);

    CityBlock findByName(String name);

    @Query(value = "SELECT * FROM city_block c " +
            "WHERE ST_Contains(c.coordinate, ST_GeomFromText(:wktPoint, 4326, 'axis-order=long-lat')) LIMIT 1", nativeQuery = true)
    Optional<CityBlock> findByCoordinateContaining(@Param("wktPoint") String wktPoint);
}
