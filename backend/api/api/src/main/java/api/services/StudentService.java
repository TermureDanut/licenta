package api.services;

import api.entities.Student;
import api.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student addStudent(Student student) {
        //        Student stud = new Student();
        //        stud.setEmail(student.getEmail());
        //        stud.setFirstName(student.getFirstName());
        //        stud.setLastName(student.getLastName());
        //        stud.setPassword(student.getPassword());
        studentRepository.save(student);
        return student;
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    public Student getByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}
