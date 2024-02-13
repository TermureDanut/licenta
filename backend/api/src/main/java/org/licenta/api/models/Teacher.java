package org.licenta.api.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_teachers")
public class Teacher extends PanacheEntity {
    @Column(name = "first_name", length = 50, nullable = false)
    @Getter
    @Setter
    private String firstName;

    @Column(name = "last_name", length = 50, nullable = false)
    @Getter
    @Setter
    private String lastName;

    @Column(name = "email", length = 50, nullable = false)
    @Getter
    @Setter
    private String email;

    @Column(name = "password", length = 100, nullable = false)
    @Getter
    @Setter
    private String password;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<VirtualClass> virtualClasses = new ArrayList<>();
    public Teacher(){}
}
