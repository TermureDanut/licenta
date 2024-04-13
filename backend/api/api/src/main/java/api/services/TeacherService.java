package api.services;

import api.entities.Student;
import api.entities.Teacher;
import api.entities.VirtualClass;
import api.repositories.TeacherRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private VirtualClassService virtualClassService;
    private final Validator validator;

    public TeacherService() {
        try (ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory()) {
            validator = validatorFactory.getValidator();
        }
    }

    public ResponseEntity<String> addTeacher(Teacher teacher) {
        Set<ConstraintViolation<Teacher>> violations = validator.validate(teacher);
        if (!violations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Teacher email");
        }
        try {
            teacher.setTeacherFlag(true);
            teacherRepository.save(teacher);
            return ResponseEntity.status(HttpStatus.CREATED).body("Teacher created successfully");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate entry: Teacher already exists");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occured");
        }
    }

    public ResponseEntity<?> getAll() {
        List<Teacher> teachers = teacherRepository.findAll();
        if (!teachers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(teachers);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Teachers found");
    }

    public ResponseEntity<?> getByEmail(String email) {
        Teacher teacher = teacherRepository.findByEmail(email);
        if (teacher == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Teacher found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(teacher);
    }

    public VirtualClass addClassroom(Long id, VirtualClass virtualClass) {
        Teacher teacher = teacherRepository.findById(id).orElse(null);
        if (teacher != null) {
            virtualClass.setTeacher(teacher);
            return virtualClassService.addVirtualClass(virtualClass);
        }
        return null;
    }

    public List<VirtualClass> getVirtualClassesByTeacher(Long id) {
        return virtualClassService.getVirtualClassesByTeacher(id);
    }
}
