package com.examinationportal.service;

import com.examinationportal.dto.AnswerRequest;
import com.examinationportal.dto.ExamSubmitRequest;
import com.examinationportal.entity.Answer;
import com.examinationportal.entity.ExamAttempt;
import com.examinationportal.entity.Question;
import com.examinationportal.entity.Result;
import com.examinationportal.entity.Role;
import com.examinationportal.entity.User;
import com.examinationportal.repository.AnswerRepository;
import com.examinationportal.repository.ExamAttemptRepository;
import com.examinationportal.repository.QuestionRepository;
import com.examinationportal.repository.ResultRepository;
import com.examinationportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AnswerService {

    private final ExamAttemptRepository examAttemptRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final ResultRepository resultRepository;
    private final UserRepository userRepository;

    public AnswerService(
            ExamAttemptRepository examAttemptRepository,
            QuestionRepository questionRepository,
            AnswerRepository answerRepository,
            ResultRepository resultRepository,
            UserRepository userRepository) {

        this.examAttemptRepository = examAttemptRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void submitExam(
            ExamSubmitRequest request,
            String username) {

        // Validate request
        if (request == null ||
                request.getAttemptId() == null) {

            throw new RuntimeException(
                    "Invalid exam submission"
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

        // Only candidates can submit exams
        if (candidate.getRole() != Role.CANDIDATE) {
            throw new RuntimeException(
                    "Only candidates can submit exams"
            );
        }

        // Find exam attempt
        ExamAttempt attempt =
                examAttemptRepository
                        .findById(request.getAttemptId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Exam attempt not found"
                                )
                        );

        // Make sure this attempt belongs to logged-in candidate
        if (!attempt.getCandidate()
                .getId()
                .equals(candidate.getId())) {

            throw new RuntimeException(
                    "You are not authorized to submit this exam"
            );
        }

        // Do not allow submission after disqualification
        if (attempt.isDisqualified() ||
                attempt.getStatus()
                        .equals("DISQUALIFIED")) {

            throw new RuntimeException(
                    "Exam was disqualified"
            );
        }

        // Prevent duplicate submission
        if (resultRepository
                .findByAttempt(attempt)
                .isPresent()) {

            throw new RuntimeException(
                    "Exam has already been submitted"
            );
        }

        // Exam must still be started
        if (!attempt.getStatus()
                .equals("STARTED")) {

            throw new RuntimeException(
                    "Exam is already completed"
            );
        }

        // Get current server time
        LocalDateTime currentTime =
                LocalDateTime.now();

        // Get all questions for this department
        List<Question> examQuestions =
                questionRepository
                        .findByDepartmentId(
                                attempt.getDepartment().getId()
                        );

        // Total number of exam questions
        int totalQuestions =
                examQuestions.size();

        // Store valid question IDs
        Set<Long> validQuestionIds =
                new HashSet<>();

        for (Question question :
                examQuestions) {

            validQuestionIds.add(
                    question.getId()
            );
        }

        // Get submitted answers safely
        List<AnswerRequest> submittedAnswers =
                request.getAnswers() == null
                        ? List.of()
                        : request.getAnswers();

        // Track duplicate question IDs
        Set<Long> answeredQuestionIds =
                new HashSet<>();

        // Count correct answers
        int score = 0;

        // Process every submitted answer
        for (AnswerRequest answerRequest :
                submittedAnswers) {

            // Skip invalid request entries
            if (answerRequest == null ||
                    answerRequest.getQuestionId() == null ||
                    answerRequest.getSelectedAnswer() == null) {

                continue;
            }

            Long questionId =
                    answerRequest.getQuestionId();

            // Ignore questions not belonging to this exam
            if (!validQuestionIds.contains(
                    questionId)) {

                throw new RuntimeException(
                        "Invalid question submitted"
                );
            }

            // Ignore duplicate answers
            if (!answeredQuestionIds.add(
                    questionId)) {

                continue;
            }

            // Find question
            Question question =
                    questionRepository
                            .findById(questionId)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Question not found"
                                    )
                            );

            // Create answer record
            Answer answer = new Answer();

            // Connect answer to attempt
            answer.setAttempt(attempt);

            // Connect answer to question
            answer.setQuestion(question);

            // Store selected answer
            answer.setSelectedAnswer(
                    answerRequest
                            .getSelectedAnswer()
                            .trim()
                            .toUpperCase()
            );

            // Save answer to MySQL
            answerRepository.save(answer);

            // Compare answer with correct answer
            if (question.getCorrectAnswer()
                    .equalsIgnoreCase(
                            answerRequest
                                    .getSelectedAnswer()
                                    .trim()
                    )) {

                score++;
            }
        }

        // Number of answered questions
        int answeredQuestions =
                answeredQuestionIds.size();

        // Calculate incorrect answers
        int incorrectAnswers =
                answeredQuestions - score;

        // Calculate unanswered questions
        int unanswered =
                totalQuestions -
                        answeredQuestions;

        // Calculate percentage
        double percentage =
                totalQuestions == 0
                        ? 0
                        : (score * 100.0)
                        / totalQuestions;

        // Exact end time is also considered expired
        boolean timeExpired =
                !currentTime.isBefore(
                        attempt.getEndTime()
                );

        // Update attempt status
        if (timeExpired) {

            attempt.setStatus("TIMEOUT");

        } else {

            attempt.setStatus("SUBMITTED");
        }

        // Save attempt
        examAttemptRepository.save(attempt);

        // Create final result
        Result result = new Result();

        // Connect result to attempt
        result.setAttempt(attempt);

        // Connect result to candidate
        result.setCandidate(candidate);

        // Store score
        result.setScore(score);

        // Store total questions
        result.setTotalQuestions(
                totalQuestions
        );

        // Store incorrect answers
        result.setIncorrectAnswers(
                incorrectAnswers
        );

        // Store unanswered questions
        result.setUnanswered(
                unanswered
        );

        // Store percentage
        result.setPercentage(
                percentage
        );

        // Store final status
        result.setStatus(
                timeExpired
                        ? "TIMEOUT"
                        : "COMPLETED"
        );

        // Candidate was not disqualified
        result.setDisqualified(false);

        // Store submission time
        result.setSubmittedAt(
                currentTime
        );

        // Save result
        resultRepository.save(result);
    }
}