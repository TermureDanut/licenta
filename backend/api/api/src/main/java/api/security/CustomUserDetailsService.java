package api.security;


import api.entities.Student;
import api.entities.Teacher;
import api.entities.payload.CustomUserDetails;
import api.repositories.StudentRepository;
import api.repositories.TeacherRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
        if (teacher != null) {
            return new CustomUserDetails(teacher);
        }
        if (student != null) {
            return new CustomUserDetails(student);
        }
        return null;
    }

}
