import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, User, Phone, Sprout, BarChart3, Users } from "lucide-react";
import kisanMark from "@/assets/kisan-mark.jpg";
import loginBg from "@/assets/login-bg.jpg";

import { z } from "zod";

const loginSearchSchema = z.object({
  flip: z.enum(["register", "login"]).optional(),
});

export const Route = createFileRoute("/login")({
  component: AuthPage,
  validateSearch: (search) => loginSearchSchema.parse(search),
});

function AuthPage() {
  const navigate = useNavigate();
  const { flip } = Route.useSearch();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSubmitted, setRegSubmitted] = useState(false);

  useEffect(() => {
    if (flip === "register") {
      setIsFlipped(true);
      navigate({ search: {}, replace: true });
    }
  }, [flip, navigate]);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const flipDuration = prefersReducedMotion ? 0 : 800;

  const flipToRegister = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLoginError("");
    setLoginSubmitted(false);
    setIsFlipped(true);
    setTimeout(() => setIsAnimating(false), flipDuration);
  }, [isAnimating, flipDuration]);

  const flipToLogin = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRegError("");
    setRegSubmitted(false);
    setIsFlipped(false);
    setTimeout(() => setIsAnimating(false), flipDuration);
  }, [isAnimating, flipDuration]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitted(true);
    setLoginError("");
    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      navigate({ to: "/" });
    }, 1000);
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegSubmitted(true);
    setRegError("");
    if (!fullName || !phone || !regEmail || !regPassword || !confirmPassword) {
      setRegError("Please fill in all fields.");
      return;
    }
    if (regPassword !== confirmPassword) {
      setRegError("Passwords do not match.");
      return;
    }
    if (!agreedToTerms) {
      setRegError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setRegLoading(true);
    setTimeout(() => {
      setRegLoading(false);
      navigate({ to: "/" });
    }, 1000);
  };

  const inputClass =
    "w-full h-[56px] bg-white/5 border border-white/15 rounded-xl py-3 pl-12 pr-4 text-[14px] text-white placeholder-[#B8C0BA]/70 focus:outline-none focus:border-[#9BE33F] focus:ring-1 focus:ring-[#9BE33F]/50 transition";

  const regInputClass =
    "w-full h-[44px] bg-white/5 border border-white/15 rounded-lg py-2.5 pl-10 pr-3 text-[13px] text-white placeholder-[#B8C0BA]/70 focus:outline-none focus:border-[#9BE33F] focus:ring-1 focus:ring-[#9BE33F]/50 transition";

  const glassCardStyle = {
    background: "rgba(20, 30, 28, 0.65)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  };

  const GoogleIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <div
      className="relative w-screen min-h-screen overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(4,12,8,0.82) 0%, rgba(4,12,8,0.58) 38%, rgba(4,12,8,0.32) 72%, rgba(4,12,8,0.18) 100%), radial-gradient(ellipse at 80% 30%, rgba(180,140,60,0.10) 0%, transparent 55%), url(${loginBg})`,
          backgroundBlendMode: "normal, soft-light, normal",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-stretch px-[6%] py-[4vh] sm:px-[7%] md:px-[8%]">
        <div className="w-full lg:w-[58%] flex flex-col justify-center py-8 sm:py-12 md:py-16 relative">
          <div className="mb-8 lg:mb-10">
            <img
              src={kisanMark}
              alt="Kisan Care"
              className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] object-contain select-none"
              draggable={false}
            />
          </div>

          <h1 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
            Smart Farming
          </h1>
          <h1 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.02em] bg-gradient-to-r from-[#72D82F] to-[#9BE33F] bg-clip-text text-transparent mb-4">
            for a Better Future
          </h1>

          <div className="w-12 h-[3px] bg-[#9BE33F] rounded-full mb-6" />

          <div className="space-y-3 sm:space-y-4 max-w-md">
            {[
              {
                icon: Sprout,
                title: "Expert Guidance",
                desc: "Get reliable farming tips and solutions.",
              },
              {
                icon: BarChart3,
                title: "Real-time Insights",
                desc: "Stay updated with weather, prices & more.",
              },
              {
                icon: Users,
                title: "Stronger Community",
                desc: "Connect, share and grow together.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0A2118] border border-white/10 flex items-center justify-center text-[#9BE33F] shrink-0">
                  <item.icon className="w-4 h-4" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm leading-none">{item.title}</div>
                  <div className="text-[#B8C0BA] text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:grid grid-cols-6 gap-2 absolute bottom-8 left-0 opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#9BE33F]" />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[42%] flex items-center justify-center py-8 sm:py-12 md:py-0">
          <div style={{ perspective: "1800px" }} className="w-full max-w-[440px]">
            <div
              style={{
                transformStyle: "preserve-3d",
                transition: `transform ${flipDuration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
              className="relative w-full min-h-[640px]"
            >
              {/* ── LOGIN FACE ── */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                className={`absolute inset-0 w-full ${isFlipped && !isAnimating ? "invisible" : ""}`}
                aria-hidden={isFlipped}
                tabIndex={isFlipped ? -1 : 0}
              >
                <div
                  className="w-full rounded-[20px] sm:rounded-[28px] border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                  style={glassCardStyle}
                >
                  <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 mb-6 sm:mb-8">
                    <button
                      type="button"
                      disabled
                      className="flex-1 py-2.5 rounded-lg text-[13px] sm:text-sm font-bold text-white bg-gradient-to-r from-[#72D82F] to-[#39C45A] shadow-md"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={flipToRegister}
                      className="flex-1 py-2.5 rounded-lg text-[13px] sm:text-sm font-semibold text-[#B8C0BA] hover:text-white transition"
                    >
                      Create Account
                    </button>
                  </div>

                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-[26px] sm:text-3xl font-bold text-white">Welcome Back!</h2>
                    <p className="text-[#9BE33F] text-[13px] sm:text-sm mt-1.5">
                      Login to your Kisan Care account
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label
                        htmlFor="login-email"
                        className="block text-white text-sm font-semibold mb-2"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8C0BA] pointer-events-none">
                          <Mail className="w-5 h-5" strokeWidth={1.8} />
                        </span>
                        <input
                          id="login-email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                            setLoginError("");
                          }}
                          placeholder="Enter your email"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="login-password"
                        className="block text-white text-sm font-semibold mb-2"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8C0BA] pointer-events-none">
                          <Lock className="w-5 h-5" strokeWidth={1.8} />
                        </span>
                        <input
                          id="login-password"
                          type={showLoginPassword ? "text" : "password"}
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            setLoginError("");
                          }}
                          placeholder="Enter your password"
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8C0BA] hover:text-white transition p-1"
                          aria-label={showLoginPassword ? "Hide password" : "Show password"}
                        >
                          {showLoginPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-right -mt-1">
                      <span className="text-[#9BE33F] text-[13px] hover:underline underline-offset-4 cursor-pointer">
                        Forgot password?
                      </span>
                    </div>

                    {loginSubmitted && loginError && (
                      <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
                        {loginError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full h-[56px] rounded-xl font-bold text-white tracking-wide bg-gradient-to-r from-[#72D82F] to-[#39C45A] hover:brightness-110 active:scale-[0.98] transition shadow-lg shadow-[#39C45A]/20 disabled:opacity-60 text-[14px] sm:text-[15px]"
                    >
                      {loginLoading ? "SIGNING IN..." : "SIGN IN"}
                    </button>

                    <div className="flex items-center gap-3 py-1">
                      <div className="flex-1 h-px bg-white/15" />
                      <span className="text-[#B8C0BA] text-sm">or</span>
                      <div className="flex-1 h-px bg-white/15" />
                    </div>

                    <button
                      type="button"
                      className="w-full h-[56px] rounded-xl font-semibold text-gray-800 bg-[#F7F8F4] hover:brightness-95 active:scale-[0.98] transition flex items-center justify-center gap-3 text-[14px] sm:text-[15px] shadow-sm"
                    >
                      <GoogleIcon />
                      Sign in with Google
                    </button>

                    <p className="text-center text-[#B8C0BA] text-[13px] sm:text-sm pt-1">
                      Are you new?{" "}
                      <button
                        type="button"
                        onClick={flipToRegister}
                        className="text-[#9BE33F] font-semibold hover:underline underline-offset-4"
                      >
                        Create an Account
                      </button>
                    </p>
                  </form>
                </div>
              </div>

              {/* ── REGISTER FACE ── */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className={`absolute inset-0 w-full ${!isFlipped && !isAnimating ? "invisible" : ""}`}
                aria-hidden={!isFlipped}
                tabIndex={!isFlipped ? -1 : 0}
              >
                <div
                  className="w-full rounded-[20px] sm:rounded-[28px] border border-white/15 p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                  style={glassCardStyle}
                >
                  <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 mb-4 sm:mb-5">
                    <button
                      type="button"
                      onClick={flipToLogin}
                      className="flex-1 py-2 rounded-lg text-[13px] sm:text-sm font-semibold text-[#B8C0BA] hover:text-white transition"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      disabled
                      className="flex-1 py-2 rounded-lg text-[13px] sm:text-sm font-bold text-white bg-gradient-to-r from-[#72D82F] to-[#39C45A] shadow-md"
                    >
                      Create Account
                    </button>
                  </div>

                  <div className="text-center mb-4 sm:mb-5">
                    <h2 className="text-[22px] sm:text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-[#9BE33F] text-[12px] sm:text-[13px] mt-1">
                      Join Kisan Care and start your smart farming journey
                    </p>
                  </div>

                  <form onSubmit={handleRegSubmit} className="space-y-3 sm:space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="reg-fullName"
                          className="block text-white text-[13px] font-semibold mb-1.5"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8C0BA] pointer-events-none">
                            <User className="w-4 h-4" strokeWidth={1.8} />
                          </span>
                          <input
                            id="reg-fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              setRegError("");
                            }}
                            placeholder="Full name"
                            className={regInputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="reg-phone"
                          className="block text-white text-[13px] font-semibold mb-1.5"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8C0BA] pointer-events-none">
                            <Phone className="w-4 h-4" strokeWidth={1.8} />
                          </span>
                          <input
                            id="reg-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              setRegError("");
                            }}
                            placeholder="Phone number"
                            className={regInputClass}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="reg-email"
                        className="block text-white text-[13px] font-semibold mb-1.5"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8C0BA] pointer-events-none">
                          <Mail className="w-4 h-4" strokeWidth={1.8} />
                        </span>
                        <input
                          id="reg-email"
                          type="email"
                          value={regEmail}
                          onChange={(e) => {
                            setRegEmail(e.target.value);
                            setRegError("");
                          }}
                          placeholder="Enter your email"
                          className={regInputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="reg-password"
                          className="block text-white text-[13px] font-semibold mb-1.5"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8C0BA] pointer-events-none">
                            <Lock className="w-4 h-4" strokeWidth={1.8} />
                          </span>
                          <input
                            id="reg-password"
                            type={showRegPassword ? "text" : "password"}
                            value={regPassword}
                            onChange={(e) => {
                              setRegPassword(e.target.value);
                              setRegError("");
                            }}
                            placeholder="Password"
                            className={regInputClass}
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8C0BA] hover:text-white transition p-0.5"
                            aria-label={showRegPassword ? "Hide password" : "Show password"}
                          >
                            {showRegPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="reg-confirmPassword"
                          className="block text-white text-[13px] font-semibold mb-1.5"
                        >
                          Confirm
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8C0BA] pointer-events-none">
                            <Lock className="w-4 h-4" strokeWidth={1.8} />
                          </span>
                          <input
                            id="reg-confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setRegError("");
                            }}
                            placeholder="Confirm password"
                            className={regInputClass}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8C0BA] hover:text-white transition p-0.5"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <input
                        id="reg-terms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                          setRegError("");
                        }}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-white/20 bg-white/5 text-[#9BE33F] focus:ring-[#9BE33F]/50 focus:ring-2 cursor-pointer accent-[#9BE33F]"
                      />
                      <label
                        htmlFor="reg-terms"
                        className="text-[#B8C0BA] text-[12px] leading-snug"
                      >
                        I agree to the{" "}
                        <span className="text-[#9BE33F] hover:underline cursor-pointer">Terms</span>{" "}
                        and{" "}
                        <span className="text-[#9BE33F] hover:underline cursor-pointer">
                          Privacy Policy
                        </span>
                      </label>
                    </div>

                    {regSubmitted && regError && (
                      <p className="text-red-400 text-[13px] text-center bg-red-500/10 border border-red-500/20 rounded-lg py-1.5 px-3">
                        {regError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={regLoading}
                      className="w-full h-[44px] rounded-lg font-bold text-white tracking-wide bg-gradient-to-r from-[#72D82F] to-[#39C45A] hover:brightness-110 active:scale-[0.98] transition shadow-lg shadow-[#39C45A]/20 disabled:opacity-60 text-[13px] sm:text-[14px]"
                    >
                      {regLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/15" />
                      <span className="text-[#B8C0BA] text-[13px]">or</span>
                      <div className="flex-1 h-px bg-white/15" />
                    </div>

                    <button
                      type="button"
                      className="w-full h-[44px] rounded-lg font-semibold text-gray-800 bg-[#F7F8F4] hover:brightness-95 active:scale-[0.98] transition flex items-center justify-center gap-2.5 text-[13px] sm:text-[14px] shadow-sm"
                    >
                      <GoogleIcon size={18} />
                      Sign up with Google
                    </button>

                    <p className="text-center text-[#B8C0BA] text-[12px] sm:text-[13px]">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={flipToLogin}
                        className="text-[#9BE33F] font-semibold hover:underline underline-offset-4"
                      >
                        Sign In
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
