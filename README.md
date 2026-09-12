# Examination & Assessment Portal

A full-stack Examination and Assessment Portal developed using **React.js, Spring Boot, Spring Security, Spring Data JPA, Hibernate, and MySQL**.

The application allows candidates to log in using database-based credentials, attend department-specific examinations, answer questions within a 30-minute time limit, and submit their examination.

The system also provides browser/tab-switch detection, question-level answer storage, automatic score calculation, and a Manager Dashboard for monitoring candidate examination results.

---

# Main Workflow

```text
Candidate Login
       ↓
Department Identification
       ↓
Start Examination
       ↓
Department-Specific Questions
       ↓
30-Minute Timer
       ↓
Answer Questions
       ↓
Tab-Switch Detection
       ↓
Submit Examination
       ↓
Score Calculation
       ↓
Save Answers and Results to MySQL
       ↓
Manager Dashboard
```

---

# Technology Stack

## Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router DOM
* Axios
* React Icons
* Vite

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* Maven

## Database

* MySQL

## Development Tools

* IntelliJ IDEA
* Visual Studio Code
* Git
* GitHub
* MySQL Workbench

---

# Architecture

The application follows a **three-layer full-stack architecture**.

```text
                    Examination Portal
                           |
             +-------------+-------------+
             |                           |
       React Frontend              Spring Boot Backend
             |                           |
       React Router                  REST APIs
       Tailwind CSS                 Spring Security
       Axios                        Spring Data JPA
       React Components             Hibernate
             |                           |
             +-------------+-------------+
                           |
                         MySQL
                           |
        +------------------+------------------+
        |                  |                  |
       Users            Questions          Answers
        |                  |                  |
        +------------------+------------------+
                           |
                    Exam Attempts
                           |
                         Results
```

## Frontend Layer

The React frontend provides the user interface for candidates and managers.

It handles:

* Login pages
* Candidate dashboard
* Manager dashboard
* Examination interface
* Question navigation
* Timer display
* Answer selection
* Tab-switch detection
* Candidate creation
* Result display for managers

Axios is used to communicate with the Spring Boot backend through REST APIs.

## Backend Layer

The Spring Boot backend contains the application business logic.

It handles:

* Authentication
* Authorization
* Candidate and manager management
* Department mapping
* Question retrieval
* Examination attempts
* Answer storage
* Timer-related examination logic
* Tab-switch/disqualification handling
* Score calculation
* Result storage
* Manager result retrieval

Spring Security is used for authentication and access control.

Spring Data JPA and Hibernate are used to communicate with MySQL.

## Database Layer

MySQL stores all persistent application data.

The main database tables are:

```text
users
departments
questions
answers
exam_attempts
results
```

---

# Project Structure

```text
examination-portal/

│
├── .gitignore
├── README.md
│
├── database/
│   └── examination_portal.sql
│
├── examination-portal-backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
└── examination-portal-frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

## Folder Purpose

| Folder/File                   | Purpose                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `examination-portal-backend`  | Spring Boot REST API, authentication, business logic and database operations |
| `examination-portal-frontend` | React user interface                                                         |
| `database`                    | Database setup SQL script                                                    |
| `README.md`                   | Project documentation and setup instructions                                 |
| `.gitignore`                  | Prevents unnecessary files and sensitive configuration from being committed  |

---

# Prerequisites

Before running the project, install the following software.

## 1. Java JDK 21

The backend requires Java 21.

Verify the installation:

```bash
java -version
```

The output should show Java 21.

Example:

```text
java version "21..."
```

---

## 2. MySQL Server

MySQL is used as the application database.

Install:

* MySQL Server
* MySQL Workbench

Make sure the MySQL Server is running before starting the backend.

Open MySQL Workbench and connect to your local MySQL server.

---

## 3. Node.js and npm

Node.js is required to run the React frontend.

Install Node.js version 20 or later.

Verify:

```bash
node -v
```

Then:

```bash
npm -v
```

Both commands should display installed versions.

> npm is installed automatically with Node.js.

---

## 4. Git

Git is used for source-code version control and GitHub.

Verify:

```bash
git --version
```

---

# Recommended Development Tools

The project can be developed and run using:

* Visual Studio Code
* IntelliJ IDEA

### Backend

The Spring Boot backend can be run directly using IntelliJ IDEA or Visual Studio Code.

### Frontend

The React frontend can be run using the integrated terminal in VS Code or IntelliJ IDEA.

---

# VS Code Extensions

If using Visual Studio Code, the following extensions are recommended.

## 1. Extension Pack for Java

Publisher:

```text
Microsoft
```

This provides Java development support in VS Code.

## 2. Spring Boot Extension Pack

Publisher:

```text
VMware
```

This provides Spring Boot development support.

These extensions make it easier to open, run and debug the Spring Boot backend.

## Frontend Extensions

No special extension is required to run the React frontend.

The React application can be installed and started using npm commands.

---

# Database Setup

The application uses the following MySQL database:

```text
examination_portal
```

A database setup script is also included in:

```text
database/examination_portal.sql
```

## Step 1: Start MySQL

Open MySQL Workbench and connect to your local MySQL server.

---

## Step 2: Create the Database

Run:

```sql
CREATE DATABASE IF NOT EXISTS examination_portal;
```

---

## Step 3: Select the Database

Run:

```sql
USE examination_portal;
```

---

## Step 4: Database Tables

The backend uses Spring Data JPA and Hibernate.

The backend contains:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Therefore, when the Spring Boot application starts, Hibernate automatically creates or updates the required tables based on the application's entity classes.

The main tables are:

```text
users
departments
questions
answers
exam_attempts
results
```

Verify the tables using:

```sql
SHOW TABLES;
```

---

# Database Configuration

The backend database configuration is located at:

```text
examination-portal-backend/
└── src/
    └── main/
        └── resources/
            └── application.properties
