"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("ravi@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  const redirect = searchParams.get("redirect") || "/home";

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/backend/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      if (!data.token) throw new Error("Token not received");

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("user", JSON.stringify({ email: data.email }));

      login();
      window.dispatchEvent(new Event("authChanged"));
      router.push(redirect);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] w-full bg-[#0d0c0a] relative flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* === BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="jewels" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
              <g stroke="#c9a84c" strokeWidth="0.6" fill="none" opacity="0.7">
                <circle cx="50" cy="50" r="28" />
                <path d="M35 25 L65 25 L72 50 L50 80 L28 50 Z" />
                <path d="M200 10 L220 10 M180 30 Q200 20 220 30" />
                <circle cx="320" cy="40" r="8" />
                <path d="M300 60 L340 60 L350 80 L320 110 L290 80 Z" />
                <path d="M50 200 Q80 160 110 200" />
                <path d="M20 350 Q60 320 100 350 T200 350" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jewels)" />
        </svg>
        {/* leaf chain overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_#0d0c0a_90%)]" />
      </div>

      {/* === CARD === */}
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="bg-[#11100e] rounded-[12px] p-[6px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-[#1a1a1a]">
          <div className="relative bg-[#0f0e0c] rounded-[8px] border border-[#c9a84c]/80 px-7 py-8 md:px-8 md:py-8">

            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-8 h-8 text-[#d4af37]">
              <svg viewBox="0 0 32 32" fill="currentColor"><path d="M2 2 Q12 2 14 8 Q16 3 20 4 Q16 8 14 12 Q18 14 14 18 Q10 14 8 12 Q5 8 2 2 M8 8 Q10 9 11 11 Q9 13 8 14 Q7 11 6 10 Q7 9 8 8"/></svg>
            </div>
            <div className="absolute top-2 right-2 w-8 h-8 text-[#d4af37] scale-x-[-1]">
              <svg viewBox="0 0 32 32" fill="currentColor"><path d="M2 2 Q12 2 14 8 Q16 3 20 4 Q16 8 14 12 Q18 14 14 18 Q10 14 8 12 Q5 8 2 2 M8 8 Q10 9 11 11 Q9 13 8 14 Q7 11 6 10 Q7 9 8 8"/></svg>
            </div>
            <div className="absolute bottom-2 left-2 w-8 h-8 text-[#d4af37] scale-y-[-1]">
              <svg viewBox="0 0 32 32" fill="currentColor"><path d="M2 2 Q12 2 14 8 Q16 3 20 4 Q16 8 14 12 Q18 14 14 18 Q10 14 8 12 Q5 8 2 2 M8 8 Q10 9 11 11 Q9 13 8 14 Q7 11 6 10 Q7 9 8 8"/></svg>
            </div>
            <div className="absolute bottom-2 right-2 w-8 h-8 text-[#d4af37] scale-x-[-1] scale-y-[-1]">
              <svg viewBox="0 0 32 32" fill="currentColor"><path d="M2 2 Q12 2 14 8 Q16 3 20 4 Q16 8 14 12 Q18 14 14 18 Q10 14 8 12 Q5 8 2 2 M8 8 Q10 9 11 11 Q9 13 8 14 Q7 11 6 10 Q7 9 8 8"/></svg>
            </div>

            {/* Inner thin line */}
            <div className="absolute inset-[10px] border border-[#c9a84c]/20 rounded-[4px] pointer-events-none" />

            <h1 className="text-center text-[#e8c765] font-serif text-[30px] font-bold tracking-wide">WELCOME BACK</h1>
            <p className="text-center text-white/80 text-[14px] mt-1.5">Sign in to your DP Jewellers account.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-[#d4b66a] text-[13px] font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full mt-1.5 bg-transparent border border-[#c9a84c]/70 rounded-[8px] px-4 py-[11px] text-[#f5e6c8] placeholder:text-[#f5e6c8]/60 text-[14px] outline-none focus:border-[#e8c765]"
                />
              </div>

              <div>
                <label className="text-[#d4b66a] text-[13px] font-medium">Password</label>
                <div className="relative mt-1.5">
                  <input
                    type={show? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full bg-transparent border border-[#c9a84c]/70 rounded-[8px] px-4 py-[11px] text-[#f5e6c8] text-[14px] outline-none focus:border-[#e8c765] pr-11"
                  />
                  <button onClick={() => setShow(!show)} className="absolute right-3.5 top-[11px] text-[#d4af37]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-[#d4b66a] text-[13px] cursor-pointer">
                  <span className={`w-[18px] h-[18px] border border-[#c9a84c] rounded-[4px] flex items-center justify-center ${remember? "bg-[#c9a84c]/20" : ""}`}>
                    {remember && <span className="text-[12px] text-[#c9a84c]">✓</span>}
                  </span>
                  <input type="checkbox" className="hidden" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-[#d4b66a] text-[13px] underline underline-offset-4 hover:text-white">Forgot password?</Link>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-[#d4a731] hover:bg-[#e0b63e] text-black font-bold py-[11px] rounded-[8px] transition text-[15px] shadow-[0_2px_10px_rgba(212,167,49,0.3)]"
              >
                {loading? "Signing In..." : "Sign In"}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-[#c9a84c]/30"></div>
                <span className="text-white text-[13px] font-bold tracking-widest">OR</span>
                <div className="flex-1 h-[1px] bg-[#c9a84c]/30"></div>
              </div>

              <button className="w-full border border-[#c9a84c]/80 rounded-[8px] py-[10px] flex items-center justify-center gap-2.5 text-[#f5e6c8] text-[14px] hover:bg-white/[0.03] transition">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
                Sign In with Google
              </button>

              <p className="text-center text-white text-[13.5px] pt-1">
                Don't have an account? <Link href="/register" className="text-[#e8c765] underline underline-offset-4 font-semibold">Sign up</Link>
              </p>

              <p className="flex items-center justify-center gap-2 text-[11.5px] text-white/60 pt-2">
                <span className="text-[#e8c765]">🔒</span> Secure login • 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[92vh] bg-[#0d0c0a] flex items-center justify-center text-[#c9a84c]">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}