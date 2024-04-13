package api.services;

import api.entities.Student;
import api.repositories.StudentRepository;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    private final Validator validator;

    public StudentService() {
        try (ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory()) {
            validator = validatorFactory.getValidator();
        }
    }

    public ResponseEntity<String> addStudent(Student student) {
        Set<ConstraintViolation<Student>> violations = validator.validate(student);
        if (!violations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Student email");
        }
        try {
            student.setStudentFlag(true);
            studentRepository.save(student);
            return ResponseEntity.status(HttpStatus.CREATED).body("Student created successfully");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate entry: Student already exists");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occured");
        }
    }

    public ResponseEntity<?> getAll() {
        List<Student> students = studentRepository.findAll();
        if (!students.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(students);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Students found");
    }

    public ResponseEntity<?> getByEmail(String email) {
        Student student = studentRepository.findByEmail(email);
        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Student found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(student);
    }
}
