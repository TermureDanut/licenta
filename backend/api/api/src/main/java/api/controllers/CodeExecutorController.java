package api.controllers;

import api.entities.CodeInfo.ExecutionRequest;
import api.compiler.CodeExecutorService;
import api.entities.InfoProblem;
import api.entities.InfoProblemTest;
import api.services.InfoProblemService;
import api.services.InfoProblemTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/runcpp")
    public ResponseEntity<?> executeCppCode(@RequestBody ExecutionRequest executionRequest) {
        try {
            List<String> outputs = new ArrayList<>();
            InfoProblem infoProblem = infoProblemService.getById(executionRequest.getInfoProblemId());
            int nrOfExamples = Math.toIntExact(infoProblem.getNrOfExamples());
            List<InfoProblemTest> infoProblemTests = infoProblemTestService.getExample(infoProblem.getId(), nrOfExamples);
            for (InfoProblemTest infoProblemTest : infoProblemTests) {
                String output = CodeExecutorService.executeCppCode(executionRequest.getCppCode(), infoProblemTest.getInputData());
                outputs.add(output);
            }

            return ResponseEntity.ok(outputs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during code execution.");
        }
    }

    // post cpp , pbUpload table create
}
