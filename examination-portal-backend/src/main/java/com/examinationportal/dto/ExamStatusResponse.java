package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExamStatusResponse {

    // Whether the candidate has already attempted the exam
    private boolean attempted;

    // Current exam status
    private String status;

    // Whether the candidate was disqualified
    private boolean disqualified;
}