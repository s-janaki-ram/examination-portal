package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateCandidateResponse {

    private String name;
    private String username;
    private String password;
    private String departmentName;
}