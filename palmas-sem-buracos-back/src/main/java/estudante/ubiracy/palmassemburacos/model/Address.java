package estudante.ubiracy.palmassemburacos.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Address extends BaseEntity{
    private String cityBlock;
    private String name;
    private String lat, lon;
    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL)
    private Set<Complaint> complaint;
}
