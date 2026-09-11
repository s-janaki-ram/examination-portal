import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CandidateDashboard from "./pages/CandidateDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Exam from "./pages/Exam";
import ManagerDashboard from "./pages/ManagerDashboard";
function App() {

  return (
    <Routes>

      {/* Public login page */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Root URL redirects to login */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Candidate-only dashboard */}
      <Route
        path="/candidate"
        element={
          <ProtectedRoute allowedRole="CANDIDATE">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRole="MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown URL redirects to login */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
      {/* Candidate-only exam page */}
      <Route
        path="/exam"
        element={
          <ProtectedRoute allowedRole="CANDIDATE">
            <Exam />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;