import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiLogOut,
  FiPlus,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import CreateCandidate from "../components/CreateCandidate";

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // =========================================================
  // DASHBOARD DATA
  // =========================================================

  // Stores all candidates received from the backend
  const [candidates, setCandidates] = useState([]);

  // =========================================================
  // UI STATES
  // =========================================================

  // Shows loading message while candidates are being fetched
  const [loading, setLoading] = useState(true);

  // Stores API error messages
  const [error, setError] = useState("");

  // Stores search text
  const [search, setSearch] = useState("");

  // Controls Create Candidate modal
  const [showCreateCandidate, setShowCreateCandidate] =
    useState(false);

  // =========================================================
  // LOAD CANDIDATES
  // =========================================================

  // Gets candidates belonging to the logged-in manager's department
  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError("");

      // Call backend Manager API
      const response = await api.get("/manager/candidates");

      // Store returned candidates in state
      setCandidates(response.data);
    } catch (err) {
      console.error(err);

      // Display error if API request fails
      setError("Unable to load candidates");
    } finally {
      setLoading(false);
    }
  };

  // Load candidates when dashboard opens
  useEffect(() => {
    loadCandidates();
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    // Clear logged-in user information
    logout();

    // Navigate back to login page
    navigate("/login");
  };

  // =========================================================
  // SEARCH
  // =========================================================

  // Filter candidates using candidate name or username
  const filteredCandidates = useMemo(() => {
    const value = search.toLowerCase().trim();

    // If search box is empty, show all candidates
    if (!value) return candidates;

    return candidates.filter(
      (candidate) =>
        candidate.candidateName
          ?.toLowerCase()
          .includes(value) ||
        candidate.username
          ?.toLowerCase()
          .includes(value)
    );
  }, [candidates, search]);

  // =========================================================
  // DATE / TIME FORMAT
  // =========================================================

  // Converts backend LocalDateTime into readable date/time
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  // =========================================================
  // EXAM STATUS
  // =========================================================

  // Converts backend exam status into a readable label
  const getExamStatusLabel = (status) => {
    if (!status) return "-";

    switch (status) {
      case "NOT_STARTED":
        return "NOT STARTED";

      case "STARTED":
        return "IN PROGRESS";

      case "COMPLETED":
        return "COMPLETED";

      case "SUBMITTED":
        return "SUBMITTED";

      case "TIMEOUT":
        return "TIMEOUT";

      case "DISQUALIFIED":
        return "DISQUALIFIED";

      default:
        return status;
    }
  };

  // =========================================================
  // EXAM STATUS COLORS
  // =========================================================

  const statusClass = (status) => {
    if (
      status === "COMPLETED" ||
      status === "SUBMITTED"
    ) {
      return "bg-green-100 text-green-700";
    }

    if (status === "STARTED") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "TIMEOUT") {
      return "bg-orange-100 text-orange-700";
    }

    if (status === "DISQUALIFIED") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  // =========================================================
  // EXAM ATTEMPT
  // =========================================================

  // Shows whether candidate has started/attempted the exam
  const attempted = (candidate) => {
    return candidate.examStatus !== "NOT_STARTED"
      ? "YES"
      : "NO";
  };

  // =========================================================
  // DISQUALIFICATION
  // =========================================================

  // Checks whether candidate was disqualified
  const disqualified = (candidate) => {
    return (
      candidate.disqualified === true ||
      candidate.examStatus === "DISQUALIFIED" ||
      candidate.passFailStatus === "DISQUALIFIED"
    );
  };

  // =========================================================
  // RESULT / PASS-FAIL STATUS
  // =========================================================

  /*
   * The backend already calculates PASS / FAIL using:
   *
   * Percentage >= 60%  -> PASS
   * Percentage < 60%   -> FAIL
   *
   * We display the value returned by the backend.
   *
   * For a candidate who has not attempted the exam:
   * NOT_ATTEMPTED is displayed.
   */

  const getResultStatus = (candidate) => {
    // Disqualified candidates always show DISQUALIFIED
    if (disqualified(candidate)) {
      return "DISQUALIFIED";
    }

    // Candidate has not attempted the exam yet
    if (candidate.examStatus === "NOT_STARTED") {
      return "NOT_ATTEMPTED";
    }

    // If backend already calculated PASS / FAIL,
    // use that value.
    if (
      candidate.passFailStatus === "PASS" ||
      candidate.passFailStatus === "FAIL"
    ) {
      return candidate.passFailStatus;
    }

    // No result available yet
    return "-";
  };

  // =========================================================
  // RESULT COLORS
  // =========================================================

  const resultClass = (result) => {
    if (result === "PASS") {
      return "bg-green-100 text-green-700";
    }

    if (result === "FAIL") {
      return "bg-red-100 text-red-700";
    }

    if (result === "DISQUALIFIED") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-slate-200 bg-white shadow-sm">

        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-3">

          {/* Logo / Application Name */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              AssessPro
            </h1>

            <p className="text-xs text-slate-500">
              Manager Dashboard
            </p>
          </div>

          {/* Manager Information */}
          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="text-sm font-semibold text-slate-800">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                {user?.departmentName} Manager
              </p>

            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
            >
              <FiLogOut size={16} />
              Logout
            </button>

          </div>
        </div>

      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto w-full max-w-[1600px] px-6 py-6">

        {/* ===================================================
            WELCOME SECTION
        ==================================================== */}
        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Welcome, {user?.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View candidate examination details.
            </p>

          </div>

          {/* Create Candidate Button */}
          <button
            onClick={() =>
              setShowCreateCandidate(true)
            }
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FiPlus size={17} />
            Create Candidate
          </button>

        </div>

        {/* ===================================================
            CANDIDATE PERFORMANCE CARD
        ==================================================== */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

          {/* =================================================
              TABLE HEADER
          ================================================== */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

            {/* Title */}
            <div>

              <h3 className="text-xl font-bold text-slate-800">
                Candidate Performance
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {user?.departmentName} department
              </p>

            </div>

            {/* Search + Refresh */}
            <div className="flex items-center gap-2">

              {/* Search Box */}
              <div className="relative">

                <FiSearch
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search candidate..."
                  className="w-64 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500"
                />

              </div>

              {/* Refresh Button */}
              <button
                onClick={loadCandidates}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-slate-50"
                title="Refresh"
              >
                <FiRefreshCw size={16} />
              </button>

            </div>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================== */}
          {error && (
            <div className="m-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* =================================================
              LOADING STATE
          ================================================== */}
          {loading ? (

            <div className="p-10 text-center text-sm text-slate-500">
              Loading candidates...
            </div>

          ) : filteredCandidates.length === 0 ? (

            /* =================================================
               EMPTY STATE
            ================================================== */
            <div className="p-10 text-center text-sm text-slate-500">

              {search
                ? "No candidates match your search."
                : "No candidates found."}

            </div>

          ) : (

            /* =================================================
               RESPONSIVE TABLE
            ================================================== */
            <div className="w-full overflow-x-auto">

              <table className="w-full table-auto text-sm">

                {/* =================================================
                    TABLE HEADER
                ================================================== */}
                <thead className="bg-slate-50">

                  <tr>

                    {/* Candidate Name */}
                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold text-slate-600">
                      Candidate Name
                    </th>

                    {/* Username */}
                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold text-slate-600">
                      Username
                    </th>

                    {/* Department */}
                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold text-slate-600">
                      Department
                    </th>

                    {/* Exam Attempted */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Exam Attempted
                    </th>

                    {/* Exam Status */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Exam Status
                    </th>

                    {/* Score */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Score
                    </th>

                    {/* Total Questions */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Total
                    </th>

                    {/* Percentage */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Percentage
                    </th>

                    {/* PASS / FAIL */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Result
                    </th>

                    {/* Exam Started */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Exam Started
                    </th>

                    {/* Submitted */}
                    <th className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-slate-600">
                      Submitted
                    </th>

                  </tr>

                </thead>

                {/* =================================================
                    TABLE BODY
                ================================================== */}
                <tbody className="divide-y divide-slate-100">

                  {filteredCandidates.map((candidate) => {

                    // Check whether a result exists
                    const hasResult =
                      candidate.totalQuestions > 0;

                    // Check whether candidate was disqualified
                    const isDQ =
                      disqualified(candidate);

                    // Get PASS / FAIL / DISQUALIFIED status
                    const result =
                      getResultStatus(candidate);

                    return (

                      <tr
                        key={candidate.username}
                        className="transition hover:bg-slate-50"
                      >

                        {/* =================================================
                            CANDIDATE NAME
                        ================================================== */}
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-800">
                          {candidate.candidateName}
                        </td>

                        {/* =================================================
                            USERNAME
                        ================================================== */}
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                          {candidate.username}
                        </td>

                        {/* =================================================
                            DEPARTMENT
                        ================================================== */}
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                          {candidate.departmentName || "-"}
                        </td>

                        {/* =================================================
                            EXAM ATTEMPTED
                        ================================================== */}
                        <td className="px-3 py-4 text-center">

                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              attempted(candidate) === "YES"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {attempted(candidate)}
                          </span>

                        </td>

                        {/* =================================================
                            EXAM STATUS
                        ================================================== */}
                        <td className="px-3 py-4 text-center">

                          <span
                            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(
                              candidate.examStatus
                            )}`}
                          >
                            {getExamStatusLabel(
                              candidate.examStatus
                            )}
                          </span>

                        </td>

                        {/* =================================================
                            SCORE
                        ================================================== */}
                        <td className="px-3 py-4 text-center text-sm font-semibold text-slate-800">

                          {hasResult && !isDQ
                            ? candidate.score
                            : "-"}

                        </td>

                        {/* =================================================
                            TOTAL QUESTIONS
                        ================================================== */}
                        <td className="px-3 py-4 text-center text-sm text-slate-600">

                          {hasResult
                            ? candidate.totalQuestions
                            : "-"}

                        </td>

                        {/* =================================================
                            PERCENTAGE
                        ================================================== */}
                        <td className="px-3 py-4 text-center text-sm font-semibold text-slate-800">

                          {hasResult && !isDQ
                            ? `${Number(
                                candidate.percentage || 0
                              ).toFixed(1)}%`
                            : "-"}

                        </td>

                        {/* =================================================
                            RESULT - PASS / FAIL / DISQUALIFIED
                        ================================================== */}
                        <td className="px-3 py-4 text-center">

                          <span
                            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${resultClass(
                              result
                            )}`}
                          >
                            {result}
                          </span>

                        </td>

                        {/* =================================================
                            EXAM START TIME
                        ================================================== */}
                        <td className="whitespace-nowrap px-3 py-4 text-center text-xs text-slate-600">

                          {formatDate(
                            candidate.startedAt
                          )}

                        </td>

                        {/* =================================================
                            SUBMISSION TIME
                        ================================================== */}
                        <td className="whitespace-nowrap px-3 py-4 text-center text-xs text-slate-600">

                          {formatDate(
                            candidate.submittedAt
                          )}

                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

      {/* =====================================================
          CREATE CANDIDATE MODAL
      ====================================================== */}
      <CreateCandidate
        isOpen={showCreateCandidate}
        onClose={() =>
          setShowCreateCandidate(false)
        }
        onCreated={loadCandidates}
      />

    </div>
  );
};

export default ManagerDashboard;
