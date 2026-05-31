package estudante.ubiracy.palmassemburacos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.locationtech.jts.geom.Polygon;

import java.util.Set;

@EqualsAndHashCode(callSuper = true, exclude = "address")
@ToString(exclude = "address")
@Entity
@Data
public class CityBlock extends BaseEntity {
    private String idPlace;
    private String region;
    private String name;
    @Column(columnDefinition = "GEOMETRY")
    private Polygon coordinate;
    @OneToMany(mappedBy = "cityBlock")
    @Transient
    private Set<Address> address;

}
