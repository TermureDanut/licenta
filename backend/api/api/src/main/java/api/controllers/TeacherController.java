package api.controllers;

import api.entities.Teacher;
import api.entities.VirtualClass;
import api.services.TeacherService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/teachers/")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @PostMapping
    public ResponseEntity<String> addTeacher(@RequestBody Teacher teacher) {
        return teacherService.addTeacher(teacher);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return teacherService.getAll();
    }

    @PostMapping("addClass/{id}")
    public ResponseEntity<VirtualClass> addClassroom(@PathVariable("id") Long id, @Valid @RequestBody VirtualClass virtualClass) {
        VirtualClass virtualClass1 = teacherService.addClassroom(id, virtualClass);
        if (virtualClass1 == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(virtualClass1, HttpStatus.OK);
    }

    @GetMapping("getAllClasses/{id}")
    public List<VirtualClass> getVirtualClassesByTeacher(@PathVariable("id") Long id) {
        return teacherService.getVirtualClassesByTeacher(id);
    }
}
