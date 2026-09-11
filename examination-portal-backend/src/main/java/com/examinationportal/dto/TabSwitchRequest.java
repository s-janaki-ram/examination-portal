package com.examinationportal.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TabSwitchRequest {

    // ID of the candidate's current exam attempt
    private Long attemptId;
}