package estudante.ubiracy.palmassemburacos.model;

import estudante.ubiracy.palmassemburacos.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class User extends BaseEntity{
    @Column(unique = true)
    private String username;
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Complaint> complaints;
}
