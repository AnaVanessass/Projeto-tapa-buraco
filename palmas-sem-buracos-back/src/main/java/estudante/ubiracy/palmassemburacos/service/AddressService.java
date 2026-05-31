package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.model.Address;
import estudante.ubiracy.palmassemburacos.model.dto.AddressDTO;
import estudante.ubiracy.palmassemburacos.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    private final AddressRepository repository;
    private final CityBlockService cityBlockService;

    public AddressService(AddressRepository repository, CityBlockService cityBlockService) {
        this.repository = repository;
        this.cityBlockService = cityBlockService;
    }

    public List<Address> findAll() {
        return repository.findAll();
    }

    public List<Address> findByName(String name) {
        return repository.findByNameContaining(name);
    }

    public Address findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Address create(AddressDTO dto) {
        Address address = new Address();
        var name = dto.name().trim();
        var cb = cityBlockService.findByLngLat(dto.lng(),  dto.lat());

        address.setLng(dto.lng());
        address.setLat(dto.lat());
        address.setName(name);
        address.setCityBlock(cb);

        return repository.save(address);
    }

    public Address update(Long id, Address address) {
        Address addr = this.findById(id);
        addr.setName(address.getName());
        return repository.save(addr);
    }

    public List<Address> findByCityBlock(String cityBlock) {
        return repository.findByCityBlockContaining(cityBlock);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}
