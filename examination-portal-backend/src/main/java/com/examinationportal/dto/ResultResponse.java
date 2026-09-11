package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ResultResponse {

    private String candidateName;
    private String username;
    private String departmentName;
    private int score;
    private int totalQuestions;
    private double percentage;
    private String status;
    private boolean disqualified;
    private LocalDateTime submittedAt;
}