```

The configuration should contain:

```properties
spring.application.name=examination-portal-backend

spring.datasource.url=jdbc:mysql://localhost:3306/examination_portal

spring.datasource.username=root

spring.datasource.password=your_db_pwd

spring.jpa.hibernate.ddl-auto=update
```

## Configuration Explanation

| Property                               | Purpose                                  |
| -------------------------------------- | ---------------------------------------- |
| `spring.datasource.url`                | Connects Spring Boot to MySQL            |
| `spring.datasource.username`           | MySQL username                           |
| `spring.datasource.password`           | MySQL password                           |
| `spring.jpa.hibernate.ddl-auto=update` | Automatically creates/updates JPA tables |

## MySQL Password
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```
---

# Backend Setup

The backend is located inside:

```text
examination-portal-backend
```

It is a Spring Boot application.

---

# Method 1: Run Backend Using Visual Studio Code

## Step 1: Open the Backend

Open this folder in VS Code:

```text
examination-portal-backend
```

---

## Step 2: Install Recommended Extensions

Install:

```text
Extension Pack for Java
Spring Boot Extension Pack
```

---

## Step 3: Open the Main Java Class

Go to:

```text
src/main/java/com/examinationportal/ExaminationPortalBackendApplication.java
```

The main class contains the Spring Boot application entry point.

You should see:

```text
Run | Debug
```

above the `main()` method.

---

## Step 4: Start the Backend

Click:

```text
Run
```

VS Code will start the Spring Boot application.

The backend runs on:

```text
http://localhost:8080
```

The terminal should show that the Spring Boot application has started successfully.

---

# Backend Using IntelliJ IDEA

The backend can also be run using IntelliJ IDEA.

## Step 1

Open:

```text
examination-portal-backend
```

in IntelliJ IDEA.

## Step 2

Open:

```text
ExaminationPortalBackendApplication.java
```

## Step 3

Click the green **Run** button next to the `main()` method.

The backend will start on:

```text
http://localhost:8080
```

---

# Maven Backend Command

If Maven is installed and configured in the system PATH, the backend can also be started from a terminal.

Open the backend folder:

```bash
cd examination-portal-backend
```

Then run:

```bash
mvn spring-boot:run
```

## Important

Maven command-line execution is optional.

The backend can be run directly from IntelliJ IDEA or VS Code using the Spring Boot main class.

---

# Frontend Setup

The frontend is located inside:

```text
examination-portal-frontend
```

The frontend is a React application created using Vite.

---

# Step 1: Open the Frontend

Open:

```text
examination-portal-frontend
```

in VS Code or IntelliJ IDEA.

---

# Step 2: Open the Terminal

Open the integrated terminal.

Make sure the terminal is inside:

```text
examination-portal-frontend
```

If required:

```bash
cd examination-portal-frontend
```

---

# Step 3: Install Frontend Dependencies

Run:

```bash
npm install
```

This command reads:

```text
package.json
```

and downloads all required frontend packages into:

```text
node_modules
```

The project dependencies include packages such as:

* React
* React Router DOM
* Axios
* React Icons
* Tailwind CSS

## Important

You do **not** need to install each package separately.

Just run:

```bash
npm install
```

after downloading or cloning the project.

---

# Step 4: Start the Frontend

After `npm install` finishes, run:

```bash
npm run dev
```

Vite will start the React development server.

The terminal will display a URL similar to:

```text
http://localhost:5173
```

Open the displayed URL in a browser.

---

# Running Backend and Frontend Together

Both applications must be running at the same time.

## Terminal / Window 1 — Backend

Start:

```text
ExaminationPortalBackendApplication.java
```

