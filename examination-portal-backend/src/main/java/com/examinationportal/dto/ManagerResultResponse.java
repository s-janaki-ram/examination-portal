package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ManagerResultResponse {

    // Candidate's name
    private String candidateName;

    // Candidate's username
    private String username;

    // Candidate's department
    private String departmentName;

    // Number of correct answers
    private int score;

    // Total number of questions
    private int totalQuestions;

    // Number of incorrect answers
    private int incorrectAnswers;

    // Number of unanswered questions
    private int unanswered;

    // Percentage scored
    private double percentage;

    // PASS or FAIL
    private String passFailStatus;

    // COMPLETED, TIMEOUT or DISQUALIFIED
    private String status;

    // Whether candidate was disqualified
    private boolean disqualified;

    // Time when the examination started
    private LocalDateTime startedAt;

    // Time when the examination was submitted
    private LocalDateTime submittedAt;
}