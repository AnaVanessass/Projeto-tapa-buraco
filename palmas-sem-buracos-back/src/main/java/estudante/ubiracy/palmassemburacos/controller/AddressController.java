package estudante.ubiracy.palmassemburacos.controller;

import estudante.ubiracy.palmassemburacos.model.Address;
import estudante.ubiracy.palmassemburacos.model.dto.AddressDTO;
import estudante.ubiracy.palmassemburacos.service.AddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    private final AddressService service;

    public AddressController(AddressService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Address>> findAll() {
        List<Address> addresses = service.findAll();
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/searchbyname")
    public ResponseEntity<List<Address>> findByName(@RequestParam String name) {
        List<Address> addresses = service.findByName(name);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/searchbyblock")
    public ResponseEntity<List<Address>> findByCityBlock(@RequestParam String cityBlock) {
        List<Address> addresses = service.findByCityBlock(cityBlock);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> findById(@PathVariable Long id) {
        Address address = service.findById(id);
        return ResponseEntity.ok(address);
    }

    @PostMapping("/create")
    public ResponseEntity<Address> save(@RequestBody AddressDTO address) {
        Address addr = service.create(address);
        return ResponseEntity.ok(addr);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<Address> update(@PathVariable Long id, @RequestBody Address address) {
        Address addr = service.update(id, address);
        return ResponseEntity.ok(addr);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Address> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
