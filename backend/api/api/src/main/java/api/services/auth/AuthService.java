package api.services.auth;


import api.entities.payload.LoginDto;

public interface AuthService {
    String login(LoginDto loginDto);
}