Backend:

```text
http://localhost:8080
```

---

## Terminal / Window 2 — Frontend

Open another terminal.

Navigate to:

```bash
cd examination-portal-frontend
```

Run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Complete Startup Flow

For a fresh project setup:

```text
1. Install Java 21
        ↓
2. Install MySQL
        ↓
3. Install Node.js
        ↓
4. Create examination_portal database
        ↓
5. Configure application.properties
        ↓
6. Start Spring Boot backend
        ↓
7. Start MySQL
        ↓
8. Open examination-portal-frontend
        ↓
9. Run npm install
        ↓
10. Run npm run dev
        ↓
11. Open http://localhost:5173
        ↓
12. Login and test the application
```

For subsequent runs, `npm install` is normally not required again unless dependencies change or `node_modules` has been removed.

---

# Important Ports

| Application         |   Port |
| ------------------- | -----: |
| React Frontend      | `5173` |
| Spring Boot Backend | `8080` |
| MySQL               | `3306` |

The frontend communicates with the backend through REST APIs.

```text
Browser
   ↓
React Frontend
   ↓
Axios
   ↓
Spring Boot REST APIs
   ↓
Spring Security
   ↓
Spring Data JPA / Hibernate
   ↓
MySQL
```

---

# Department-Based Examination

The portal supports three departments:

```text
IT Team
Finance Team
General Ledger Team
```

Each department has its own examination question set.

The department is assigned to the candidate when the candidate is created by a manager.

The examination questions are then retrieved based on the candidate's department.

## Department Flow

```text
IT Manager
    ↓
Creates Candidate
    ↓
Candidate belongs to IT Team
    ↓
IT Examination Questions
```

```text
Finance Manager
    ↓
Creates Candidate
    ↓
Candidate belongs to Finance Team
    ↓
Finance Examination Questions
```

```text
GL Manager
    ↓
Creates Candidate
    ↓
Candidate belongs to General Ledger Team
    ↓
General Ledger Examination Questions
```

Each department is required to contain at least 20 examination questions.

---

# Key Features

## Candidate Features

* Database-based candidate authentication
* Unique candidate login credentials
* Department-based examination
* Separate question sets for IT, Finance and General Ledger
* Minimum 20 questions per department
* 30-minute examination timer
* Question navigation
* Answer selection
* Question-level answer storage
* Automatic submission when the examination time expires
* Browser/tab-switch detection
* Candidate disqualification after repeated tab switching
* Automatic score calculation
* Examination results stored in MySQL
* Candidate does not directly receive the examination score

---

# Manager Features

* Secure manager login
* Department-specific manager accounts
* Create candidates
* Automatically generate candidate login credentials
* Assign candidates to the manager's department
* View registered candidates
* View candidate department
* View examination status
* View examination scores
* View correct answers count
* View incorrect answers count
* View unanswered questions
* Monitor candidate examination results

---

# Database Features

* Candidate information stored in MySQL
* Manager information stored in MySQL
* Department information stored in MySQL
* Questions stored department-wise
* Candidate answers stored in the `answers` table
* Examination attempts stored in `exam_attempts`
* Calculated results stored in `results`
* JPA/Hibernate relationships between entities

---

# Database Schema

The application uses MySQL with the following main tables:

| Table           | Purpose                                               |
| --------------- | ----------------------------------------------------- |
| `users`         | Stores candidate and manager information              |
| `departments`   | Stores department information                         |
| `questions`     | Stores department-specific examination questions      |
| `answers`       | Stores selected answers for individual questions      |
| `exam_attempts` | Stores examination attempt and submission information |
| `results`       | Stores calculated examination results                 |

---

# Answers Table

The `answers` table is an important part of the examination workflow.

It stores the candidate's selected answer for each question during an examination attempt.

This allows the system to maintain individual question-level responses for every candidate.

Conceptually:

```text
Candidate
    ↓
Exam Attempt
    ↓
Question 1 → Selected Answer
Question 2 → Selected Answer
Question 3 → Selected Answer
...
Question 20 → Selected Answer
```

This allows the application to maintain answer data for multiple candidates and examination attempts.

---

# API and Application Communication

The React frontend communicates with the Spring Boot backend using REST APIs.

## Login Flow

```text
Candidate enters username and password
                ↓
React Login Page
                ↓
Axios POST Request
                ↓
Spring Boot Authentication API
                ↓
Spring Security
                ↓
MySQL users table
                ↓
Authentication Response
                ↓
Candidate Dashboard
```

## Examination Flow

```text
Candidate starts examination
            ↓
Backend identifies candidate department
            ↓
Department-specific questions retrieved
            ↓
React displays questions
            ↓
Candidate selects answers
            ↓
Answers stored
            ↓
Candidate submits examination
            ↓
Backend calculates score
            ↓
Result saved to database
            ↓
Manager can view result
```

