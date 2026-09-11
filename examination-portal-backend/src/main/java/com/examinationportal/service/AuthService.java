package com.examinationportal.service;

import com.examinationportal.dto.LoginRequest;
import com.examinationportal.dto.LoginResponse;
import com.examinationportal.entity.User;
import com.examinationportal.repository.UserRepository;
import com.examinationportal.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByUsername(request.getUsername());

        if (user == null) {
            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        String token =
                jwtService.generateToken(user.getUsername());

        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getRole().name(),
                user.getDepartment().getId(),
                user.getDepartment().getName()
        );
    }
}