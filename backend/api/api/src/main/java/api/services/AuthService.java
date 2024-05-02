package api.services;


import api.payload.LoginDto;

public interface AuthService {
    String login(LoginDto loginDto);
}