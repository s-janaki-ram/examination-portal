const QuestionNavigator = ({
  questions,
  answers,
  currentQuestion,
  onQuestionSelect,
}) => {
  return (
    <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:sticky xl:top-20">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4">

        <h3 className="text-base font-bold text-slate-800">
          Question Navigator
        </h3>

        <p className="mt-0.5 text-xs text-slate-500">
          Click a number to move to that question.
        </p>

      </div>


      {/* =====================================================
          QUESTION NUMBERS
      ===================================================== */}

      <div className="grid grid-cols-5 gap-2">

        {questions.map((question, index) => {

          // Check whether this question has been answered
          const isAnswered = answers[question.id];

          // Check whether this is the currently selected question
          const isCurrent = currentQuestion === index;

          return (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition ${
                isCurrent
                  ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-100"
                  : isAnswered
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          );
        })}

      </div>


      {/* =====================================================
          LEGEND
      ===================================================== */}

      <div className="mt-5 space-y-2.5 border-t border-slate-200 pt-4">

        {/* Current question */}
        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded bg-blue-600"></span>

          <span className="text-xs text-slate-600">
            Current question
          </span>

        </div>


        {/* Answered */}
        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded bg-green-100"></span>

          <span className="text-xs text-slate-600">
            Answered
          </span>

        </div>


        {/* Not answered */}
        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded bg-slate-100"></span>

          <span className="text-xs text-slate-600">
            Not answered
          </span>

        </div>

      </div>

    </aside>
  );
};

export default QuestionNavigator;