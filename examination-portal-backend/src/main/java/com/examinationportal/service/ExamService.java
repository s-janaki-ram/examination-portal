package com.examinationportal.service;

import com.examinationportal.dto.ExamStartResponse;
import com.examinationportal.dto.QuestionResponse;
import com.examinationportal.entity.ExamAttempt;
import com.examinationportal.entity.Question;
import com.examinationportal.entity.User;
import com.examinationportal.repository.ExamAttemptRepository;
import com.examinationportal.repository.QuestionRepository;
import com.examinationportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.examinationportal.dto.ExamStatusResponse;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExamService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final ExamAttemptRepository examAttemptRepository;

    public ExamService(
            UserRepository userRepository,
            QuestionRepository questionRepository,
            ExamAttemptRepository examAttemptRepository) {

        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.examAttemptRepository = examAttemptRepository;
    }


    public ExamStartResponse startExam(String username) {

        // Find the logged-in candidate using the username from JWT
        User candidate = userRepository.findByUsername(username);

        if (candidate == null) {
            throw new RuntimeException("Candidate not found");
        }

        // Make sure only candidates can start the exam
        if (candidate.getRole() != com.examinationportal.entity.Role.CANDIDATE) {
            throw new RuntimeException("Only candidates can start the exam");
        }

        // Check whether this candidate has already started an exam
        if (examAttemptRepository.findByCandidate(candidate).isPresent()) {
            throw new RuntimeException("Exam already attempted");
        }

        // Get the department assigned to the candidate
        Long departmentId = candidate.getDepartment().getId();

        // Get questions belonging only to that department
        List<Question> questions =
                questionRepository.findByDepartmentId(departmentId);

        // Make sure questions are available
        if (questions.isEmpty()) {
            throw new RuntimeException(
                    "No questions available for this department"
            );
        }

        // Record the current time as the exam start time
        LocalDateTime startTime = LocalDateTime.now();

        // Exam duration is 30 minutes
        LocalDateTime endTime = startTime.plusMinutes(30);

        // Create a new exam attempt
        ExamAttempt attempt = new ExamAttempt();

        // Connect the attempt to the candidate
        attempt.setCandidate(candidate);

        // Connect the attempt to the candidate's department
        attempt.setDepartment(candidate.getDepartment());

        // Store exam start and end time
        attempt.setStartTime(startTime);
        attempt.setEndTime(endTime);

        // Mark the attempt as started
        attempt.setStatus("STARTED");

        // Save the attempt in MySQL
        attempt = examAttemptRepository.save(attempt);

        // Convert Question entities into safe response objects
        // so correctAnswer is NOT sent to the candidate
        List<QuestionResponse> questionResponses =
                questions.stream()
                        .map(question -> new QuestionResponse(
                                question.getId(),
                                question.getQuestionText(),
                                question.getOptionA(),
                                question.getOptionB(),
                                question.getOptionC(),
                                question.getOptionD()
                        ))
                        .toList();

        // Return all exam information to the frontend
        return new ExamStartResponse(
                attempt.getId(),
                startTime,
                endTime,
                30,
                questionResponses
        );
    }
    public ExamStatusResponse getExamStatus(String username) {

        // Find the candidate using the username from JWT
        User candidate =
                userRepository.findByUsername(username);

        if (candidate == null) {
            throw new RuntimeException(
                    "Candidate not found"
            );
        }

        // Only candidates can check exam status
        if (candidate.getRole() !=
                com.examinationportal.entity.Role.CANDIDATE) {

            throw new RuntimeException(
                    "Only candidates can check exam status"
            );
        }

        // Check whether this candidate already has an attempt
        return examAttemptRepository
                .findByCandidate(candidate)
                .map(attempt ->
                        new ExamStatusResponse(
                                true,
                                attempt.getStatus(),
                                attempt.isDisqualified()
                        )
                )
                .orElseGet(() ->
                        new ExamStatusResponse(
                                false,
                                "NOT_STARTED",
                                false
                        )
                );
    }
}