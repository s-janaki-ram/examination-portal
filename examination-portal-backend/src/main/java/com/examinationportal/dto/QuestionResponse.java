package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestionResponse {

    // Unique ID of the question
    private Long id;

    // Question text displayed to the candidate
    private String questionText;

    // Four options displayed to the candidate
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
}