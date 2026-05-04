package estudante.ubiracy.palmassemburacos.model.mapper;

import estudante.ubiracy.palmassemburacos.model.dto.ComplaintDTO;
import estudante.ubiracy.palmassemburacos.model.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.model.Address;
import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import org.springframework.stereotype.Component;

@Component
public class PotholeMapper {
    public Complaint toNewEntity(ComplaintDTO req) {
        Address address = new Address();
        address.setName(req.address().name());
        address.setCityBlock(req.address().cityBlock());
        address.setLat(req.address().lat());
        address.setLng(req.address().lng());

        Complaint pothole = new Complaint();
        pothole.setSize(req.size());
        pothole.setSeverity(req.severity());
        pothole.setDescription(req.description());
        pothole.setStatus(PotholeStatus.OPEN);
        pothole.setImagePublicId(req.imagePublicId());
        pothole.setAddress(address);

        return pothole;
    }

    public Complaint toEntity(ComplaintDTO dto) {
        Address address = new Address();
        address.setName(dto.address().name());
        address.setCityBlock(dto.address().cityBlock());
        address.setLat(dto.address().lat());
        address.setLng(dto.address().lng());

        Complaint pothole = new Complaint();
        pothole.setSize(dto.size());
        pothole.setSeverity(dto.severity());
        pothole.setDescription(dto.description());
        pothole.setStatus(dto.status());
        pothole.setImagePublicId(dto.imagePublicId());
        pothole.setAddress(address);

        return pothole;
    }

    public PotholeResponse toResponse(Complaint c) {
        return new PotholeResponse(
                c.getId(),
                c.getSize().name(),
                c.getSeverity().name(),
                c.getDescription(),
                c.getImagePublicId(),
                c.getAddress().getLat(),
                c.getAddress().getLng(),
                c.getAddress().getCityBlock(),
                c.getAddress().getName(),
                c.getCreatedAt().toString()
        );
    }
}
