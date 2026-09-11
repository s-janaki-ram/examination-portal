import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser, FiLogIn } from "react-icons/fi";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  // Store username entered by the user
  const [username, setUsername] = useState("");

  // Store password entered by the user
  const [password, setPassword] = useState("");

  // Store login error message
  const [error, setError] = useState("");

  // Used to show loading state on the login button
  const [loading, setLoading] = useState(false);

  // Used to navigate to different pages after login
  const navigate = useNavigate();

  // Get login function from AuthContext
  const { login } = useAuth();

  // Handle login form submission
  const handleSubmit = async (event) => {
    // Prevent browser page refresh
    event.preventDefault();

    // Clear previous error
    setError("");

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    try {
      // Show loading state
      setLoading(true);

      // Send login request to Spring Boot
      const response = await api.post("/auth/login", {
        username: username.trim(),
        password,
      });

      // Store user information and JWT token
      login(response.data);

      // Check the role returned by backend
      if (response.data.role === "MANAGER") {
        // Managers go to manager dashboard
        navigate("/manager");
      } else {
        // Candidates go to candidate dashboard
        navigate("/candidate");
      }
    } catch (error) {
      // Display backend error or a general message
      setError(
        error.response?.data?.message ||
          "Invalid username or password."
      );
    } finally {
      // Hide loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      {/* Login card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">

        {/* Logo / application heading */}
        <div className="text-center mb-5">

          {/* Application Logo */}
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold text-white">
            A
          </div>

          {/* Application Title */}
          <h1 className="text-2xl font-bold text-slate-800">
            Examination Portal
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Login to continue
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Username
            </label>

            <div className="relative">

              {/* Username Icon */}
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter your username"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="relative">

              {/* Password Icon */}
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLogIn />

            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Secure Examination & Assessment Portal
        </p>

      </div>
    </div>
  );
};

export default Login;
