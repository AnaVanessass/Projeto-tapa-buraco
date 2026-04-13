package estudante.ubiracy.palmassemburacos.service;

import estudante.ubiracy.palmassemburacos.model.Address;
import estudante.ubiracy.palmassemburacos.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    private final AddressRepository repository;

    public AddressService(AddressRepository repository) {
        this.repository = repository;
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

    public Address create(Address address) {
        return repository.save(address);
    }

    public Address update(Long id, Address address) {
        Address addr = this.findById(id);
        addr.setName(address.getName());
        addr.setLat(address.getLat());
        addr.setLon(address.getLon());
        addr.setCityBlock(address.getCityBlock());
        return repository.save(addr);
    }

    public List<Address> findByCityBlock(String cityBlock) {
        return repository.findByCityBlockContaining(cityBlock);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
