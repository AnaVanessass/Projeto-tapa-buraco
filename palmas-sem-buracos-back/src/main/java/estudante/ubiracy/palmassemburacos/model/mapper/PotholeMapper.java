package estudante.ubiracy.palmassemburacos.model.mapper;

import estudante.ubiracy.palmassemburacos.model.Address;
import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.dto.ComplaintDTO;
import estudante.ubiracy.palmassemburacos.model.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import estudante.ubiracy.palmassemburacos.service.AddressService;
import org.springframework.stereotype.Component;

@Component
public class PotholeMapper {
    private final AddressService addressService;

    public PotholeMapper(AddressService addressService) {
        this.addressService = addressService;
    }

    public Complaint toNewEntity(ComplaintDTO req) {
        Address address = addressService.create(req.address());

        Complaint pothole = new Complaint();
        pothole.setStatus(PotholeStatus.OPEN);
        pothole.setImagePublicId(req.imagePublicId());
        pothole.setAddress(address);

        return pothole;
    }

    public Complaint toEntity(ComplaintDTO dto) {
        Address address = addressService.create(dto.address());

        Complaint pothole = new Complaint();
        pothole.setStatus(dto.status());
        pothole.setImagePublicId(dto.imagePublicId());
        pothole.setAddress(address);

        return pothole;
    }

    public PotholeResponse toResponse(Complaint c) {
        return new PotholeResponse(
                c.getId(),
                c.getImagePublicId(),
                c.getAddress().getLat(),
                c.getAddress().getLng(),
                c.getAddress().getCityBlock().getName(),
                c.getAddress().getName(),
                c.getCreatedAt().toString()
        );
    }
}
