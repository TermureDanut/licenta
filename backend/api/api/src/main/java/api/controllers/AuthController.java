package api.controllers;

import api.entities.payload.CustomUserDetails;
import api.entities.payload.JwtAuthResponse;
import api.entities.payload.LoginDto;
import api.exceptions.InvalidCredentialsException;
import api.security.CustomUserDetailsService;
import api.services.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(AuthService authService, CustomUserDetailsService customUserDetailsService) {
        this.authService = authService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            String token = authService.login(loginDto);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDto.getEmail());

            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setAccessToken(token);

            if (userDetails instanceof CustomUserDetails) {
                CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
                jwtAuthResponse.setTeacher(customUserDetails.isTeacher());
                jwtAuthResponse.setStudent(customUserDetails.isStudent());
                jwtAuthResponse.setUser(customUserDetails.getUser());
            }

            return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }
    }

}
