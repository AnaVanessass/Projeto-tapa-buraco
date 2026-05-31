package estudante.ubiracy.palmassemburacos.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Set;

@EqualsAndHashCode(callSuper = true, exclude = "complaint")
@ToString(exclude = "complaint")
@Entity
@Data
public class Address extends BaseEntity{
    @ManyToOne
    private CityBlock cityBlock;
    private String name;
    private Double lat, lng;
    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL)
    private Set<Complaint> complaint;
}
