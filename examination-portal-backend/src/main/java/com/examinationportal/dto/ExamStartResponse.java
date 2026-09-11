package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ExamStartResponse {

    // ID of the exam attempt
    private Long attemptId;

    // Time when the exam started
    private LocalDateTime startTime;

    // Time when the exam will end
    private LocalDateTime endTime;

    // Exam duration in minutes
    private int durationMinutes;

    // Questions belonging to the candidate's department
    private List<QuestionResponse> questions;
}