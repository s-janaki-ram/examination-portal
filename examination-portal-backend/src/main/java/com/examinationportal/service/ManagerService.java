package com.examinationportal.service;

import com.examinationportal.dto.CandidateListResponse;
import com.examinationportal.dto.ManagerResultResponse;
import com.examinationportal.entity.ExamAttempt;
import com.examinationportal.entity.Result;
import com.examinationportal.entity.Role;
import com.examinationportal.entity.User;
import com.examinationportal.repository.ExamAttemptRepository;
import com.examinationportal.repository.ResultRepository;
import com.examinationportal.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {

    // Passing percentage
    private static final double PASSING_PERCENTAGE = 60.0;

    private final UserRepository userRepository;
    private final ResultRepository resultRepository;
    private final ExamAttemptRepository examAttemptRepository;

    public ManagerService(
            UserRepository userRepository,
            ResultRepository resultRepository,
            ExamAttemptRepository examAttemptRepository) {

        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
        this.examAttemptRepository = examAttemptRepository;
    }

    // =========================================================
    // GET ALL CANDIDATES OF MANAGER'S DEPARTMENT
    // =========================================================

    public List<CandidateListResponse> getDepartmentCandidates(
            String username) {

        // Find the logged-in manager
        User manager =
                userRepository.findByUsername(username);

        if (manager == null) {
            throw new RuntimeException(
                    "Manager not found"
            );
        }

        // Make sure only managers can access this method
        if (manager.getRole() != Role.MANAGER) {
            throw new RuntimeException(
                    "Only managers can view candidates"
            );
        }

        // Get manager's department
        Long departmentId =
                manager.getDepartment().getId();

        // Get all candidates from manager's department
        List<User> candidates =
                userRepository
                        .findByDepartmentIdAndRole(
                                departmentId,
                                Role.CANDIDATE
                        );

        // Convert candidates into dashboard response
        return candidates.stream()
                .map(candidate -> {

                    // Default values for a new candidate
                    String examStatus = "NOT_STARTED";

                    int score = 0;
                    int totalQuestions = 0;
                    double percentage = 0;
                    String passFailStatus = "NOT_ATTEMPTED";

                    java.time.LocalDateTime startedAt = null;
                    java.time.LocalDateTime submittedAt = null;

                    // Check whether candidate has an exam attempt
                    ExamAttempt attempt =
                            examAttemptRepository
                                    .findByCandidate(candidate)
                                    .orElse(null);

                    if (attempt != null) {

                        // Get current exam status
                        examStatus =
                                attempt.getStatus();

                        // Get exam start time
                        startedAt =
                                attempt.getStartTime();

                        // Check whether a result exists
                        Result result =
                                resultRepository
                                        .findByAttempt(attempt)
                                        .orElse(null);

                        if (result != null) {

                            score =
                                    result.getScore();

                            totalQuestions =
                                    result.getTotalQuestions();

                            percentage =
                                    result.getPercentage();

                            submittedAt =
                                    result.getSubmittedAt();

                            // Determine PASS / FAIL
                            if (result.isDisqualified()) {

                                passFailStatus =
                                        "DISQUALIFIED";

                            } else if (
                                    result.getPercentage()
                                            >= PASSING_PERCENTAGE) {

                                passFailStatus =
                                        "PASS";

                            } else {

                                passFailStatus =
                                        "FAIL";
                            }
                        }
                    }

                    return new CandidateListResponse(
                            candidate.getName(),
                            candidate.getUsername(),
                            candidate.getDepartment().getName(),
                            examStatus,
                            score,
                            totalQuestions,
                            percentage,
                            passFailStatus,
                            startedAt,
                            submittedAt
                    );
                })
                .toList();
    }


    // =========================================================
    // EXISTING MANAGER RESULTS API
    // =========================================================

    public List<ManagerResultResponse> getDepartmentResults(
            String username) {

        // Find the logged-in manager using JWT username
        User manager =
                userRepository.findByUsername(username);

        if (manager == null) {
            throw new RuntimeException(
                    "Manager not found"
            );
        }

        if (manager.getRole() != Role.MANAGER) {
            throw new RuntimeException(
                    "Only managers can view results"
            );
        }

        Long departmentId =
                manager.getDepartment().getId();

        List<Result> results =
                resultRepository
                        .findByCandidateDepartmentId(
                                departmentId
                        );

        return results.stream()
                .map(result -> {

                    String passFailStatus;

                    if (result.isDisqualified()) {

                        passFailStatus =
                                "DISQUALIFIED";

                    } else if (
                            result.getPercentage()
                                    >= PASSING_PERCENTAGE) {

                        passFailStatus = "PASS";

                    } else {

                        passFailStatus = "FAIL";
                    }

                    return new ManagerResultResponse(
                            result.getCandidate().getName(),
                            result.getCandidate().getUsername(),
                            result.getCandidate()
                                    .getDepartment()
                                    .getName(),
                            result.getScore(),
                            result.getTotalQuestions(),
                            result.getIncorrectAnswers(),
                            result.getUnanswered(),
                            result.getPercentage(),
                            passFailStatus,
                            result.getStatus(),
                            result.isDisqualified(),
                            result.getAttempt()
                                    .getStartTime(),
                            result.getSubmittedAt()
                    );
                })
                .toList();
    }
}