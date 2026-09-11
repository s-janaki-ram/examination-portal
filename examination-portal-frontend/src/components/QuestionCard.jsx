const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerChange,
  onPrevious,
  onNext,
  onSubmit,
  submitting,
}) => {

  // If there is no question, don't render the card
  if (!question) {
    return null;
  }

  // ---------------------------------------------------------
  // REUSABLE OPTION COMPONENT
  // ---------------------------------------------------------

  const Option = ({
    letter,
    text,
  }) => {

    // Check whether this option is selected
    const selected = selectedAnswer === letter;

    return (
      <label
        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
          selected
            ? "border-blue-500 bg-blue-50 shadow-sm"
            : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
        }`}
      >

        {/* Radio button */}
        <input
          type="radio"
          name={`question-${question.id}`}
          value={letter}
          checked={selected}
          onChange={() =>
            onAnswerChange(
              question.id,
              letter
            )
          }
          className="h-4 w-4 shrink-0 accent-blue-600"
        />

        {/* Option letter */}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
          {letter}
        </span>

        {/* Option text */}
        <span className="text-sm font-medium leading-relaxed text-slate-700">
          {text}
        </span>

      </label>
    );
  };

  // ---------------------------------------------------------
  // MAIN QUESTION CARD
  // ---------------------------------------------------------

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* =====================================================
          QUESTION HEADER
      ===================================================== */}

      <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">

        <div>

          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Question
          </p>

          <h3 className="mt-0.5 text-xl font-bold text-slate-800">

            {currentIndex + 1}

            <span className="mx-1.5 text-slate-400">
              /
            </span>

            {totalQuestions}

          </h3>

        </div>

      </div>


      {/* =====================================================
          QUESTION TEXT
      ===================================================== */}

      <h2 className="max-w-5xl text-lg font-semibold leading-relaxed text-slate-800 lg:text-xl">
        {question.questionText}
      </h2>


      {/* =====================================================
          OPTIONS
      ===================================================== */}

      <div className="mt-5 space-y-2.5">

        <Option
          letter="A"
          text={question.optionA}
        />

        <Option
          letter="B"
          text={question.optionB}
        />

        <Option
          letter="C"
          text={question.optionC}
        />

        <Option
          letter="D"
          text={question.optionD}
        />

      </div>


      {/* =====================================================
          NAVIGATION BUTTONS
      ===================================================== */}

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Previous button */}
        <button
          onClick={onPrevious}
          disabled={
            currentIndex === 0 ||
            submitting
          }
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>


        {/* Next / Submit button */}

        {currentIndex < totalQuestions - 1 ? (

          <button
            onClick={onNext}
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next →
          </button>

        ) : (

          <button
            onClick={onSubmit}
            disabled={submitting}
            className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Submitting..."
              : "Submit Exam ✓"}
          </button>

        )}

      </div>

    </section>
  );
};

export default QuestionCard;
