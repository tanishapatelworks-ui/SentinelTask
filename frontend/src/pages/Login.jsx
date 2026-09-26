
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Always start with empty login fields
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");

    // Remove any old browser/autofill related login values
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    if (emailInput) {
      emailInput.value = "";
    }

    if (passwordInput) {
      passwordInput.value = "";
    }
  }, [location.pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

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

    // Password validation
    if (!password) {
      setError("Please enter your password.");
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

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        }
      );

      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "Non-JSON response from backend:",
          text
        );

        throw new Error(
          `Server returned an unexpected response (${response.status}).`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      if (!data.token || !data.user) {
        throw new Error(
          "Login response is incomplete. Please try again."
        );
      }

      // Save login session
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Clear login form after successful login
      setEmail("");
      setPassword("");

      // Role-based navigation
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === "manager") {
        navigate("/manager-dashboard");
      } else if (data.user.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setError("Invalid user role.");
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4] flex items-center justify-center p-6">

      <div className="w-full max-w-[950px] bg-white border border-[#D9E1E2] rounded-2xl shadow-[0_15px_40px_rgba(6,30,41,0.12)] overflow-hidden">

        <div className="grid md:grid-cols-[42%_58%] min-h-[560px]">

          {/* LEFT SIDE */}
          <div className="bg-[#061E29] text-white p-10 flex flex-col justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#1D546D] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    S
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    SentinelTask
                  </h2>

                  <p className="text-xs text-[#B8C9CB] mt-1">
                    Secure Workspace
                  </p>
                </div>

              </div>

              <div className="mt-28">

                <p className="text-[#5F9598] text-xs font-semibold uppercase tracking-[0.18em]">
                  Task Management
                </p>

                <h1 className="mt-4 text-3xl font-semibold leading-tight">
                  Keep your team
                  <br />
                  on track.
                </h1>

                <p className="mt-5 text-sm leading-6 text-[#B8C9CB] max-w-xs">
                  Manage projects, tasks and team activities
                  from one secure workspace.
                </p>

              </div>

            </div>

            <div className="pt-8 border-t border-white/10">

              <p className="text-xs text-[#5F9598]">
                Secure workspace · SentinelTask
              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center p-10 sm:p-14">

            <div className="w-full max-w-[390px]">

              {/* Heading */}
              <div className="mb-8">

                <p className="text-[#1D546D] text-sm font-semibold mb-2">
                  Welcome back
                </p>

                <h1 className="text-[32px] font-semibold text-[#061E29]">
                  Sign in
                </h1>

                <p className="mt-2 text-sm text-[#5F9598]">
                  Enter your details to continue to your workspace.
                </p>

              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form
                onSubmit={handleLogin}
                autoComplete="off"
              >

                {/* Email */}
                <div className="mb-5">

                  <label
                    htmlFor="login-email"
                    className="block text-sm font-medium text-[#061E29] mb-2"
                  >
                    Email address
                  </label>

                  <input
                    id="login-email"
                    name="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    className="w-full h-12 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
                  />

                </div>

                {/* Password */}
                <div className="mb-3">

                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-[#061E29] mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="login-password"
                      name="login-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
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

                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb-6">

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#1D546D] hover:text-[#061E29] transition"
                  >
                    Forgot password?
                  </Link>

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#1D546D] hover:bg-[#061E29] text-white text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in"}
                </button>

              </form>

              {/* Register */}
              <div className="mt-6 text-center">

                <p className="text-sm text-[#5F9598]">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-semibold text-[#1D546D] hover:text-[#061E29] transition"
                  >
                    Register
                  </Link>

                </p>

              </div>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-[#D9E1E2]">

                <p className="text-center text-xs text-[#5F9598]">
                  SentinelTask · Secure login
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;

