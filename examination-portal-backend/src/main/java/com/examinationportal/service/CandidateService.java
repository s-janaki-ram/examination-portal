package com.examinationportal.service;

import com.examinationportal.dto.CreateCandidateRequest;
import com.examinationportal.dto.CreateCandidateResponse;
import com.examinationportal.entity.Department;
import com.examinationportal.entity.Role;
import com.examinationportal.entity.User;
import com.examinationportal.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CandidateService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CandidateService(UserRepository userRepository,
                            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public CreateCandidateResponse createCandidate(
            CreateCandidateRequest request,
            Department department) {

        String username = generateUsername();
        String rawPassword = generatePassword();

        User candidate = new User();
        candidate.setName(request.getName());
        candidate.setUsername(username);
        candidate.setPassword(passwordEncoder.encode(rawPassword));
        candidate.setRole(Role.CANDIDATE);
        candidate.setDepartment(department);

        userRepository.save(candidate);

        return new CreateCandidateResponse(
                candidate.getName(),
                username,
                rawPassword,
                department.getName()
        );
    }

    private String generateUsername() {
        return "CAND-" + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();
    }

    private String generatePassword() {
        return UUID.randomUUID()
                .toString()
                .substring(0, 10);
    }
}