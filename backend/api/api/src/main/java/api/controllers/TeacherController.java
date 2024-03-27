package api.controllers;

import api.entities.Teacher;
import api.entities.VirtualClass;
import api.services.TeacherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/teachers/")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @PostMapping
    public Teacher addTeacher (@RequestBody Teacher teacher){
        return teacherService.addTeacher(teacher);
    }
    @GetMapping
    public List<Teacher> getAll (){
        return teacherService.getAll();
    }
    @PostMapping("addClass/{id}")
    public Teacher addClassroom (@PathVariable("id") Long id, @RequestBody VirtualClass virtualClass){
        return teacherService.addClassroom(id, virtualClass);
    }
    @GetMapping("getAllClasses/{id}")
    public List<VirtualClass> getVirtualClassesByTeacher (@PathVariable("id") Long id){
        return teacherService.getVirtualClassesByTeacher(id);
    }
}
