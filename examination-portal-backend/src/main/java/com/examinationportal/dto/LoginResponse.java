package com.examinationportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private Long userId;
    private String name;
    private String username;
    private String role;
    private Long departmentId;
    private String departmentName;
}