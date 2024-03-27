package api.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "t_info_problem")
public class InfoProblem {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private Long id;

    @Column(name = "name", length = 50, nullable = false)
    @Getter
    @Setter
    private String name;
    @Column(name = "category", length = 50, nullable = false)
    @Getter
    @Setter
    private String category;
    @Column(name = "dif_option", length = 50, nullable = false)
    @Getter
    @Setter
    private String difOption;
    @Column(name = "input_data", length = 100, nullable = false)
    @Getter
    @Setter
    private String inputData;
    @Column(name = "output_data", length = 100, nullable = false)
    @Getter
    @Setter
    private String outputData;
    @Column(name = "problem_requirement", length = 1000, nullable = false)
    @Getter
    @Setter
    private String pbRequirement;
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @Setter
    @Getter
    private Teacher teacher;

    public InfoProblem() {
    }
}
