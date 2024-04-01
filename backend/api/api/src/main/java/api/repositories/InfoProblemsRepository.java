package api.repositories;

import api.entities.InfoProblem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoProblemsRepository extends JpaRepository<InfoProblem, Long> {
    Page<InfoProblem> findAll(Pageable pageable);

    Page<InfoProblem> findByCategory(String category, Pageable pageable);

    Page<InfoProblem> findByDifOption(String difOption, Pageable pageable);
}
