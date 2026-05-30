package estudante.ubiracy.palmassemburacos.model;

import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Complaint extends BaseEntity{
    @Enumerated(EnumType.STRING)
    private PotholeStatus status;
    @Column(nullable = false)
    private boolean isDeleted = false;
    private String imagePublicId;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address address;
    @ManyToOne
    private User user;
}
