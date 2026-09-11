package com.examinationportal.config;

import com.examinationportal.entity.Department;
import com.examinationportal.entity.Question;
import com.examinationportal.repository.DepartmentRepository;
import com.examinationportal.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class QuestionDataInitializer {

    @Bean
    CommandLineRunner initializeQuestions(
            DepartmentRepository departmentRepository,
            QuestionRepository questionRepository) {

        return args -> {

            // Find the three departments created by DataInitializer.
            Department itDepartment =
                    departmentRepository.findByName("IT Team");

            Department financeDepartment =
                    departmentRepository.findByName("Finance Team");

            Department glDepartment =
                    departmentRepository.findByName(
                            "General Ledger Team"
                    );

            // Make sure all departments exist before creating questions.
            if (itDepartment == null ||
                    financeDepartment == null ||
                    glDepartment == null) {

                throw new RuntimeException(
                        "Required departments not found"
                );
            }

            /*
             * Create IT questions only if the IT department
             * does not already have questions.
             */
            if (questionRepository
                    .findByDepartmentId(itDepartment.getId())
                    .isEmpty()) {

                List<Question> itQuestions = List.of(

                        createQuestion(
                                "Which language is mainly used with Spring Boot?",
                                "Java",
                                "Python",
                                "C++",
                                "JavaScript",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which annotation is used to create a REST controller in Spring Boot?",
                                "@RestController",
                                "@Entity",
                                "@Service",
                                "@Repository",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which database are we using in this project?",
                                "MongoDB",
                                "MySQL",
                                "Oracle",
                                "PostgreSQL",
                                "B",
                                itDepartment
                        ),

                        createQuestion(
                                "Which technology is used to build our frontend?",
                                "React",
                                "Spring Boot",
                                "Hibernate",
                                "MySQL",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which keyword is used to inherit a class in Java?",
                                "implements",
                                "extends",
                                "inherits",
                                "super",
                                "B",
                                itDepartment
                        ),

                        createQuestion(
                                "Which collection does not allow duplicate elements?",
                                "List",
                                "ArrayList",
                                "Set",
                                "Vector",
                                "C",
                                itDepartment
                        ),

                        createQuestion(
                                "Which annotation marks a Java class as a JPA entity?",
                                "@Service",
                                "@Controller",
                                "@Entity",
                                "@Bean",
                                "C",
                                itDepartment
                        ),

                        createQuestion(
                                "Which HTTP method is normally used to retrieve data?",
                                "POST",
                                "GET",
                                "PUT",
                                "DELETE",
                                "B",
                                itDepartment
                        ),

                        createQuestion(
                                "Which HTTP method is commonly used to create data?",
                                "GET",
                                "DELETE",
                                "POST",
                                "PATCH",
                                "C",
                                itDepartment
                        ),

                        createQuestion(
                                "Which HTTP status code means successful request?",
                                "200",
                                "404",
                                "500",
                                "401",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "What does API stand for?",
                                "Application Programming Interface",
                                "Application Program Internet",
                                "Advanced Programming Interface",
                                "Application Process Integration",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which tool is used to manage Java dependencies in this project?",
                                "npm",
                                "Maven",
                                "pip",
                                "Gradle only",
                                "B",
                                itDepartment
                        ),

                        createQuestion(
                                "Which annotation is used for dependency injection in Spring?",
                                "@Autowired",
                                "@Override",
                                "@Static",
                                "@InjectBean",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which technology is used for object-relational mapping?",
                                "Hibernate",
                                "React",
                                "Axios",
                                "Vite",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which SQL command is commonly used to retrieve records?",
                                "SELECT",
                                "INSERT",
                                "DELETE",
                                "UPDATE",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which SQL command is used to add a new record?",
                                "SELECT",
                                "INSERT",
                                "UPDATE",
                                "DROP",
                                "B",
                                itDepartment
                        ),

                        createQuestion(
                                "What does JWT stand for?",
                                "Java Web Token",
                                "JSON Web Token",
                                "JavaScript Web Technology",
                                "JSON Web Technology",
                                "B",
                                itDepartment
                        ),

                        createQuestion(
                                "Which HTTP status code means Unauthorized?",
                                "200",
                                "201",
                                "401",
                                "500",
                                "C",
                                itDepartment
                        ),

                        createQuestion(
                                "Which React hook is commonly used to manage component state?",
                                "useState",
                                "useRoute",
                                "useClass",
                                "useData",
                                "A",
                                itDepartment
                        ),

                        createQuestion(
                                "Which React hook is commonly used for side effects?",
                                "useState",
                                "useEffect",
                                "useStyle",
                                "useRoute",
                                "B",
                                itDepartment
                        )
                );

                // Save all IT questions.
                questionRepository.saveAll(itQuestions);

                System.out.println(
                        "20 IT questions inserted successfully."
                );
            }

            /*
             * Create Finance questions only if the Finance department
             * does not already have questions.
             */
            if (questionRepository
                    .findByDepartmentId(financeDepartment.getId())
                    .isEmpty()) {

                List<Question> financeQuestions = List.of(

                        createQuestion(
                                "What is the primary purpose of accounting?",
                                "To record and report financial transactions",
                                "To design websites",
                                "To manage networks",
                                "To create software",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is an asset?",
                                "A financial obligation",
                                "Something owned by a business",
                                "An expense",
                                "A loss",
                                "B",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is a liability?",
                                "Something owned by a company",
                                "Company revenue",
                                "An amount owed by a company",
                                "Company profit",
                                "C",
                                financeDepartment
                        ),

                        createQuestion(
                                "Which statement shows a company's financial position?",
                                "Balance Sheet",
                                "Sales Invoice",
                                "Purchase Order",
                                "Attendance Sheet",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "Revenue means:",
                                "Money spent by a company",
                                "Income earned by a company",
                                "Company debt",
                                "Company tax",
                                "B",
                                financeDepartment
                        ),

                        createQuestion(
                                "An expense is:",
                                "Money earned",
                                "Money invested only",
                                "Cost incurred to operate a business",
                                "Company asset",
                                "C",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is profit?",
                                "Revenue minus expenses",
                                "Expenses minus revenue",
                                "Assets minus sales",
                                "Tax minus revenue",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "Which account normally records money received from customers?",
                                "Cash/Bank",
                                "Expense",
                                "Liability",
                                "Depreciation",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is a budget?",
                                "A plan for expected income and expenses",
                                "A legal document",
                                "A database",
                                "A tax receipt",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "What does GST stand for?",
                                "General Sales Tax",
                                "Goods and Services Tax",
                                "Government Service Tax",
                                "Goods Supply Transaction",
                                "B",
                                financeDepartment
                        ),

                        createQuestion(
                                "Which document is commonly issued when goods are sold?",
                                "Invoice",
                                "Resume",
                                "Balance Sheet",
                                "Ledger only",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is depreciation?",
                                "Increase in asset value",
                                "Decrease in the value of an asset over time",
                                "Increase in revenue",
                                "Increase in liability",
                                "B",
                                financeDepartment
                        ),

                        createQuestion(
                                "Which account records amounts owed to suppliers?",
                                "Accounts Payable",
                                "Accounts Receivable",
                                "Revenue",
                                "Cash",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "Which account records amounts owed by customers?",
                                "Accounts Payable",
                                "Accounts Receivable",
                                "Capital",
                                "Expense",
                                "B",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is working capital?",
                                "Current Assets minus Current Liabilities",
                                "Total Assets plus Revenue",
                                "Revenue minus Tax",
                                "Profit plus Expense",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "Which financial statement shows income and expenses?",
                                "Income Statement",
                                "Balance Sheet",
                                "Cash Memo",
                                "Purchase Order",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is capital?",
                                "Owner's investment in the business",
                                "Company expense",
                                "Customer debt",
                                "Supplier payment",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is an audit?",
                                "A review of financial records",
                                "A sales transaction",
                                "A software installation",
                                "A customer complaint",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "Which of these is a current asset?",
                                "Cash",
                                "Building",
                                "Long-term loan",
                                "Share capital",
                                "A",
                                financeDepartment
                        ),

                        createQuestion(
                                "What is the purpose of financial reporting?",
                                "To provide useful financial information",
                                "To create advertisements",
                                "To manage employees only",
                                "To build websites",
                                "A",
                                financeDepartment
                        )
                );

                // Save all Finance questions.
                questionRepository.saveAll(financeQuestions);

                System.out.println(
                        "20 Finance questions inserted successfully."
                );
            }

            /*
             * Create General Ledger questions only if the
             * General Ledger department does not already have questions.
             */
            if (questionRepository
                    .findByDepartmentId(glDepartment.getId())
                    .isEmpty()) {

                List<Question> glQuestions = List.of(

                        createQuestion(
                                "What is a general ledger?",
                                "A collection of all financial accounts",
                                "A customer list",
                                "An employee database",
                                "A sales report only",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "What does GL stand for in accounting?",
                                "General Ledger",
                                "General Liability",
                                "Gross Loss",
                                "General Loan",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "Which account records cash transactions?",
                                "Cash Account",
                                "Salary Account",
                                "Sales Order",
                                "Inventory Report",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "What is a journal entry?",
                                "A record of a financial transaction",
                                "A customer complaint",
                                "An employee record",
                                "A purchase request",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "A debit entry is recorded on which side?",
                                "Left side",
                                "Right side",
                                "Both sides always",
                                "Neither side",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "A credit entry is recorded on which side?",
                                "Left side",
                                "Right side",
                                "Both sides always",
                                "Neither side",
                                "B",
                                glDepartment
                        ),

                        createQuestion(
                                "What is a trial balance used for?",
                                "Checking whether debit and credit totals agree",
                                "Calculating employee attendance",
                                "Managing inventory only",
                                "Creating invoices",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "What is a debit?",
                                "An accounting entry on the debit side",
                                "Only a bank withdrawal",
                                "Company profit",
                                "Company revenue",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "What is a credit?",
                                "An accounting entry on the credit side",
                                "Only a bank deposit",
                                "Company expense",
                                "Company loss",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "Which account represents amounts due from customers?",
                                "Accounts Receivable",
                                "Accounts Payable",
                                "Capital",
                                "Expense",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "Which account represents amounts owed to suppliers?",
                                "Accounts Receivable",
                                "Accounts Payable",
                                "Cash",
                                "Revenue",
                                "B",
                                glDepartment
                        ),

                        createQuestion(
                                "What is reconciliation?",
                                "Comparing two sets of records to identify differences",
                                "Creating a new employee",
                                "Deleting financial records",
                                "Creating a website",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "What is a balance sheet?",
                                "A statement showing assets, liabilities and equity",
                                "A list of employees",
                                "A sales invoice",
                                "A bank password",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "What is an accounting period?",
                                "A period for which financial transactions are reported",
                                "A bank holiday",
                                "A customer contract",
                                "A software version",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "Which account normally has a debit balance?",
                                "Asset",
                                "Revenue",
                                "Liability",
                                "Capital",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "Which account normally has a credit balance?",
                                "Asset",
                                "Expense",
                                "Liability",
                                "Cash",
                                "C",
                                glDepartment
                        ),

                        createQuestion(
                                "What is closing balance?",
                                "The balance remaining at the end of an accounting period",
                                "The opening balance only",
                                "Total sales only",
                                "Total purchases only",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "What is opening balance?",
                                "The balance brought forward from the previous period",
                                "The final balance",
                                "The tax amount",
                                "The profit amount",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "Which record contains individual account transactions?",
                                "Ledger",
                                "Invoice",
                                "Purchase Order",
                                "Payroll",
                                "A",
                                glDepartment
                        ),

                        createQuestion(
                                "Why are journal entries posted to the general ledger?",
                                "To update individual financial accounts",
                                "To create employee profiles",
                                "To send emails",
                                "To manage application users",
                                "A",
                                glDepartment
                        )
                );

                // Save all General Ledger questions.
                questionRepository.saveAll(glQuestions);

                System.out.println(
                        "20 General Ledger questions inserted successfully."
                );
            }

            // Display the final question count for verification.
            System.out.println(
                    "Total questions in database: "
                            + questionRepository.count()
            );
        };
    }

    // Helper method used to create a Question object.
    // This avoids repeating the same setter code for every question.
    private Question createQuestion(
            String questionText,
            String optionA,
            String optionB,
            String optionC,
            String optionD,
            String correctAnswer,
            Department department) {

        Question question = new Question();

        question.setQuestionText(questionText);
        question.setOptionA(optionA);
        question.setOptionB(optionB);
        question.setOptionC(optionC);
        question.setOptionD(optionD);
        question.setCorrectAnswer(correctAnswer);
        question.setDepartment(department);

        return question;
    }
}