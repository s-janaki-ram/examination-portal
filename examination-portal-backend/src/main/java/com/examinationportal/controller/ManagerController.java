package com.examinationportal.controller;

import com.examinationportal.dto.CandidateListResponse;
import com.examinationportal.dto.ManagerResultResponse;
import com.examinationportal.service.ManagerService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:5173")
public class ManagerController {

    private final ManagerService managerService;

    public ManagerController(
            ManagerService managerService) {

        this.managerService = managerService;
    }

    // =========================================================
    // GET ALL CANDIDATES
    // Includes candidates who have NOT_STARTED the exam
    // =========================================================
    @GetMapping("/candidates")
    public List<CandidateListResponse> getCandidates(
            Authentication authentication) {

        // Get manager username from JWT
        String username =
                authentication.getName();

        // Get all candidates from manager's department
        return managerService
                .getDepartmentCandidates(username);
    }

    // =========================================================
    // GET COMPLETED EXAM RESULTS
    // =========================================================
    @GetMapping("/results")
    public List<ManagerResultResponse> getResults(
            Authentication authentication) {

        // Get manager username from JWT
        String username =
                authentication.getName();

        // Return submitted exam results
        return managerService
                .getDepartmentResults(username);
    }
}