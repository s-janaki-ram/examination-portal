package com.examinationportal.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "results")
@Getter
@Setter
@NoArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Connects this result to one exam attempt
    @OneToOne
    @JoinColumn(name = "attempt_id", nullable = false, unique = true)
    private ExamAttempt attempt;

    // Candidate who completed the exam
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    // Number of correctly answered questions
    @Column(nullable = false)
    private int score;

    // Total questions in the exam
    @Column(nullable = false)
    private int totalQuestions;

    // Number of incorrect answers
    @Column(nullable = false)
    private int incorrectAnswers;

    // Number of questions not answered
    @Column(nullable = false)
    private int unanswered;

    // Percentage calculated out of all exam questions
    @Column(nullable = false)
    private double percentage;

    // COMPLETED, TIMEOUT or DISQUALIFIED
    @Column(nullable = false)
    private String status;

    // Whether the candidate was disqualified
    @Column(nullable = false)
    private boolean disqualified;

    // Time when the exam was submitted
    @Column(nullable = false)
    private LocalDateTime submittedAt;
}