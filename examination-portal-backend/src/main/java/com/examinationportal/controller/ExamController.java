package com.examinationportal.controller;

import com.examinationportal.dto.ExamStartResponse;
import com.examinationportal.dto.ExamStatusResponse;
import com.examinationportal.service.ExamService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping("/start")
    public ExamStartResponse startExam(
            Authentication authentication) {

        // Get username of currently logged-in candidate
        String username =
                authentication.getName();

        // Start exam for this candidate
        return examService.startExam(username);
    }

    @GetMapping("/status")
    public ExamStatusResponse getExamStatus(
            Authentication authentication) {

        // Get username from authenticated JWT
        String username =
                authentication.getName();

        // Check candidate's exam status
        return examService.getExamStatus(username);
    }
}