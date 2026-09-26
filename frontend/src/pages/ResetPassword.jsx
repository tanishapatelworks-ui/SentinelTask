import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const resetToken = localStorage.getItem("resetToken");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!resetToken) {
      setError(
        "Reset session is missing or expired. Please request a new reset link."
      );
      return;
    }

    if (!password) {
      setError("Please enter your new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password.length > 100) {
      setError("Password cannot exceed 100 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: resetToken,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to reset password."
        );
      }

      localStorage.removeItem("resetToken");

      setSuccess(
        "Password reset successful. Redirecting to login..."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Reset password error:", error);

      setError(
        error.message ||
        "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4] flex items-center justify-center p-6">

      <div className="w-full max-w-[500px] bg-white border border-[#D9E1E2] rounded-2xl shadow-[0_15px_40px_rgba(6,30,41,0.12)] p-8 sm:p-10">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">

          <div className="w-10 h-10 rounded-xl bg-[#1D546D] flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              S
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#061E29]">
              SentinelTask
            </h2>

            <p className="text-xs text-[#5F9598] mt-1">
              Secure Workspace
            </p>
          </div>

        </div>

        {/* Heading */}
        <div className="mb-8">

          <p className="text-[#1D546D] text-sm font-semibold mb-2">
            Account Recovery
          </p>

          <h1 className="text-[30px] font-semibold text-[#061E29]">
            Reset Password
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#5F9598]">
            Create a new password for your SentinelTask
            account.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleResetPassword}>

          {/* New Password */}
          <div className="mb-5">

            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#061E29] mb-2"
            >
              New password
            </label>

            <div className="relative">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter new password"
                autoComplete="new-password"
                className="w-full h-12 px-4 pr-16 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#5F9598] hover:text-[#1D546D] transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            <p className="mt-2 text-xs text-[#5F9598]">
              Password must be at least 6 characters.
            </p>

          </div>

          {/* Confirm Password */}
          <div className="mb-6">

            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#061E29] mb-2"
            >
              Confirm password
            </label>

            <div className="relative">

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="w-full h-12 px-4 pr-16 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#5F9598] hover:text-[#1D546D] transition"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading || !!success}
            className="w-full h-12 rounded-xl bg-[#1D546D] hover:bg-[#061E29] text-white text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        {/* Back Login */}
        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-sm font-medium text-[#1D546D] hover:text-[#061E29] transition"
          >
            ← Back to Login
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-[#D9E1E2]">

          <p className="text-center text-xs text-[#5F9598]">
            SentinelTask · Secure password recovery
          </p>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;