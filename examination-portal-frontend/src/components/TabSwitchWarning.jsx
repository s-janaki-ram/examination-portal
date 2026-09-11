const TabSwitchWarning = ({
  count,
  message,
}) => {
  // Do not display the warning when there is no message
  if (!message) {
    return null;
  }

  return (
    <div
      className={`mb-4 rounded-lg border px-4 py-2.5 ${
        count >= 2
          ? "border-red-300 bg-red-50 text-red-700"
          : "border-yellow-300 bg-yellow-50 text-yellow-700"
      }`}
    >
      <div className="flex items-center gap-2.5">

        {/* Warning icon */}
        <span className="text-base">
          {count >= 2 ? "✕" : "⚠️"}
        </span>

        {/* Warning message */}
        <p className="text-sm font-semibold">
          {message}
        </p>

      </div>
    </div>
  );
};

export default TabSwitchWarning;
