package api.services;

import api.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

// import java.security.MessageDigest;
// import java.security.NoSuchAlgorithmException;
// import java.util.Arrays;
// import java.util.Base64;

@Service
public class LoginService {
    @Autowired
    private StudentService studentService;
    @Autowired
    private TeacherService teacherService;

    public ResponseEntity<?> tryLogin(LoginInfo loginInfo) {
        ResponseEntity<?> foundTeacher = teacherService.getByEmail(loginInfo.getEmail());
        Teacher teacher;
        ResponseEntity<?> foundStudent = studentService.getByEmail(loginInfo.getEmail());
        Student student;
        if (foundStudent.getBody() instanceof Student) {
            student = (Student) foundStudent.getBody();
            if (student != null) {
                if (loginInfo.getPassword().equals(student.getPassword())) {
                    return ResponseEntity.status(HttpStatus.OK).body(student);
                }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occured");
            }
        }

        if (foundTeacher.getBody() instanceof Teacher) {
            teacher = (Teacher) foundTeacher.getBody();
            if (teacher != null) {
                if (loginInfo.getPassword().equals(teacher.getPassword())) {
                    return ResponseEntity.status(HttpStatus.OK).body(teacher);
                }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occured");
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found.");
    }

    //    public boolean verifyPassword(String plainTextPassword, String encodedPassword) {
    //        try {
    //            MessageDigest digest = MessageDigest.getInstance("SHA-256");
    //            byte[] hash = digest.digest(plainTextPassword.getBytes());
    //            String encodedPlainTextPassword = Base64.getEncoder().encodeToString(hash);
    //            System.out.println("PASSWORD = " + encodedPassword + "\n");
    //            System.out.println("PASSWORD = " + encodedPlainTextPassword + "\n");
    //            return encodedPassword.equals(encodedPlainTextPassword);
    //        } catch (NoSuchAlgorithmException e) {
    //            return false;
    //        }
    //    }
    //    public boolean verifyPassword(String plainTextPassword, String storedEncodedPassword) {
    //        try {
    //            MessageDigest digest = MessageDigest.getInstance("SHA-256");
    //            byte[] hash1 = digest.digest(plainTextPassword.getBytes());
    //            byte[] hash2 = Base64.getDecoder().decode(storedEncodedPassword); // Decode stored password
    //            System.out.println("PASSWORD = " + Arrays.toString(hash1) + "\n");
    //            System.out.println("PASSWORD = " + Arrays.toString(hash2) + "\n");
    //            return MessageDigest.isEqual(hash1, hash2);
    //        } catch (NoSuchAlgorithmException e) {
    //            return false;
    //        }
    //    }
}
