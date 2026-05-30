package estudante.ubiracy.palmassemburacos.repository;

import estudante.ubiracy.palmassemburacos.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByNameContaining(String name);
    List<Address> findByCityBlockContaining(String cityBlock);
    @Query("SELECT a.cityBlock FROM Address a")
    List<String> findAllCityBlocks();
}
