import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: "🔐",
      title: "Intelligent Access Control",
      text: "Role-based permissions help ensure users access only the areas relevant to their responsibilities.",
    },
    {
      icon: "📋",
      title: "Task Management",
      text: "Create, organize and track tasks with clear statuses, priorities and deadlines.",
    },
    {
      icon: "📁",
      title: "Project Management",
      text: "Keep projects organized with centralized information, progress and team assignments.",
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      text: "Connect team members with projects and responsibilities in one shared workspace.",
    },
    {
      icon: "📅",
      title: "Calendar & Milestones",
      text: "Keep important deadlines and project milestones visible and organized.",
    },
    {
      icon: "📊",
      title: "Reports & Activity",
      text: "Get a clear view of project activity and work progress across the system.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F4] text-[#061E29]">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-[#D9E1E2] bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#061E29] text-white">

              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3L20 7V12C20 17 16.5 20.5 12 22C7.5 20.5 4 17 4 12V7L12 3Z" />
                <path d="M9 12L11 14L15 10" />
              </svg>

            </div>

            <div>

              <h1 className="text-xl font-bold tracking-tight text-[#061E29]">
                SentinelTask
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#5F9598]">
                Secure Task Management
              </p>

            </div>

          </Link>


          {/* NAVIGATION */}

          <nav className="hidden items-center gap-8 md:flex">

            <a
              href="#home"
              className="text-sm font-medium text-[#1D546D] transition hover:text-[#061E29]"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-[#1D546D] transition hover:text-[#061E29]"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-[#1D546D] transition hover:text-[#061E29]"
            >
              About
            </a>

          </nav>


          {/* SIGN IN / SIGN UP */}

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="hidden rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1D546D] transition hover:bg-[#F3F4F4] sm:block"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-[#061E29] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D546D]"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <main>

        <section
          id="home"
          className="relative overflow-hidden"
        >

          <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

            {/* LEFT SIDE */}

            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8C9CB] bg-white px-4 py-2 text-sm font-medium text-[#1D546D]">

                <span className="h-2 w-2 rounded-full bg-[#5F9598]" />

                Secure Project & Task Management

              </div>


              <h2 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-[#061E29] md:text-6xl">

                Manage Work.

                <br />

                <span className="text-[#1D546D]">
                  Protect Access.
                </span>

              </h2>


              <p className="mt-7 max-w-xl text-lg leading-8 text-[#526A70]">

                SentinelTask brings projects, tasks, teams, milestones and
                activity together in one secure workspace with intelligent
                role-based access control.

              </p>


              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#6B7F84]">

                <span>
                  ✓ Role-based access
                </span>

                <span>
                  ✓ Centralized workspace
                </span>

                <span>
                  ✓ Team collaboration
                </span>

              </div>

            </div>


            {/* RIGHT SIDE */}

            {/* 
              Project Overview / Dashboard removed completely.

              Image will be added here later.
            */}

            <div className="min-h-[480px]">
            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section
          id="features"
          className="border-y border-[#D9E1E2] bg-white"
        >

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="mx-auto max-w-2xl text-center">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#5F9598]">
                Everything in one place
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#061E29] md:text-4xl">
                Built for organized, secure work
              </h2>

              <p className="mt-4 text-base leading-7 text-[#64787D]">
                Manage everyday work while keeping access controlled across
                your organization.
              </p>

            </div>


            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {features.map((feature) => (

                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#D9E1E2] bg-[#F8FAFA] p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E2EBEC] text-xl">
                    {feature.icon}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#061E29]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#667B80]">
                    {feature.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ================= ABOUT ================= */}

        <section
          id="about"
          className="bg-[#F3F4F4]"
        >

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="grid items-center gap-12 lg:grid-cols-2">

              {/* ABOUT TEXT */}

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#5F9598]">
                  About SentinelTask
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#061E29] md:text-4xl">
                  One workspace for your team's work
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-[#64787D]">

                  SentinelTask is designed to simplify project and task
                  management while providing a secure role-based environment
                  for administrators, managers and employees.

                </p>


                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                  <div className="rounded-xl border border-[#D9E1E2] bg-white p-5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E2EBEC]">
                      🔒
                    </div>

                    <p className="mt-4 font-semibold text-[#061E29]">
                      Secure by design
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#6B7F84]">
                      Controlled access for different user roles.
                    </p>

                  </div>


                  <div className="rounded-xl border border-[#D9E1E2] bg-white p-5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E2EBEC]">
                      ⚡
                    </div>

                    <p className="mt-4 font-semibold text-[#061E29]">
                      Easy to manage
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#6B7F84]">
                      Clear modules for everyday project work.
                    </p>

                  </div>

                </div>

              </div>


              {/* ABOUT VISUAL */}

              <div className="relative">

                <div className="absolute -inset-4 rounded-[2rem] bg-[#D9E1E2]/60 blur-2xl" />

                <div className="relative rounded-3xl bg-[#061E29] p-8 shadow-xl">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8FB8BA]">
                        SentinelTask
                      </p>

                      <h3 className="mt-3 text-3xl font-bold text-white">
                        Work organized.
                        <br />
                        Access protected.
                      </h3>

                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D546D] text-2xl">
                      🛡️
                    </div>

                  </div>


                  <div className="mt-10 grid grid-cols-3 gap-3">

                    <div className="rounded-xl bg-white/10 p-4">

                      <p className="text-xs text-[#B8C9CB]">
                        Projects
                      </p>

                      <p className="mt-2 text-2xl font-bold text-white">
                        12
                      </p>

                    </div>


                    <div className="rounded-xl bg-white/10 p-4">

                      <p className="text-xs text-[#B8C9CB]">
                        Tasks
                      </p>

                      <p className="mt-2 text-2xl font-bold text-white">
                        48
                      </p>

                    </div>


                    <div className="rounded-xl bg-white/10 p-4">

                      <p className="text-xs text-[#B8C9CB]">
                        Team
                      </p>

                      <p className="mt-2 text-2xl font-bold text-white">
                        16
                      </p>

                    </div>

                  </div>


                  <div className="mt-5 flex items-center justify-between rounded-xl bg-white/10 px-5 py-4">

                    <div className="flex items-center gap-3">

                      <span className="h-3 w-3 rounded-full bg-[#5F9598]" />

                      <div>

                        <p className="text-sm font-semibold text-white">
                          Role-based access enabled
                        </p>

                        <p className="mt-1 text-xs text-[#B8C9CB]">
                          Admin · Manager · Employee
                        </p>

                      </div>

                    </div>

                    <span className="text-xs font-bold text-[#8FB8BA]">
                      ACTIVE
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="bg-[#061E29]">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>

            <p className="font-bold text-white">
              SentinelTask
            </p>

            <p className="mt-1 text-xs text-[#9DB4B8]">
              Secure Task & Project Management System
            </p>

          </div>

          <p className="text-xs text-[#7F9BA0]">
            © {new Date().getFullYear()} SentinelTask. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;