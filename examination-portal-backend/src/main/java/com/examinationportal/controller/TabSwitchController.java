package com.examinationportal.controller;

import com.examinationportal.dto.TabSwitchRequest;
import com.examinationportal.service.TabSwitchService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "http://localhost:5173")
public class TabSwitchController {

    private final TabSwitchService tabSwitchService;

    public TabSwitchController(
            TabSwitchService tabSwitchService) {

        this.tabSwitchService =
                tabSwitchService;
    }

    @PostMapping("/tab-switch")
    public String recordTabSwitch(
            @RequestBody TabSwitchRequest request,
            Authentication authentication) {

        // Get username from authenticated JWT
        String username =
                authentication.getName();

        // Record tab switch for this candidate
        return tabSwitchService.recordTabSwitch(
                request.getAttemptId(),
                username
        );
    }
}