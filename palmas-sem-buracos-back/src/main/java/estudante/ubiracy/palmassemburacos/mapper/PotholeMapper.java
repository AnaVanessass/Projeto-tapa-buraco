package estudante.ubiracy.palmassemburacos.mapper;

import estudante.ubiracy.palmassemburacos.dto.ComplaintDTO;
import estudante.ubiracy.palmassemburacos.dto.PotholeResponse;
import estudante.ubiracy.palmassemburacos.model.Address;
import estudante.ubiracy.palmassemburacos.model.Complaint;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import org.springframework.stereotype.Component;

@Component
public class PotholeMapper {
    public Complaint toEntity(ComplaintDTO req) {
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
        pothole.setAddress(address);

        return pothole;
    }

    public PotholeResponse toResponse(Complaint c) {
        return new PotholeResponse(
                c.getId(),
                c.getSize().name(),
                c.getSeverity().name(),
                c.getDescription(),
                c.getImageUrl(),
                c.getAddress().getLat(),
                c.getAddress().getLng(),
                c.getAddress().getCityBlock(),
                c.getAddress().getName(),
                c.getCreatedAt().toString()
        );
    }
}
