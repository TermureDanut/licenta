package api.controllers;

import api.entities.CodeInfo.ExecutionRequest;
import api.compiler.CodeExecutorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/execute/")
public class CodeExecutorController {
    @PostMapping("/runcpp")
    public ResponseEntity<String> executeCppCode(@RequestBody ExecutionRequest executionRequest) {
        try {
            String output = CodeExecutorService.executeCppCode(executionRequest.cppCode, executionRequest.inputData);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during code execution.");
        }
    }
}
