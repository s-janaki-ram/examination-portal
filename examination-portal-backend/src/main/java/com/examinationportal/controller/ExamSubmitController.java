package com.examinationportal.controller;

import com.examinationportal.dto.ExamSubmitRequest;
import com.examinationportal.service.AnswerService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamSubmitController {

    private final AnswerService answerService;

    public ExamSubmitController(
            AnswerService answerService) {

        this.answerService = answerService;
    }

    @PostMapping("/submit")
    public String submitExam(
            @RequestBody ExamSubmitRequest request,
            Authentication authentication) {

        // Get username from the authenticated JWT
        String username =
                authentication.getName();

        // Submit exam for this exact candidate
        answerService.submitExam(
                request,
                username
        );

        // Do not return score to candidate
        return "Exam submitted successfully";
    }
}