import { useEffect, useState } from "react";

const useExamTimer = ({
  endTime,
  onTimeUp,
  active = true,
}) => {

  // Remaining time in seconds
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {

    if (!endTime || !active) {
      return;
    }

    const updateTimer = () => {

      // Convert backend end time into milliseconds
      const endTimeMilliseconds =
        new Date(endTime).getTime();

      // Get current browser time
      const currentTimeMilliseconds =
        Date.now();

      // Calculate remaining milliseconds
      const remainingMilliseconds =
        endTimeMilliseconds -
        currentTimeMilliseconds;

      // Convert milliseconds to seconds
      const remainingSeconds = Math.max(
        0,
        Math.floor(
          remainingMilliseconds / 1000
        )
      );

      setTimeLeft(remainingSeconds);

      // Execute callback when time reaches zero
      if (remainingSeconds === 0) {
        onTimeUp();
      }
    };

    // Run immediately
    updateTimer();

    // Update every second
    const timer = setInterval(
      updateTimer,
      1000
    );

    // Cleanup timer
    return () => {
      clearInterval(timer);
    };

  }, [endTime, active, onTimeUp]);

  // Convert seconds into minutes
  const minutes = Math.floor(
    timeLeft / 60
  );

  // Remaining seconds
  const seconds = timeLeft % 60;

  // Display MM:SS
  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

  return {
    timeLeft,
    minutes,
    seconds,
    formattedTime,
    isWarning: timeLeft <= 60,
  };
};

export default useExamTimer;