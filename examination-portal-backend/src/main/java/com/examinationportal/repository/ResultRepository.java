package com.examinationportal.repository;

import com.examinationportal.entity.ExamAttempt;
import com.examinationportal.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result, Long> {
    // Finds the result already created for an exam attempt
    Optional<Result> findByAttempt(ExamAttempt attempt);
    // Find all results of candidates from one department
    List<Result> findByCandidateDepartmentId(Long departmentId);

}