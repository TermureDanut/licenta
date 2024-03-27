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

    public ResponseEntity<?> tryLogin(LoginInfo loginInfo){
        Teacher foundTeacher = teacherService.getByEmail(loginInfo.getEmail());
        Student foundStudent = studentService.getByEmail(loginInfo.getEmail());

        if (foundStudent != null){
            if (loginInfo.getPassword().equals(foundStudent.getPassword())) {
                StudentFlag studentFlag = new StudentFlag(foundStudent);
                return ResponseEntity.status(HttpStatus.OK).body(studentFlag);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password.");
        }

        if (foundTeacher != null){
            if (loginInfo.getPassword().equals(foundTeacher.getPassword())) {
                TeacherFlag teacherFlag = new TeacherFlag(foundTeacher);
                return ResponseEntity.status(HttpStatus.OK).body(teacherFlag);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password.");
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
