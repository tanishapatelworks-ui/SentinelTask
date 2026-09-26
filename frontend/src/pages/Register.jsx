
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      // Clear form
      setName("");
      setEmail("");
      setRole("employee");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError(
        error.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4] flex items-center justify-center p-6">

      <div className="w-full max-w-[950px] bg-white border border-[#D9E1E2] rounded-2xl shadow-[0_15px_40px_rgba(6,30,41,0.12)] overflow-hidden">

        <div className="grid md:grid-cols-[42%_58%] min-h-[620px]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="bg-[#061E29] text-white p-10 flex flex-col justify-between">

            <div>

              {/* BRAND */}

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


              {/* INTRO */}

              <div className="mt-24">

                <p className="text-[#5F9598] text-xs font-semibold uppercase tracking-[0.18em]">
                  Create Account
                </p>

                <h1 className="mt-4 text-3xl font-semibold leading-tight">
                  Start managing
                  <br />
                  your work smarter.
                </h1>

                <p className="mt-5 text-sm leading-6 text-[#B8C9CB] max-w-xs">
                  Create your SentinelTask account and
                  access your secure workspace.
                </p>

              </div>

            </div>


            {/* BOTTOM */}

            <div className="pt-8 border-t border-white/10">

              <p className="text-xs text-[#5F9598]">
                Secure role-based workspace
              </p>

            </div>

          </div>


          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="flex items-center justify-center p-8 sm:p-12">

            <div className="w-full max-w-[400px]">

              {/* HEADING */}

              <div className="mb-7">

                <p className="text-[#1D546D] text-sm font-semibold mb-2">
                  Join SentinelTask
                </p>

                <h1 className="text-[30px] font-semibold text-[#061E29]">
                  Create Account
                </h1>

                <p className="mt-2 text-sm text-[#5F9598]">
                  Enter your details to create your workspace account.
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

              <form onSubmit={handleRegister}>

                {/* NAME */}

                <div className="mb-4">

                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#061E29] mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
                    required
                  />

                </div>


                {/* EMAIL */}

                <div className="mb-4">

                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#061E29] mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
                    required
                  />

                </div>


                {/* ROLE */}

                <div className="mb-4">

                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-[#061E29] mb-2"
                  >
                    Select Role
                  </label>

                  <select
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setError("");
                    }}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
                  >
                    <option value="employee">
                      Employee
                    </option>

                    <option value="manager">
                      Manager
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>

                </div>


                {/* PASSWORD */}

                <div className="mb-4">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#061E29] mb-2"
                  >
                    Password
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
                      placeholder="Create password"
                      autoComplete="new-password"
                      className="w-full h-11 px-4 pr-16 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
                      required
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


                {/* CONFIRM PASSWORD */}

                <div className="mb-6">

                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#061E29] mb-2"
                  >
                    Confirm Password
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
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="w-full h-11 px-4 pr-16 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/15"
                      required
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
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>


                {/* REGISTER BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#1D546D] hover:bg-[#061E29] text-white text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

              </form>


              {/* LOGIN LINK */}

              <p className="mt-6 text-center text-sm text-[#5F9598]">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-[#1D546D] hover:text-[#061E29] transition"
                >
                  Sign in
                </Link>

              </p>


              {/* FOOTER */}

              <div className="mt-6 pt-5 border-t border-[#D9E1E2]">

                <p className="text-center text-xs text-[#5F9598]">
                  SentinelTask · Secure role-based login
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;

