package api.controllers;

import api.entities.*;
import api.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/login/")
public class LoginController {
    @Autowired
    private LoginService loginService;
    @PostMapping
    public ResponseEntity<?> login (@RequestBody LoginInfo loginInfo) {
//        ResponseEntity<?> response = loginService.tryLogin(loginInfo);
//        if (response.getBody() instanceof Student){
//            StudentFlag studentFlag = new StudentFlag((Student) response.getBody());
//            return ResponseEntity.status(response.getStatusCode()).body(studentFlag);
//        }
//        if (response.getBody() instanceof Teacher){
//            TeacherFlag teacherFlag = new TeacherFlag((Teacher) response.getBody());
//            return ResponseEntity.status(response.getStatusCode()).body(teacherFlag);
//        }
//        return response;
        return loginService.tryLogin(loginInfo);
    }
}
