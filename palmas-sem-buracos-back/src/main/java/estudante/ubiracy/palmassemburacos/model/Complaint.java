package estudante.ubiracy.palmassemburacos.model;

import estudante.ubiracy.palmassemburacos.model.enums.PotholeSeverity;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeSize;
import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Complaint extends BaseEntity{
    @Enumerated(EnumType.STRING)
    private PotholeSize size;
    @Enumerated(EnumType.STRING)
    private PotholeStatus status;
    @Enumerated(EnumType.STRING)
    private PotholeSeverity severity;
    private String description;
    @Column(nullable = false)
    private boolean isDeleted = false;
    @Column
    private String imagePublicId;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address address;
    @ManyToOne
    private User user;
}
