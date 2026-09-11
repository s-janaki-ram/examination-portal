package com.examinationportal.controller;

import com.examinationportal.dto.CreateCandidateRequest;
import com.examinationportal.dto.CreateCandidateResponse;
import com.examinationportal.entity.User;
import com.examinationportal.repository.UserRepository;
import com.examinationportal.service.CandidateService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateController {

    private final CandidateService candidateService;
    private final UserRepository userRepository;

    public CandidateController(
            CandidateService candidateService,
            UserRepository userRepository) {

        this.candidateService = candidateService;
        this.userRepository = userRepository;
    }

    @PostMapping("/candidates")
    public CreateCandidateResponse createCandidate(
            @RequestBody CreateCandidateRequest request,
            Authentication authentication) {

        String username = authentication.getName();

        User manager = userRepository
                .findByUsername(username);

        if (manager == null) {
            throw new RuntimeException("Manager not found");
        }

        return candidateService.createCandidate(
                request,
                manager.getDepartment()
        );
    }
}