---

# Sample Login Credentials

## Manager Login Credentials

The application provides a manager account for each department.

| Department          | Username         | Password        |
| ------------------- | ---------------- | --------------- |
| IT Team             | `itmanager`      | `IT@12345`      |
| Finance Team        | `financemanager` | `Finance@12345` |
| General Ledger Team | `glmanager`      | `GL@12345`      |

These manager accounts are automatically created by the backend `DataInitializer` when the application starts, if they do not already exist.

---

# Candidate Login Credentials

Candidate credentials are generated automatically by the application.

There are no fixed candidate credentials that need to be hardcoded in this README.

The manager creates a candidate from the Manager Dashboard.

The system then:

1. Creates the candidate account.
2. Assigns the candidate to the manager's department.
3. Generates the candidate username.
4. Generates the candidate password.
5. Displays the generated credentials to the manager.
6. The manager can provide those credentials to the candidate.

---

# Candidate Creation Flow

```text
Manager Login
      ↓
Manager Dashboard
      ↓
Create Candidate
      ↓
Enter Candidate Name
      ↓
System Creates Candidate Account
      ↓
Username + Password Generated
      ↓
Candidate Assigned to Manager's Department
      ↓
Manager Shares Credentials
      ↓
Candidate Login
      ↓
Department-Specific Examination
```

For example:

```text
IT Manager
    ↓
Create Candidate
    ↓
IT Team Candidate
    ↓
IT Examination
```

```text
Finance Manager
    ↓
Create Candidate
    ↓
Finance Team Candidate
    ↓
Finance Examination
```

```text
GL Manager
    ↓
Create Candidate
    ↓
General Ledger Team Candidate
    ↓
General Ledger Examination
```

---

# Examination Rules

The examination follows these rules:

```text
Number of questions:
20 or more per department

Examination duration:
30 minutes

Question type:
Department-specific MCQs

Answer storage:
Database

Score:
Calculated by backend

Result visibility:
Manager Dashboard

Time expiry:
Automatic submission

Browser/tab switching:
Detected by application
```

---

# Tab-Switch Detection

The application monitors browser visibility changes during the examination.

The candidate is warned when switching away from the examination page.

Repeated tab switching can result in candidate disqualification according to the application's examination rules.

The purpose of this feature is to discourage candidates from leaving the examination page during the assessment.
---

# Troubleshooting

## Backend Does Not Start

Check the following:

* Java 21 is installed.
* MySQL Server is running.
* `examination_portal` database exists.
* MySQL username is correct.
* MySQL password is correct.
* Port `8080` is not being used by another application.

Check Java:

```bash
java -version
```

---

# Frontend Does Not Start

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

Navigate to the frontend:

```bash
cd examination-portal-frontend
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

---

# `npm` Is Not Recognized

If the terminal shows:

```text
npm is not recognized
```

install Node.js and restart VS Code or the terminal.

Then verify:

```bash
node -v
npm -v
```

---

# `mvn` Is Not Recognized

If the terminal shows:

```text
mvn is not recognized
```

Maven is not available in the system PATH.

This does not prevent the application from being run.

Use IntelliJ IDEA or VS Code and run:

```text
ExaminationPortalBackendApplication.java
```

using the **Run** button.

---

# Backend Connects to the Wrong Database

Check:

```text
examination-portal-backend/
└── src/
    └── main/
        └── resources/
            └── application.properties
```

Make sure the database URL contains:

```text
jdbc:mysql://localhost:3306/examination_portal
```

---

# Port 8080 Is Already in Use

If another application is using port `8080`, stop that application before starting the backend.

Alternatively, configure a different Spring Boot port and update the frontend API configuration accordingly.

---

# Port 5173 Is Already in Use

If Vite reports that port `5173` is already in use, Vite may automatically select another available port.

Open the URL displayed in the terminal.

---
# Project Summary

This project demonstrates a complete end-to-end examination system.

The complete workflow is:

```text
Manager
   ↓
Create Candidate
   ↓
Generate Candidate Credentials
   ↓
Candidate Login
   ↓
Department Identification
   ↓
Department-Specific Examination
   ↓
20+ Questions
   ↓
30-Minute Timer
   ↓
Answer Questions
   ↓
Answer Storage
   ↓
Tab-Switch Detection
   ↓
Submission
   ↓
Score Calculation
   ↓
Database Storage
   ↓
Manager Dashboard
   ↓
Candidate Result Monitoring
```

The application uses:

```text
React.js
    ↓
Axios
    ↓
Spring Boot REST API
    ↓
Spring Security
    ↓
Spring Data JPA
    ↓
Hibernate
    ↓
MySQL
```