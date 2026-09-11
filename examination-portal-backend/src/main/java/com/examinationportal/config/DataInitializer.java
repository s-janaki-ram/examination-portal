package com.examinationportal.config;

import com.examinationportal.entity.Department;
import com.examinationportal.entity.Role;
import com.examinationportal.entity.User;
import com.examinationportal.repository.DepartmentRepository;
import com.examinationportal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeData(
            DepartmentRepository departmentRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // Create departments
            Department itDepartment =
                    departmentRepository.findByName("IT Team");

            if (itDepartment == null) {
                itDepartment =
                        departmentRepository.save(
                                new Department("IT Team"));
            }

            Department financeDepartment =
                    departmentRepository.findByName("Finance Team");

            if (financeDepartment == null) {
                financeDepartment =
                        departmentRepository.save(
                                new Department("Finance Team"));
            }

            Department glDepartment =
                    departmentRepository.findByName(
                            "General Ledger Team");

            if (glDepartment == null) {
                glDepartment =
                        departmentRepository.save(
                                new Department("General Ledger Team"));
            }

            // Create IT Manager
            createManager(
                    userRepository,
                    passwordEncoder,
                    "IT Manager",
                    "itmanager",
                    "IT@12345",
                    itDepartment
            );

            // Create Finance Manager
            createManager(
                    userRepository,
                    passwordEncoder,
                    "Finance Manager",
                    "financemanager",
                    "Finance@12345",
                    financeDepartment
            );

            // Create GL Manager
            createManager(
                    userRepository,
                    passwordEncoder,
                    "GL Manager",
                    "glmanager",
                    "GL@12345",
                    glDepartment
            );
        };
    }

    private void createManager(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            String name,
            String username,
            String password,
            Department department) {

        if (userRepository.findByUsername(username) == null) {

            User manager = new User();

            manager.setName(name);
            manager.setUsername(username);

            manager.setPassword(
                    passwordEncoder.encode(password)
            );

            manager.setRole(Role.MANAGER);
            manager.setDepartment(department);

            userRepository.save(manager);
        }
    }
}