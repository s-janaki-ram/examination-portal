import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  startExam,
  submitExam,
} from "../services/examService";

import useExamTimer from "./useExamTimer";
import useTabSwitchDetection from "./useTabSwitchDetection";

const useExam = ({
  onSubmitted,
  onDisqualified,
}) => {

  // Questions received from backend
  const [questions, setQuestions] =
    useState([]);

  // Current attempt ID
  const [attemptId, setAttemptId] =
    useState(null);

  // Selected answers
  const [answers, setAnswers] =
    useState({});

  // Latest answers for auto-submit
  const answersRef =
    useRef({});

  // Current question
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  // Loading state
  const [loading, setLoading] =
    useState(true);

  // Error state
  const [error, setError] =
    useState("");

  // Backend end time
  const [endTime, setEndTime] =
    useState(null);

  // Tab switch count
  const [tabSwitchCount, setTabSwitchCount] =
    useState(0);

  // Tab warning
  const [tabSwitchMessage, setTabSwitchMessage] =
    useState("");

  // Submission state
  const [submitting, setSubmitting] =
    useState(false);

  // Prevent duplicate submit
  const hasSubmitted =
    useRef(false);

  // Prevent duplicate start
  const hasStartedExam =
    useRef(false);

  // Whether exam is active
  const isExamActive =
    useRef(false);

  // ---------------------------------------------------------
  // SUBMIT EXAM
  // ---------------------------------------------------------

  const handleSubmitExam =
    useCallback(async () => {

      // Prevent duplicate submission
      if (hasSubmitted.current) {
        return;
      }

      if (!attemptId) {
        return;
      }

      hasSubmitted.current = true;
      isExamActive.current = false;

      try {

        setSubmitting(true);

        // Get latest answers
        const latestAnswers =
          answersRef.current;

        // Convert object into API array
        const answerList =
          Object.entries(
            latestAnswers
          ).map(
            ([questionId, selectedAnswer]) => ({
              questionId:
                Number(questionId),

              selectedAnswer,
            })
          );

        // Submit to backend
        await submitExam(
          attemptId,
          answerList
        );

        // Inform page that submission succeeded
        if (onSubmitted) {
          onSubmitted();
        }

      } catch (error) {

        console.error(
          "Exam submission failed:",
          error
        );

        // Allow retry if API failed
        hasSubmitted.current = false;
        isExamActive.current = true;

        throw error;

      } finally {

        setSubmitting(false);
      }

    }, [
      attemptId,
      onSubmitted,
    ]);

  // ---------------------------------------------------------
  // START EXAM
  // ---------------------------------------------------------

  useEffect(() => {

    if (hasStartedExam.current) {
      return;
    }

    hasStartedExam.current = true;

    const initializeExam =
      async () => {

        try {

          const data =
            await startExam();

          setAttemptId(
            data.attemptId
          );

          setQuestions(
            data.questions || []
          );

          setEndTime(
            data.endTime
          );

          isExamActive.current = true;

        } catch (error) {

          console.error(
            "Unable to start exam:",
            error
          );

          setError(
            error.response?.data?.message ||
            error.response?.data ||
            "Unable to start the exam."
          );

          hasStartedExam.current =
            false;

        } finally {

          setLoading(false);
        }
      };

    initializeExam();

  }, []);

  // ---------------------------------------------------------
  // TIMER
  // ---------------------------------------------------------

  const handleTimeUp =
    useCallback(() => {

      if (
        !hasSubmitted.current &&
        isExamActive.current
      ) {

        handleSubmitExam()
          .catch(() => {
            // Error is handled by the page
          });
      }

    }, [handleSubmitExam]);

  const timer =
    useExamTimer({
      endTime,
      onTimeUp: handleTimeUp,
      active: isExamActive.current,
    });

  // ---------------------------------------------------------
  // TAB SWITCH
  // ---------------------------------------------------------

  const handleFirstSwitch =
    useCallback(() => {

      setTabSwitchCount(1);

      setTabSwitchMessage(
        "Warning: First tab switch detected. Do not switch tabs again."
      );

    }, []);

  const handleDisqualification =
    useCallback(() => {

      setTabSwitchCount(2);

      setTabSwitchMessage(
        "You have been disqualified."
      );

      isExamActive.current = false;
      hasSubmitted.current = true;

      if (onDisqualified) {
        onDisqualified();
      }

    }, [onDisqualified]);

  useTabSwitchDetection({
    attemptId,
    active: isExamActive.current,
    onFirstSwitch:
      handleFirstSwitch,
    onDisqualified:
      handleDisqualification,
  });

  // ---------------------------------------------------------
  // ANSWER SELECTION
  // ---------------------------------------------------------

  const handleAnswerChange =
    useCallback(
      (questionId, selectedAnswer) => {

        setAnswers(
          (previousAnswers) => {

            const updatedAnswers = {
              ...previousAnswers,
              [questionId]:
                selectedAnswer,
            };

            answersRef.current =
              updatedAnswers;

            return updatedAnswers;
          }
        );

      },
      []
    );

  // ---------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------

  const handleNext = useCallback(() => {

    setCurrentQuestion(
      (previous) =>
        Math.min(
          previous + 1,
          questions.length - 1
        )
    );

  }, [questions.length]);

  const handlePrevious =
    useCallback(() => {

      setCurrentQuestion(
        (previous) =>
          Math.max(previous - 1, 0)
      );

    }, []);

  const handleQuestionSelect =
    useCallback((index) => {

      setCurrentQuestion(index);

    }, []);

  return {

    questions,
    attemptId,
    answers,
    currentQuestion,
    loading,
    error,
    endTime,

    tabSwitchCount,
    tabSwitchMessage,

    submitting,

    timer,

    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleQuestionSelect,
    handleSubmitExam,

  };
};

export default useExam;