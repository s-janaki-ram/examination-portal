import { useEffect } from "react";
import { recordTabSwitch } from "../services/examService";

const useTabSwitchDetection = ({
  attemptId,
  active,
  onFirstSwitch,
  onDisqualified,
}) => {

  useEffect(() => {

    if (!attemptId || !active) {
      return;
    }

    const handleVisibilityChange =
      async () => {

        // Detect only when page becomes hidden
        if (
          document.visibilityState !==
          "hidden"
        ) {
          return;
        }

        try {

          // Inform backend
          const message =
            await recordTabSwitch(
              attemptId
            );

          // First tab switch
          if (
            message ===
            "Warning: First tab switch detected"
          ) {

            onFirstSwitch();

            return;
          }

          // Second tab switch
          if (
            message ===
            "Candidate disqualified"
          ) {

            onDisqualified();
          }

        } catch (error) {

          console.error(
            "Unable to record tab switch:",
            error
          );
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

    };

  }, [
    attemptId,
    active,
    onFirstSwitch,
    onDisqualified,
  ]);
};

export default useTabSwitchDetection;