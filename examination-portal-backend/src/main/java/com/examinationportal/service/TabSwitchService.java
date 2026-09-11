package com.examinationportal.service;

import com.examinationportal.entity.ExamAttempt;
import com.examinationportal.entity.Result;
import com.examinationportal.entity.Role;
import com.examinationportal.entity.User;
import com.examinationportal.repository.ExamAttemptRepository;
import com.examinationportal.repository.QuestionRepository;
import com.examinationportal.repository.ResultRepository;
import com.examinationportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TabSwitchService {

    private final ExamAttemptRepository examAttemptRepository;
    private final ResultRepository resultRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public TabSwitchService(
            ExamAttemptRepository examAttemptRepository,
            ResultRepository resultRepository,
            QuestionRepository questionRepository,
            UserRepository userRepository) {

        this.examAttemptRepository =
                examAttemptRepository;

        this.resultRepository =
                resultRepository;

        this.questionRepository =
                questionRepository;

        this.userRepository =
                userRepository;
    }

    @Transactional
    public String recordTabSwitch(
            Long attemptId,
            String username) {

        // Validate attempt ID
        if (attemptId == null) {

            throw new RuntimeException(
                    "Invalid exam attempt"
            );
        }

        // Find logged-in candidate
        User candidate =
                userRepository.findByUsername(username);

        if (candidate == null) {

            throw new RuntimeException(
                    "Candidate not found"
            );
        }

        // Only candidates can trigger this API
        if (candidate.getRole() != Role.CANDIDATE) {

            throw new RuntimeException(
                    "Only candidates can access this exam"
            );
        }

        // Find exam attempt
        ExamAttempt attempt =
                examAttemptRepository
                        .findById(attemptId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Exam attempt not found"
                                )
                        );

        // Verify ownership
        if (!attempt.getCandidate()
                .getId()
                .equals(candidate.getId())) {

            throw new RuntimeException(
                    "You are not authorized for this exam"
            );
        }

        // Ignore switches after exam completion
        if (!attempt.getStatus()
                .equals("STARTED")) {

            return "Exam is already completed";
        }

        // Increase switch count
        int switchCount =
                attempt.getTabSwitchCount() + 1;

        attempt.setTabSwitchCount(
                switchCount
        );

        // First switch gives warning
        if (switchCount == 1) {

            examAttemptRepository.save(
                    attempt
            );

            return "Warning: First tab switch detected";
        }

        // Second switch disqualifies candidate
        if (switchCount >= 2) {

            // Mark attempt as disqualified
            attempt.setDisqualified(true);

            // Change attempt status
            attempt.setStatus(
                    "DISQUALIFIED"
            );

            // Save attempt
            examAttemptRepository.save(
                    attempt
            );

            // Prevent duplicate result
            if (resultRepository
                    .findByAttempt(attempt)
                    .isEmpty()) {

                // Get actual number of questions
                int totalQuestions =
                        questionRepository
                                .findByDepartmentId(
                                        attempt
                                                .getDepartment()
                                                .getId()
                                )
                                .size();

                // Create result
                Result result =
                        new Result();

                // Connect result to attempt
                result.setAttempt(attempt);

                // Connect result to candidate
                result.setCandidate(
                        candidate
                );

                // Disqualified candidate gets zero
                result.setScore(0);

                // Store actual question count
                result.setTotalQuestions(
                        totalQuestions
                );

                // No correct/incorrect answers
                // are counted for disqualification
                result.setIncorrectAnswers(0);

                // All questions remain unanswered
                result.setUnanswered(
                        totalQuestions
                );

                // Percentage is zero
                result.setPercentage(0);

                // Store disqualification status
                result.setStatus(
                        "DISQUALIFIED"
                );

                result.setDisqualified(true);

                // Store submission time
                result.setSubmittedAt(
                        LocalDateTime.now()
                );

                // Save result
                resultRepository.save(
                        result
                );
            }

            return "Candidate disqualified";
        }

        return "Tab switch recorded";
    }
}