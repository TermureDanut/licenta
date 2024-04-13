package api.repositories;

import api.entities.InfoProblemTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InfoProblemTestRepository extends JpaRepository<InfoProblemTest, Long> {
    List<InfoProblemTest> findByInfoProblemId(long id);
}
