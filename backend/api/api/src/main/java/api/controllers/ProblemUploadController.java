package api.controllers;

import api.entities.ProblemUpload;
import api.entities.ProblemUploadRequest;
import api.entities.TestMessage;
import api.services.ProblemUploadService;
import api.services.TestMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/problemupload/")
public class ProblemUploadController {
    @Autowired
    private ProblemUploadService problemUploadService;
    @Autowired
    private TestMessageService testMessageService;

    @GetMapping("all")
    public ResponseEntity<?> getAllProblemUploads(@RequestBody ProblemUploadRequest problemUploadRequest) {
        List<ProblemUpload> problemUploads = problemUploadService.getUploads(problemUploadRequest.getStudentId(), problemUploadRequest.getTeacherId(), problemUploadRequest.getProblemId());
        return new ResponseEntity<>(problemUploads, HttpStatus.OK);
    }

    @GetMapping("alloutputs/{id}")
    public ResponseEntity<?> getAllByProblemUpload(@PathVariable("id") long id) {
        List<TestMessage> testMessages = testMessageService.getAllByProblemUpload(id);
        return new ResponseEntity<>(testMessages, HttpStatus.OK);
    }
}
