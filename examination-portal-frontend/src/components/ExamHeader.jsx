const ExamHeader = ({
  formattedTime,
  isTimerWarning,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      {/* Compact header container */}
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-5 lg:px-6">

        {/* Examination title */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
            Examination Portal
          </h1>

          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Online Assessment
          </p>
        </div>

        {/* Timer */}
        <div
          className={`rounded-xl border px-4 py-2 text-center shadow-sm sm:px-5 ${
            isTimerWarning
              ? "border-red-300 bg-red-50"
              : "border-blue-200 bg-blue-50"
          }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-wider sm:text-xs ${
              isTimerWarning
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            Time Remaining
          </p>

          <p
            className={`mt-0.5 text-xl font-bold tabular-nums sm:text-2xl ${
              isTimerWarning
                ? "text-red-600"
                : "text-blue-700"
            }`}
          >
            {formattedTime}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;
