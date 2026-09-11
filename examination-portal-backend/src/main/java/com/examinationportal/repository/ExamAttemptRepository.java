package com.examinationportal.repository;

import com.examinationportal.entity.ExamAttempt;
import com.examinationportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, Long> {
    // Finds an existing exam attempt for a particular candidate
    Optional<ExamAttempt> findByCandidate(User candidate);
}