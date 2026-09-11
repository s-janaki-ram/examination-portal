package com.examinationportal.repository;

import com.examinationportal.entity.Role;
import com.examinationportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository
        extends JpaRepository<User, Long> {

    // Find a user using username during login
    User findByUsername(String username);

    // Find all candidates from one department
    List<User> findByDepartmentIdAndRole(
            Long departmentId,
            Role role
    );
}