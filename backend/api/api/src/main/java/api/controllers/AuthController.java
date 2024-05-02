package api.controllers;

import api.entities.Student;
import api.entities.Teacher;
import api.payload.JwtAuthResponse;
import api.payload.LoginDto;
import api.security.CustomUserDetailsService;
import api.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(AuthService authService, CustomUserDetailsService customUserDetailsService) {
        this.authService = authService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping(value = {"/login", "/signing"})
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDto.getEmail());
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        if (userDetails instanceof Teacher) {
            jwtAuthResponse.isTeacher();
            jwtAuthResponse.setUser(userDetails);
        }
        if (userDetails instanceof Student) {
            jwtAuthResponse.isStudent();
            jwtAuthResponse.setUser(userDetails);
        }
        return ResponseEntity.ok(jwtAuthResponse);
    }
}
