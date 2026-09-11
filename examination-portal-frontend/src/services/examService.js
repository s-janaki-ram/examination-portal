import api from "./api";

// Start a new examination
export const startExam = async () => {
  const response = await api.post("/exam/start");

  return response.data;
};

// Submit the examination
export const submitExam = async (
  attemptId,
  answers
) => {
  const response = await api.post("/exam/submit", {
    attemptId,
    answers,
  });

  return response.data;
};

// Inform backend about a tab switch
export const recordTabSwitch = async (attemptId) => {
  const response = await api.post(
    "/exam/tab-switch",
    {
      attemptId,
    }
  );

  return response.data;
};

// Check current examination status
export const getExamStatus = async () => {
  const response = await api.get("/exam/status");

  return response.data;
};