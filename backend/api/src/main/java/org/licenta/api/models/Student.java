package org.licenta.api.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_students")
public class Student extends PanacheEntity {
    @NotBlank(message = "First name is required")
    @Column(name = "first_name", length = 50, nullable = false)
    @Getter
    @Setter
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "last_name", length = 50, nullable = false)
    @Getter
    @Setter
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email", length = 50, nullable = false, unique = true)
    @Getter
    @Setter
    private String email;

    @NotBlank(message = "Password is required")
    @Column(name = "password", length = 100, nullable = false)
    @Getter
    @Setter
    private String password;

    @ManyToMany(mappedBy = "students")
    private List<VirtualClass> virtualClasses = new ArrayList<>();

    public Student(){}
}
