package api.services;

import api.entities.Teacher;
import api.entities.VirtualClass;
import api.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private VirtualClassService virtualClassService;

    @SuppressWarnings("null")
    public Teacher addTeacher (Teacher teacher){
//        Teacher teach = new Teacher();
//        teach.setEmail(teacher.getEmail());
//        teach.setFirstName(teacher.getFirstName());
//        teach.setLastName(teacher.getLastName());
//        teach.setPassword(teacher.getPassword());
        teacherRepository.save(teacher);
        return teacher;
    }
    public List<Teacher> getAll (){
        return teacherRepository.findAll();
    }
    public Teacher getByEmail (String email){
        return teacherRepository.findByEmail(email);
    }
    @SuppressWarnings("null")
    public Teacher addClassroom (Long id, VirtualClass virtualClass){
        Teacher teacher = teacherRepository.findById(id).orElse(null);
        virtualClass.setTeacher(teacher);
        VirtualClass addedClass = virtualClassService.addVirtualClass(virtualClass);
        teacher.addVirtualClass(addedClass);
        teacherRepository.save(teacher);
        return teacher;
    }

    public List<VirtualClass> getVirtualClassesByTeacher (Long id){
        return virtualClassService.getVirtualClassesByTeacher(id);
    }
}
