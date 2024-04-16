package api.repositories;

import api.entities.ProblemUpload;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemUploadRepository extends JpaRepository<ProblemUpload, Long> {
    List<ProblemUpload> getAllByStudentIdAndInfoProblemId(long studentId, long pbId);

    List<ProblemUpload> getAllByTeacherIdAndInfoProblemId(long teacherid, long pbId);
}
