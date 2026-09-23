"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "../context/AuthContext";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP STATES - ADDED HERE
  const [step, setStep] = useState(1); // 1 = form, 2 = otp
  const [otp, setOtp] = useState("");

  const redirect = searchParams.get("redirect") || "/home";

  const handleRegister = async () => {
    if (!fullName ||!email ||!phone ||!password) return alert("All fields required bro");
    if (password!== confirm) return alert("Passwords mismatch");
    if (!agree) return alert("Please agree to Terms");
    setLoading(true);
    try {
      // 1. Send OTP first
      const otpRes = await fetch("/api/backend/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!otpRes.ok) {
        const d = await otpRes.json();
        throw new Error(d.error || "Failed to send OTP");
      }

      // 2. Register user (inactive / pending)
      const res = await fetch("/api/backend/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Register failed");

      // Go to OTP step
      setStep(2);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) return alert("Enter OTP");
    setLoading(true);
    try {
      const res = await fetch("/api/backend/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");

      alert("Verified! Please login now");
      router.push(`/login?redirect=${redirect}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] w-full bg-[#0d0c0a] relative flex items-center justify-center px-4 py-8 overflow-hidden">

      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0d0c0a" />
          <g stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.6">
            <path d="M50 50 Q90 30 130 50 T210 50" />
            <circle cx="80" cy="120" r="22" />
            <path d="M300 80 L330 80 L340 95 L315 125 L285 95 Z" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_#0d0c0a_90%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[460px]">
        <div className="bg-[#11100e] rounded-[12px] p-[6px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-[#1a1a1a]">
          <div className="relative bg-[#0f0e0c] rounded-[8px] border border-[#c9a84c]/80 px-7 py-7 md:px-8">

            <div className="absolute top-2 left-2 w-9 h-9 text-[#d4af37]">❧</div>
            <div className="absolute top-2 right-2 w-9 h-9 text-[#d4af37] scale-x-[-1]">❧</div>
            <div className="absolute bottom-2 left-2 w-9 h-9 text-[#d4af37] scale-y-[-1]">❧</div>
            <div className="absolute bottom-2 right-2 w-9 h-9 text-[#d4af37] scale-x-[-1] scale-y-[-1]">❧</div>
            <div className="absolute inset-[10px] border border-[#c9a84c]/20 rounded-[4px] pointer-events-none" />

            <h1 className="text-center text-[#e8c765] font-serif text-[28px] font-bold tracking-wide leading-none">CREATE ACCOUNT</h1>
            <p className="text-center text-[#e8c765]/90 text-[16px] mt-2 font-semibold">Join DP Jewellers family.</p>

            {/* === CONDITIONAL RENDER === */}
            {step === 2? (
              <div className="mt-8 space-y-5">
                <p className="text-center text-[#f5e6c8] text-[14px]">OTP sent to <span className="text-[#e8c765] font-bold">{email}</span></p>
                <div>
                  <label className="text-[#d4b66a] text-[13px] font-bold">Enter OTP</label>
                  <input
                    value={otp}
                    onChange={e=>setOtp(e.target.value)}
                    placeholder="000000"
                    className="w-full mt-1 bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[12px] text-center tracking-[10px] text-xl text-[#f5e6c8] outline-none focus:border-[#e8c765]"
                  />
                  <p className="text-[#c9a84c]/60 text-[11px] mt-2 text-center">Valid for 5 minutes</p>
                </div>
                <button onClick={verifyOtp} disabled={loading}
                  className="w-full bg-[#d4a731] hover:bg-[#e0b63e] text-black font-bold py-[11px] rounded-[6px] transition text-[15px] tracking-wide">
                  {loading?"VERIFYING...":"VERIFY OTP"}
                </button>
                <button onClick={()=>setStep(1)} className="w-full text-[#d4b66a] text-[13px] underline">Back to form</button>
              </div>
            ) : (
              <div className="mt-6 space-y-3.5">
                <div>
                  <label className="text-[#d4b66a] text-[13px] font-bold">Full Name</label>
                  <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Enter your full name"
                    className="w-full mt-1 bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765]" />
                </div>
                <div>
                  <label className="text-[#d4b66a] text-[13px] font-bold">Email</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address"
                    className="w-full mt-1 bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765]" />
                </div>
                <div>
                  <label className="text-[#d4b66a] text-[13px] font-bold">Phone Number</label>
                  <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 (555) 000-0000"
                    className="w-full mt-1 bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765]" />
                </div>
                <div>
                  <label className="text-[#d4b66a] text-[13px] font-bold">Password</label>
                  <div className="relative mt-1">
                    <input type={show1?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password"
                      className="w-full bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765] pr-10" />
                    <button onClick={()=>setShow1(!show1)} className="absolute right-3 top-[9px] text-[#d4af37] text-[16px]">{show1?"🙈":"👁️"}</button>
                  </div>
                </div>
                <div>
                  <label className="text-[#d4b66a] text-[13px] font-bold">Confirm Password</label>
                  <div className="relative mt-1">
                    <input type={show2?"text":"password"} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Re-enter your password"
                      className="w-full bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765] pr-10" />
                    <button onClick={()=>setShow2(!show2)} className="absolute right-3 top-[9px] text-[#d4af37] text-[16px]">{show2?"🙈":"👁️"}</button>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                  <span className={`mt-[1px] w-[18px] h-[18px] border border-[#c9a84c] rounded-[4px] flex items-center justify-center shrink-0 ${agree?"bg-[#c9a84c]/20":""}`}>
                    {agree && <span className="text-[12px] text-[#c9a84c]">✓</span>}
                  </span>
                  <input type="checkbox" className="hidden" checked={agree} onChange={e=>setAgree(e.target.checked)} />
                  <span className="text-[#f5e6c8]/80 text-[12.5px]">I agree to <Link href="/terms" className="text-[#d4b66a] underline underline-offset-4">Terms and Conditions</Link></span>
                </label>

                <button onClick={handleRegister} disabled={loading}
                  className="w-full bg-[#d4a731] hover:bg-[#e0b63e] text-black font-bold py-[11px] rounded-[6px] transition text-[15px] tracking-wide mt-2">
                  {loading?"SENDING OTP...":"CREATE ACCOUNT"}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-[1px] bg-[#c9a84c]/40"></div>
                  <span className="text-[#e8c765] text-[13px] font-bold">OR</span>
                  <div className="flex-1 h-[1px] bg-[#c9a84c]/40"></div>
                </div>

                <button className="w-full border border-[#c9a84c] rounded-[6px] py-[10px] flex items-center justify-center gap-2.5 text-[#f5e6c8] text-[14px] hover:bg-white/[0.03]">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" /> Sign Up with Google
                </button>

                <div className="text-center pt-2">
                  <p className="text-[#d4b66a] text-[13.5px]">Already have an account?</p>
                  <Link href={`/login?redirect=${redirect}`} className="text-[#f5e6c8] text-[14px] underline underline-offset-4 font-medium">Sign in</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-[#c9a84c]/70 text-[11px] tracking-widest uppercase">
          <span>🔒</span> Secure login • 256-bit SSL encryption • Privacy Protected
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[92vh] bg-[#0d0c0a] flex items-center justify-center text-[#c9a84c]">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
// "use client";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense, useState } from "react";
// import { useAuth } from "../context/AuthContext";

// function RegisterContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { login } = useAuth();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [show1, setShow1] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const redirect = searchParams.get("redirect") || "/home";

//   const handleRegister = async () => {
//     if (!fullName ||!email ||!phone ||!password) return alert("All fields required bro");
//     if (password!== confirm) return alert("Passwords mismatch");
//     if (!agree) return alert("Please agree to Terms");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/backend/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: fullName, email, phone, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Register failed");

//       // auto login after register if token comes
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("email", data.email || email);
//         localStorage.setItem("user", JSON.stringify({ email: data.email || email, name: fullName }));
//         login();
//         window.dispatchEvent(new Event("authChanged"));
//         router.push(redirect);
//       } else {
//         alert("Account created! Please Sign In");
//         router.push(`/login?redirect=${redirect}`);
//       }
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-74px)] w-full bg-[#0d0c0a] relative flex items-center justify-center px-4 py-8 overflow-hidden">

//       {/* BACKGROUND same as login */}
//       <div className="absolute inset-0 opacity-20">
//         <svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0d0c0a" />
//           <g stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.6">
//             <path d="M50 50 Q90 30 130 50 T210 50" />
//             <circle cx="80" cy="120" r="22" />
//             <path d="M300 80 L330 80 L340 95 L315 125 L285 95 Z" />
//           </g>
//         </svg>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_#0d0c0a_90%)]" />
//       </div>

//       {/* CARD */}
//       <div className="relative z-10 w-full max-w-[460px]">
//         <div className="bg-[#11100e] rounded-[12px] p-[6px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-[#1a1a1a]">
//           <div className="relative bg-[#0f0e0c] rounded-[8px] border border-[#c9a84c]/80 px-7 py-7 md:px-8">

//             {/* Corners - same as login */}
//             <div className="absolute top-2 left-2 w-9 h-9 text-[#d4af37]">❧</div>
//             <div className="absolute top-2 right-2 w-9 h-9 text-[#d4af37] scale-x-[-1]">❧</div>
//             <div className="absolute bottom-2 left-2 w-9 h-9 text-[#d4af37] scale-y-[-1]">❧</div>
//             <div className="absolute bottom-2 right-2 w-9 h-9 text-[#d4af37] scale-x-[-1] scale-y-[-1]">❧</div>
//             <div className="absolute inset-[10px] border border-[#c9a84c]/20 rounded-[4px] pointer-events-none" />

//             <h1 className="text-center text-[#e8c765] font-serif text-[28px] font-bold tracking-wide leading-none">CREATE ACCOUNT</h1>
//             <p className="text-center text-[#e8c765]/90 text-[16px] mt-2 font-semibold">Join DP Jewellers family.</p>

//             <div className="mt-6 space-y-3.5">
//               <div>
//                 <label className="text-[#d4b66a] text-[13px] font-bold">Full Name</label>
//                 <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Enter your full name"
//                   className="w-full mt-1 bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765]" />
//               </div>
//               <div>
//                 <label className="text-[#d4b66a] text-[13px] font-bold">Email</label>
//                 <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address"
//                   className="w-full mt-1 bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765]" />
//               </div>
//               <div>
//                 <label className="text-[#d4b66a] text-[13px] font-bold">Phone Number</label>
//                 <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 (555) 000-0000"
//                   className="w-full mt-1 bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765]" />
//               </div>
//               <div>
//                 <label className="text-[#d4b66a] text-[13px] font-bold">Password</label>
//                 <div className="relative mt-1">
//                   <input type={show1?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password"
//                     className="w-full bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765] pr-10" />
//                   <button onClick={()=>setShow1(!show1)} className="absolute right-3 top-[9px] text-[#d4af37] text-[16px]">{show1?"🙈":"👁️"}</button>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-[#d4b66a] text-[13px] font-bold">Confirm Password</label>
//                 <div className="relative mt-1">
//                   <input type={show2?"text":"password"} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Re-enter your password"
//                     className="w-full bg-transparent border border-[#c9a84c]/60 rounded-[6px] px-3.5 py-[9px] text-[#f5e6c8] text-[13px] outline-none focus:border-[#e8c765] pr-10" />
//                   <button onClick={()=>setShow2(!show2)} className="absolute right-3 top-[9px] text-[#d4af37] text-[16px]">{show2?"🙈":"👁️"}</button>
//                 </div>
//               </div>

//               <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
//                 <span className={`mt-[1px] w-[18px] h-[18px] border border-[#c9a84c] rounded-[4px] flex items-center justify-center shrink-0 ${agree?"bg-[#c9a84c]/20":""}`}>
//                   {agree && <span className="text-[12px] text-[#c9a84c]">✓</span>}
//                 </span>
//                 <input type="checkbox" className="hidden" checked={agree} onChange={e=>setAgree(e.target.checked)} />
//                 <span className="text-[#f5e6c8]/80 text-[12.5px]">I agree to <Link href="/terms" className="text-[#d4b66a] underline underline-offset-4">Terms and Conditions</Link></span>
//               </label>

//               <button onClick={handleRegister} disabled={loading}
//                 className="w-full bg-[#d4a731] hover:bg-[#e0b63e] text-black font-bold py-[11px] rounded-[6px] transition text-[15px] tracking-wide mt-2">
//                 {loading?"CREATING...":"CREATE ACCOUNT"}
//               </button>

//               <div className="flex items-center gap-3 py-1">
//                 <div className="flex-1 h-[1px] bg-[#c9a84c]/40"></div>
//                 <span className="text-[#e8c765] text-[13px] font-bold">OR</span>
//                 <div className="flex-1 h-[1px] bg-[#c9a84c]/40"></div>
//               </div>

//               <button className="w-full border border-[#c9a84c] rounded-[6px] py-[10px] flex items-center justify-center gap-2.5 text-[#f5e6c8] text-[14px] hover:bg-white/[0.03]">
//                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" /> Sign Up with Google
//               </button>

//               <div className="text-center pt-2">
//                 <p className="text-[#d4b66a] text-[13.5px]">Already have an account?</p>
//                 <Link href={`/login?redirect=${redirect}`} className="text-[#f5e6c8] text-[14px] underline underline-offset-4 font-medium">Sign in</Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer secure - outside card like reference */}
//         <div className="flex items-center justify-center gap-2 mt-4 text-[#c9a84c]/70 text-[11px] tracking-widest uppercase">
//           <span>🔒</span> Secure login • 256-bit SSL encryption • Privacy Protected
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function RegisterPage() {
//   return (
//     <Suspense fallback={<div className="min-h-[92vh] bg-[#0d0c0a] flex items-center justify-center text-[#c9a84c]">Loading...</div>}>
//       <RegisterContent />
//     </Suspense>
//   );
// }