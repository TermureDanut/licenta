package api.repositories;

import api.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.context.annotation.ApplicationScope;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByEmail(String email);
}
