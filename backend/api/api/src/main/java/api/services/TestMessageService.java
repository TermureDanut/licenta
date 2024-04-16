package api.services;

import api.entities.ProblemUpload;
import api.entities.TestMessage;
import api.repositories.ProblemUploadRepository;
import api.repositories.TestMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestMessageService {
    @Autowired
    private TestMessageRepository testMessageRepository;
    @Autowired
    private ProblemUploadRepository problemUploadRepository;

    public TestMessage addTestMessage(long problemUploadId, TestMessage testMessage) {
        ProblemUpload problemUpload = problemUploadRepository.findById(problemUploadId).orElse(null);
        if (problemUpload == null) {
            return null;
        }
        testMessage.setProblemUpload(problemUpload);
        testMessageRepository.save(testMessage);
        return testMessage;
    }

    public List<TestMessage> getAllByProblemUpload(long problemUploadId) {
        ProblemUpload problemUpload = problemUploadRepository.findById(problemUploadId).orElse(null);
        if (problemUpload != null) {
            return testMessageRepository.getAllByProblemUploadId(problemUploadId);
        }
        return null;
    }
}
