import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const CreateCandidate = ({
  isOpen,
  onClose,
}) => {
  // Get logged-in manager details
  const { user } = useAuth();

  // Candidate name entered by manager
  const [candidateName, setCandidateName] = useState("");

  // Loading state while creating candidate
  const [creatingCandidate, setCreatingCandidate] =
    useState(false);

  // Error message
  const [error, setError] = useState("");

  // Stores generated candidate credentials
  const [createdCandidate, setCreatedCandidate] =
    useState(null);

  // Do not display anything when modal is closed
  if (!isOpen) {
    return null;
  }

  // Create candidate
  const handleCreateCandidate = async (event) => {
    event.preventDefault();

    // Clear previous error
    setError("");

    // Validate candidate name
    if (!candidateName.trim()) {
      setError("Please enter candidate name");
      return;
    }

    try {
      setCreatingCandidate(true);

      // Send candidate name to backend.
      // Department is automatically taken from manager.
      const response = await api.post(
        "/manager/candidates",
        {
          name: candidateName.trim(),
        }
      );

      // Store generated username/password
      setCreatedCandidate(response.data);

      // Clear input
      setCandidateName("");
    } catch (err) {
      // Display backend error
      setError(
        err.response?.data ||
        "Failed to create candidate"
      );
    } finally {
      setCreatingCandidate(false);
    }
  };

  // Close modal and reset data
  const handleClose = () => {
    setCandidateName("");
    setError("");
    setCreatedCandidate(null);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      {/* Compact modal */}
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Create Candidate
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Create a candidate for your department
            </p>
          </div>

          <button
            onClick={handleClose}
            className="text-xl leading-none text-slate-400 hover:text-slate-700"
          >
            ×
          </button>

        </div>

        {/* Successfully created candidate */}
        {createdCandidate ? (
          <div>

            {/* Success message */}
            <div className="mb-4 rounded-lg bg-green-50 p-3">

              <h3 className="mb-1 text-base font-semibold text-green-700">
                Candidate Created Successfully
              </h3>

              <p className="text-xs text-green-600">
                Save these credentials and provide them to the candidate.
              </p>

            </div>

            {/* Candidate details */}
            <div className="space-y-3 rounded-lg bg-slate-50 p-4">

              <div>
                <p className="text-xs text-slate-500">
                  Candidate Name
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {createdCandidate.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Department
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {createdCandidate.departmentName}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Username
                </p>

                <p className="text-sm font-semibold text-blue-600">
                  {createdCandidate.username}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Password
                </p>

                <p className="text-sm font-semibold text-blue-600">
                  {createdCandidate.password}
                </p>
              </div>

            </div>

            {/* Done button */}
            <button
              onClick={handleClose}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Done
            </button>

          </div>
        ) : (

          /* Candidate creation form */
          <form onSubmit={handleCreateCandidate}>

            {/* Department */}
            <div className="mb-4">

              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Department
              </label>

              <input
                type="text"
                value={user?.departmentName || ""}
                disabled
                className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-slate-600"
              />

              <p className="mt-1 text-[11px] text-slate-500">
                Candidate will automatically belong to your department.
              </p>

            </div>

            {/* Candidate name */}
            <div className="mb-4">

              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Candidate Name
              </label>

              <input
                type="text"
                value={candidateName}
                onChange={(event) =>
                  setCandidateName(event.target.value)
                }
                placeholder="Enter candidate name"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 px-3 py-2.5 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2.5">

              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={creatingCandidate}
                className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {creatingCandidate
                  ? "Creating..."
                  : "Create Candidate"}
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default CreateCandidate;
