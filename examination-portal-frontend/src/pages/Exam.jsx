import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useExam from "../hooks/useExam";

import ExamHeader from "../components/ExamHeader";
import ExamInfo from "../components/ExamInfo";
import TabSwitchWarning from "../components/TabSwitchWarning";
import QuestionCard from "../components/QuestionCard";
import QuestionNavigator from "../components/QuestionNavigator";

const Exam = () => {
  const navigate = useNavigate();

  // Handle successful submission
  const handleSubmitted = useCallback(() => {
    alert("Your exam has been submitted successfully.");

    navigate("/candidate", {
      replace: true,
    });
  }, [navigate]);

  // Handle disqualification
  const handleDisqualified = useCallback(() => {
    alert(
      "You have been disqualified because you switched tabs twice."
    );

    navigate("/candidate", {
      replace: true,
    });
  }, [navigate]);

  // Main exam hook
  const {
    questions,
    answers,
    currentQuestion,
    loading,
    error,

    tabSwitchCount,
    tabSwitchMessage,

    submitting,

    timer,

    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleQuestionSelect,
    handleSubmitExam,
  } = useExam({
    onSubmitted: handleSubmitted,
    onDisqualified: handleDisqualified,
  });

  // ---------------------------------------------------------
  // LOADING
  // ---------------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

        <div className="w-full max-w-sm rounded-xl bg-white px-8 py-7 text-center shadow-lg">

          {/* Loading spinner */}
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

          <h2 className="text-xl font-bold text-slate-800">
            Starting Exam
          </h2>

          <p className="mt-1.5 text-sm text-slate-500">
            Please wait while we prepare your examination.
          </p>

        </div>

      </div>
    );
  }

  // ---------------------------------------------------------
  // ERROR
  // ---------------------------------------------------------

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

        <div className="w-full max-w-md rounded-xl bg-white p-7 text-center shadow-lg">

          <div className="mb-3 text-4xl">
            ⚠️
          </div>

          <h2 className="text-xl font-bold text-red-600">
            Unable to Start Exam
          </h2>

          <p className="mt-3 text-sm text-slate-600">
            {error}
          </p>

          <button
            onClick={() => navigate("/candidate")}
            className="mt-5 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  // Current question
  const question = questions[currentQuestion];

  // Number of answered questions
  const answeredCount = Object.keys(answers).length;

  // ---------------------------------------------------------
  // MAIN UI
  // ---------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header + Timer */}
      <ExamHeader
        formattedTime={timer.formattedTime}
        isTimerWarning={timer.isWarning}
      />

      {/* Main exam container */}
      <main className="mx-auto max-w-[1500px] px-4 py-4 sm:px-5 lg:px-6">

        {/* Exam information */}
        <ExamInfo
          totalQuestions={questions.length}
          answeredCount={answeredCount}
        />

        {/* Tab switch warning */}
        <TabSwitchWarning
          count={tabSwitchCount}
          message={tabSwitchMessage}
        />

        {/* Exam layout */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_270px]">

          {/* Question section */}
          <QuestionCard
            question={question}
            currentIndex={currentQuestion}
            totalQuestions={questions.length}
            selectedAnswer={
              question
                ? answers[question.id]
                : null
            }
            onAnswerChange={handleAnswerChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={() => {
              const confirmSubmit = window.confirm(
                "Are you sure you want to submit the exam?"
              );

              if (confirmSubmit) {
                handleSubmitExam();
              }
            }}
            submitting={submitting}
          />

          {/* Question navigator */}
          <QuestionNavigator
            questions={questions}
            answers={answers}
            currentQuestion={currentQuestion}
            onQuestionSelect={handleQuestionSelect}
          />

        </div>

      </main>

    </div>
  );
};

export default Exam;
