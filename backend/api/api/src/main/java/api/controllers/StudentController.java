package api.controllers;

import api.entities.Student;
import api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students/")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @PostMapping
    public Student addStudent (@RequestBody Student student){
        return studentService.addStudent(student);
    }
    @GetMapping
    public List<Student> getAll (){
        return studentService.getAll();
    }
}
