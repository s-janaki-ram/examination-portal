import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const CandidateDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Store the candidate's exam status
  const [examStatus, setExamStatus] = useState(null);

  // Loading state while checking the backend
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Get exam status when dashboard opens
  useEffect(() => {
    const checkExamStatus = async () => {
      try {
        const response = await api.get("/exam/status");

        // Save status received from backend
        setExamStatus(response.data);
      } catch (error) {
        console.error(
          "Unable to check exam status:",
          error
        );
      } finally {
        setLoadingStatus(false);
      }
    };

    checkExamStatus();
  }, []);

  // Logout candidate
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Start exam
  const handleStartExam = () => {
    navigate("/exam");
  };

  // Get department-specific assessment name
  const getAssessmentName = () => {
    if (user?.departmentName === "IT Team") {
      return "IT Team Assessment";
    }

    if (user?.departmentName === "Finance Team") {
      return "Finance Team Assessment";
    }

    if (user?.departmentName === "General Ledger Team") {
      return "General Ledger Team Assessment";
    }

    return "Examination Assessment";
  };

  // ---------------------------------------------------------
  // LOADING SCREEN
  // ---------------------------------------------------------

  if (loadingStatus) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

        <div className="rounded-xl bg-white px-7 py-6 text-center shadow">

          <p className="text-base font-semibold text-slate-700">
            Checking exam status...
          </p>

        </div>

      </div>
    );
  }

  // ---------------------------------------------------------
  // MAIN DASHBOARD
  // ---------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="flex items-center justify-between bg-white px-6 py-3 shadow">

        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Examination Portal
          </h1>

          <p className="text-xs text-slate-500">
            Candidate Dashboard
          </p>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Logout
        </button>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-4xl px-4 py-5 sm:px-5">

        {/* ===================================================
            CANDIDATE INFORMATION
        =================================================== */}

        <div className="mb-5 rounded-xl bg-white p-5 shadow">

          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Welcome, {user?.name}
          </h2>

          {/* Candidate information */}
          <div className="grid gap-3 md:grid-cols-3">

            {/* Name */}
            <div className="rounded-lg bg-slate-50 px-4 py-3">

              <p className="text-xs text-slate-500">
                Name
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-800">
                {user?.name}
              </p>

            </div>


            {/* Username */}
            <div className="rounded-lg bg-slate-50 px-4 py-3">

              <p className="text-xs text-slate-500">
                Username
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-800">
                {user?.username}
              </p>

            </div>


            {/* Department */}
            <div className="rounded-lg bg-slate-50 px-4 py-3">

              <p className="text-xs text-slate-500">
                Department
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-800">
                {user?.departmentName}
              </p>

            </div>

          </div>

        </div>


        {/* ===================================================
            EXAM CARD
        =================================================== */}

        <div className="rounded-xl bg-white p-5 shadow">

          {/* Assessment title */}
          <h2 className="mb-1.5 text-xl font-bold text-slate-800">
            {getAssessmentName()}
          </h2>

          <p className="mb-4 text-sm text-slate-600">
            Complete the assessment within the given time.
          </p>


          {/* =================================================
              EXAM INFORMATION
          ================================================= */}

          <div className="mb-5 grid gap-3 md:grid-cols-2">

            {/* Questions */}
            <div className="rounded-lg bg-slate-50 px-4 py-3">

              <p className="text-xs text-slate-500">
                Questions
              </p>

              <p className="mt-0.5 text-base font-bold text-slate-800">
                20 Questions
              </p>

            </div>


            {/* Duration */}
            <div className="rounded-lg bg-slate-50 px-4 py-3">

              <p className="text-xs text-slate-500">
                Duration
              </p>

              <p className="mt-0.5 text-base font-bold text-slate-800">
                30 Minutes
              </p>

            </div>

          </div>


          {/* =================================================
              NOT ATTEMPTED
          ================================================= */}

          {!examStatus?.attempted && (
            <button
              onClick={handleStartExam}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 text-base font-bold text-white transition hover:bg-blue-700"
            >
              Start Exam
            </button>
          )}


          {/* =================================================
              SUBMITTED
          ================================================= */}

          {examStatus?.attempted &&
            !examStatus?.disqualified &&
            (examStatus?.status === "SUBMITTED" ||
              examStatus?.status === "COMPLETED" ||
              examStatus?.status === "TIMEOUT") && (

              <div className="rounded-lg border border-green-200 bg-green-50 p-5 text-center">

                <div className="mb-2 text-3xl">
                  ✓
                </div>

                <h3 className="text-lg font-bold text-green-700">
                  Exam Submitted
                </h3>

                <p className="mt-1 text-sm text-green-600">
                  You have already completed the examination.
                </p>

              </div>
            )}


          {/* =================================================
              DISQUALIFIED
          ================================================= */}

          {examStatus?.attempted &&
            examStatus?.disqualified && (

              <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-center">

                <div className="mb-2 text-3xl">
                  ✕
                </div>

                <h3 className="text-lg font-bold text-red-700">
                  Exam Disqualified
                </h3>

                <p className="mt-1 text-sm text-red-600">
                  You were disqualified from the examination.
                </p>

              </div>
            )}

        </div>

      </main>

    </div>
  );
};

export default CandidateDashboard;

