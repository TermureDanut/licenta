package api.security;


import api.entities.Student;
import api.entities.Teacher;
import api.repositories.StudentRepository;
import api.repositories.TeacherRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Teacher teacher = teacherRepository.findByEmail(email);
        Student student = studentRepository.findByEmail(email);

        if (teacher == null && student == null) {
            throw new UsernameNotFoundException(email);
        }
        if (teacher != null && student == null) {
            return new User(teacher.getEmail(), teacher.getPassword(), Collections.emptyList());
        }
        if (teacher == null && student != null) {
            return new User(student.getEmail(), student.getPassword(), Collections.emptyList());
        }
        return null;
    }
}
