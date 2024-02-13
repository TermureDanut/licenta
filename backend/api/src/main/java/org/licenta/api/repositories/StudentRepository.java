package org.licenta.api.repositories;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.licenta.api.models.Student;

import java.util.Set;

@ApplicationScoped
public class StudentRepository {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();
    @Transactional
    public boolean postStudent(Student student){
        Set<ConstraintViolation<Student>> violations = validator.validate(student);
        if (!violations.isEmpty()){
            return false;
        }
        Student.persist(student);
        return true;
    }
}
