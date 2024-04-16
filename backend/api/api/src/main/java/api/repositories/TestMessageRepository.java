package api.repositories;

import api.entities.TestMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestMessageRepository extends JpaRepository<TestMessage, Long> {
    List<TestMessage> getAllByProblemUploadId(long id);
}
