import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === "manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0ed] flex items-center justify-center p-6">

      <div className="w-full max-w-[900px] bg-[#fafaf8] border border-[#dfe3de] rounded-2xl shadow-[0_12px_35px_rgba(30,40,35,0.08)] overflow-hidden">

        <div className="grid md:grid-cols-[42%_58%] min-h-[560px]">

          {/* LEFT */}
          <div className="bg-[#263b36] text-white p-10 flex flex-col justify-between">

            <div>

              {/* Brand */}
              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-[#dce9e3] flex items-center justify-center">
                  <span className="text-[#263b36] font-bold">
                    S
                  </span>
                </div>

                <span className="text-lg font-semibold">
                  SentinelTask
                </span>

              </div>

              {/* Simple content */}
              <div className="mt-28">

                <p className="text-[#aebfba] text-xs font-medium uppercase tracking-wider">
                  Task Management
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight">
                  Keep your team
                  <br />
                  on track.
                </h2>

                <p className="mt-5 text-sm leading-6 text-[#bdcbc7] max-w-xs">
                  Manage projects, tasks and team activities
                  from one place.
                </p>

              </div>

            </div>

            <p className="text-xs text-[#91a49e]">
              Secure workspace
            </p>

          </div>


          {/* RIGHT */}
          <div className="flex items-center justify-center p-10 sm:p-14">

            <div className="w-full max-w-[390px]">

              <div className="mb-8">

                <p className="text-[#47786c] text-sm font-medium mb-2">
                  Welcome back
                </p>

                <h1 className="text-[30px] font-semibold text-[#252a28]">
                  Sign in
                </h1>

                <p className="mt-2 text-sm text-[#737a76]">
                  Enter your details to continue.
                </p>

              </div>


              {/* Error */}
              {error && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-[#fff1f0] border border-[#f0ceca] text-sm text-[#b34b42]">
                  {error}
                </div>
              )}


              <form onSubmit={handleLogin}>

                {/* Email */}
                <div className="mb-5">

                  <label className="block text-sm font-medium text-[#414845] mb-2">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-12 px-4 rounded-lg border border-[#cfd5d1] bg-white text-sm text-[#252a28] outline-none transition focus:border-[#47786c] focus:ring-2 focus:ring-[#47786c]/10"
                    required
                  />

                </div>


                {/* Password */}
                <div className="mb-3">

                  <label className="block text-sm font-medium text-[#414845] mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-12 px-4 pr-16 rounded-lg border border-[#cfd5d1] bg-white text-sm text-[#252a28] outline-none transition focus:border-[#47786c] focus:ring-2 focus:ring-[#47786c]/10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#68716d] hover:text-[#263b36]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>


                {/* Forgot */}
                <div className="flex justify-end mb-6">

                  <button
                    type="button"
                    className="text-sm text-[#47786c] hover:text-[#345f55]"
                  >
                    Forgot password?
                  </button>

                </div>


                {/* Login */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-[#47786c] hover:bg-[#3d695f] text-white text-sm font-medium transition disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

              </form>


              <div className="mt-8 pt-5 border-t border-[#e1e4e1]">

                <p className="text-center text-xs text-[#8a918d]">
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