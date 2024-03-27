package api.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_virtual_classes")
public class VirtualClass {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private long id;

    @Column(name = "name", length = 50, nullable = false)
    @Getter
    @Setter
    private String name;

    @ManyToMany
    @JoinTable(name = "t_virtual_class_student", joinColumns = @JoinColumn(name = "virtual_class_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
    private List<Student> students = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @Setter
    @Getter
    private Teacher teacher;

    public VirtualClass(){}
}