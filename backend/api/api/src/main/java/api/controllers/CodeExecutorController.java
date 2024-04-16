package api.controllers;

import api.entities.CodeInfo.ExecutionRequest;
import api.compiler.CodeExecutorService;
import api.entities.CodeInfo.PostRequest;
import api.entities.InfoProblem;
import api.entities.InfoProblemTest;
import api.entities.ProblemUpload;
import api.entities.TestMessage;
import api.services.InfoProblemService;
import api.services.InfoProblemTestService;
import api.services.ProblemUploadService;
import api.services.TestMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/execute/")
public class CodeExecutorController {
    @Autowired
    private InfoProblemTestService infoProblemTestService;
    @Autowired
    private InfoProblemService infoProblemService;
    @Autowired
    private ProblemUploadService problemUploadService;
    @Autowired
    private TestMessageService testMessageService;

    @PostMapping("/runcpp")
    public ResponseEntity<?> executeCppCode(@RequestBody ExecutionRequest executionRequest) {
        try {
            List<String> outputs = new ArrayList<>();
            InfoProblem infoProblem = infoProblemService.getById(executionRequest.getInfoProblemId());
            List<InfoProblemTest> infoProblemTests = infoProblemTestService.getExample(infoProblem.getId());
            for (InfoProblemTest infoProblemTest : infoProblemTests) {
                String output = CodeExecutorService.executeCppCode(executionRequest.getCppCode(), infoProblemTest.getInputData());
                outputs.add(output);
            }

            return ResponseEntity.ok(outputs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during code execution.");
        }
    }

    @PostMapping("/postcpp")
    public ResponseEntity<?> postCppCode(@RequestBody PostRequest postRequest) {
        try {
            InfoProblem infoProblem = infoProblemService.getById(postRequest.getInfoProblemId());

            ProblemUpload problemUpload = new ProblemUpload();
            problemUpload.setPostDate(LocalDateTime.now());
            problemUpload.setCode(postRequest.getCppCode());
            if (postRequest.getStudentId() != 0) {
                problemUpload.setStudentFlag(true);
                problemUpload.setTeacherFlag(false);
            }

            if (postRequest.getTeacherId() != 0) {
                problemUpload.setStudentFlag(false);
                problemUpload.setTeacherFlag(true);
            }
            problemUpload.setInfoProblem(infoProblem);
            problemUpload = problemUploadService.addProblemUpload(problemUpload, postRequest.getStudentId(), postRequest.getTeacherId());

            List<TestMessage> testMessages = new ArrayList<>();
            List<InfoProblemTest> infoProblemTests = infoProblemTestService.getAllTests(infoProblem.getId());
            for (InfoProblemTest infoProblemTest : infoProblemTests) {
                String output = CodeExecutorService.executeCppCode(postRequest.getCppCode(), infoProblemTest.getInputData());
                TestMessage testMessage = new TestMessage();
                if (output.equals(infoProblemTest.getOutputData())) {
                    testMessage.setPassed(true);
                } else {
                    testMessage.setPassed(false);
                }
                testMessage.setMessage(output);
                testMessages.add(testMessageService.addTestMessage(problemUpload.getId(), testMessage));
            }

            return ResponseEntity.ok(testMessages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during code execution.");
        }
    }
}
