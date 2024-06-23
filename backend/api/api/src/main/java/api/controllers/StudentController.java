package api.controllers;

import api.entities.Student;
import api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students/")
@PreAuthorize("isAuthenticated()")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return studentService.getAll();
    }
}
