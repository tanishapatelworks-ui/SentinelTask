import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    // Email validation
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to process password reset."
        );
      }

      // Store reset token temporarily for demo/project use
      localStorage.setItem("resetToken", data.resetToken);

      setSuccess("Reset request created successfully.");

      // Go to reset password page
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);

    } catch (error) {
      console.error("Forgot password error:", error);

      setError(
        error.message ||
        "Unable to process password reset. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4] flex items-center justify-center p-6">

      <div className="w-full max-w-[500px] bg-white border border-[#D9E1E2] rounded-2xl shadow-[0_15px_40px_rgba(6,30,41,0.12)] p-8 sm:p-10">

        {/* BRAND */}

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


        {/* HEADING */}

        <div className="mb-8">

          <p className="text-[#1D546D] text-sm font-semibold mb-2">
            Account Recovery
          </p>

          <h1 className="text-[30px] font-semibold text-[#061E29]">
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#5F9598]">
            Enter your registered email address and we will
            help you reset your password.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* SUCCESS */}

        {success && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700">
            {success}
          </div>
        )}


        {/* FORM */}

        <form onSubmit={handleForgotPassword}>

          <div className="mb-6">

            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#061E29] mb-2"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess("");
              }}
              placeholder="Enter your registered email"
              autoComplete="email"
              className="w-full h-12 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
              required
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#1D546D] hover:bg-[#061E29] text-white text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Continue"}
          </button>

        </form>


        {/* BACK TO LOGIN */}

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-sm font-medium text-[#1D546D] hover:text-[#061E29] transition"
          >
            ← Back to Login
          </Link>

        </div>


        {/* FOOTER */}

        <div className="mt-8 pt-5 border-t border-[#D9E1E2]">

          <p className="text-center text-xs text-[#5F9598]">
            SentinelTask · Secure account recovery
          </p>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;