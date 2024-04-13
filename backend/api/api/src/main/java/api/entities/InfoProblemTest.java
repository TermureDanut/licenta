package api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InfoProblemTest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 500, nullable = false)
    private String inputData;

    @Column(length = 500, nullable = false)
    private String outputData;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "info_problem_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private InfoProblem infoProblem;
}
