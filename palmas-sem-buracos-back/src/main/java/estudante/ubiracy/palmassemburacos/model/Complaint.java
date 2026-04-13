package estudante.ubiracy.palmassemburacos.model;

import estudante.ubiracy.palmassemburacos.model.enums.PotholeSeverity;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeSize;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Complaint extends BaseEntity{
    private PotholeSize size;
    private PotholeStatus status;
    private PotholeSeverity severity;
    private LocalDate date;
    private String description;
    private String imageUrl;
    @ManyToOne
    private Address address;
    @ManyToOne
    private User user;
}
