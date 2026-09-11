const ExamInfo = ({
  totalQuestions,
  answeredCount,
}) => {

  // Calculate unanswered questions
  const remaining =
    totalQuestions - answeredCount;

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        {/* =====================================================
            EXAM DESCRIPTION
        ===================================================== */}

        <div>

          <h2 className="text-lg font-bold text-slate-800">
            Assessment Examination
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Answer all questions carefully before submitting.
          </p>

        </div>


        {/* =====================================================
            EXAM STATISTICS
        ===================================================== */}

        <div className="flex flex-wrap gap-2">

          {/* Total Questions */}
          <div className="rounded-lg bg-slate-100 px-3 py-2">

            <span className="text-xs text-slate-500">
              Questions
            </span>

            <span className="ml-1.5 text-sm font-bold text-slate-800">
              {totalQuestions}
            </span>

          </div>


          {/* Answered */}
          <div className="rounded-lg bg-slate-100 px-3 py-2">

            <span className="text-xs text-slate-500">
              Answered
            </span>

            <span className="ml-1.5 text-sm font-bold text-green-600">
              {answeredCount}
            </span>

          </div>


          {/* Remaining */}
          <div className="rounded-lg bg-slate-100 px-3 py-2">

            <span className="text-xs text-slate-500">
              Remaining
            </span>

            <span className="ml-1.5 text-sm font-bold text-orange-600">
              {remaining}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ExamInfo;
