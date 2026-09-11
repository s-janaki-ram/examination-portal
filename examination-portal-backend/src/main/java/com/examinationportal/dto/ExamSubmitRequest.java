package com.examinationportal.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ExamSubmitRequest {

    private Long attemptId;
    private List<AnswerRequest> answers;
}