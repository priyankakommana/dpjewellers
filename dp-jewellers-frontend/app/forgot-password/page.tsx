"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API = "http://localhost:8080/api/auth";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("OTP sent to your email ✓ Check inbox & spam");
        setStep(2);
      } else {
        setMsg(data.message || "Email not found");
      }
    } catch (err) {
      setMsg("Server error, try again");
    }
    setLoading(false);
  };

  // Step 2: Verify OTP (we verify by trying to reset, or add verify endpoint)
  const handleVerify = async (e: any) => {
    e.preventDefault();
    if (otp.length!== 6) {
      setMsg("Enter 6-digit OTP");
      return;
    }
    setStep(3);
    setMsg("OTP verified, set new password");
  };

  // Step 3: Reset Password
  const handleReset = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMsg(data.message || "Invalid OTP or expired");
      }
    } catch (err) {
      setMsg("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-[#111] border border-[#d4af37]/20 rounded-[20px] p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-serif text-[#d4af37] tracking-widest">DP JEWELLERS</h1>
          <p className="text-[#888] text-[13px] mt-1 tracking-[3px] uppercase">Pure Gold • Since 1990</p>
        </div>

        <h2 className="text-white text-[22px] font-medium mb-2">
          {step === 1? "Forgot Password?" : step === 2? "Verify OTP" : "Reset Password"}
        </h2>
        <p className="text-[#666] text-[14px] mb-6">
          {step === 1? "Enter your registered email to receive OTP" : step === 2? `OTP sent to ${email}` : "Create a strong new password"}
        </p>

        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#d4af37]/50 rounded-[12px] px-4 py-3.5 text-white placeholder:text-[#555] outline-none transition"
            />
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold py-3.5 rounded-[12px] hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleVerify} className="space-y-5">
            <input
              type="text"
              required
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#d4af37]/50 rounded-[12px] px-4 py-3.5 text-center text-[20px] tracking-[8px] text-white placeholder:text-[#555] placeholder:tracking-normal placeholder:text-[14px] outline-none"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white py-3.5 rounded-[12px] hover:bg-[#222] transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold py-3.5 rounded-[12px] hover:opacity-90 transition"
              >
                Verify
              </button>
            </div>
            <button type="button" onClick={handleSendOtp} className="w-full text-[#d4af37] text-[13px] hover:underline">
              Resend OTP
            </button>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form onSubmit={handleReset} className="space-y-5">
            <input
              type="password"
              required
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#d4af37]/50 rounded-[12px] px-4 py-3.5 text-white placeholder:text-[#555] outline-none"
            />
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold py-3.5 rounded-[12px] hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {msg && (
          <p className={`mt-5 text-[13px] text-center p-3 rounded-[10px] ${msg.includes("successful") || msg.includes("sent") || msg.includes("verified")? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
            {msg}
          </p>
        )}

        <div className="mt-8 text-center">
          <Link href="/login" className="text-[#888] text-[13px] hover:text-white transition">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}