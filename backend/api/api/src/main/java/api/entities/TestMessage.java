package api.entities;

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
public class TestMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String message;
    @Column(nullable = false)
    private boolean passed;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "problem_upload_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProblemUpload problemUpload;
}
