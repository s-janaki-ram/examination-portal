package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CandidateListResponse {

    // Candidate's name
    private String candidateName;

    // Candidate's generated username
    private String username;

    // Candidate's department
    private String departmentName;

    // Current exam status
    // NOT_STARTED, STARTED, COMPLETED, TIMEOUT, DISQUALIFIED
    private String examStatus;

    // Score after examination
    private int score;

    // Total questions
    private int totalQuestions;

    // Percentage scored
    private double percentage;

    // PASS, FAIL or DISQUALIFIED
    private String passFailStatus;

    // Examination start time
    private LocalDateTime startedAt;

    // Examination submission time
    private LocalDateTime submittedAt;
}