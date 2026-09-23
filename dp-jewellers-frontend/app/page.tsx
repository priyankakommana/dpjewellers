"use client";
import { useRouter } from "next/navigation";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./context/AuthContext";

export default function Landing() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const goShop = () => isLoggedIn? router.push("/home") : router.push("/login?redirect=/home");

  return (
    <div className="w-full min-h-screen bg-black flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 w-full flex flex-col lg:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-[52%] bg-black px-6 lg:pl-16 lg:pr-8 py-8 lg:py-0 flex flex-col justify-center">
          <div className="w-fit px-4 py-1 rounded-full border border-[#c9a84c] text-[11px] tracking-widest mb-5 text-white">
            EST. 1995 • LUXURY HANDCRAFTED
          </div>
          <h1 className="font-serif leading-[1]">
            <span className="block text-white text-[42px] lg:text-[56px] font-light">Welcome to</span>
            <span className="block text-[#d4af37] text-[42px] lg:text-[56px] font-bold mt-1">DP Jewellers</span>
          </h1>
          <h2 className="text-[#c9a84c] text-[18px] font-bold mt-4 font-serif">Timeless Bridal & Fine Jewellery</h2>
          <p className="text-gray-300 text-[13px] leading-6 mt-3 max-w-[440px]">
            Discover exquisitely crafted bridal jewellery and fine gold pieces, designed for generations.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button onClick={goShop} className="px-6 py-2.5 bg-[#d4af37] text-black rounded-full text-sm font-bold">Shop Collections</button>
            <button onClick={()=>router.push('/home')} className="px-6 py-2.5 border border-[#c9a84c] text-white rounded-full text-sm">Browse All</button>
          </div>
          <div className="flex flex-wrap gap-5 mt-6 text-[11px] text-[#c9a84c]">
            <span>🛡️ Certified 22K Gold</span>
            <span>Hallmarked</span>
            <span>🔄 Lifetime Exchange</span>
          </div>
        </div>
        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-[48%] h-[500px] lg:h-auto relative">
          <img src="/assets/bg.jpeg" alt="bridal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>
      </div>

      {/* ===== SHOP BY METAL - IKKADE ADD CHESA BRO =====
      <div className="w-full bg-[#0a0a0a] px-6 lg:px-16 py-12 border-t border-[#c9a84c]/20">
        <h2 className="text-center text-[#e6c87a] tracking-[0.3em] text-sm mb-8">SHOP BY METAL</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div onClick={()=>router.push('/gold')} className="cursor-pointer bg-[#111] border border-[#c9a84c]/30 rounded-3xl p-10 text-center hover:border-[#f7d774] hover:scale-105 transition-all">
            <div className="text-6xl mb-4">💍</div>
            <h3 className="text-[#f7d774] text-2xl font-bold">Gold</h3>
            <p className="text-white/40 text-xs mt-2">22K 916 Hallmarked</p>
          </div>
          <div onClick={()=>router.push('/silver')} className="cursor-pointer bg-[#111] border border-white/10 rounded-3xl p-10 text-center hover:border-white/40 hover:scale-105 transition-all">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-white text-2xl font-bold">Silver</h3>
            <p className="text-white/40 text-xs mt-2">Pure 925 Silver</p>
          </div>
          <div onClick={()=>router.push('/diamond')} className="cursor-pointer bg-[#111] border border-blue-200/20 rounded-3xl p-10 text-center hover:border-blue-200/50 hover:scale-105 transition-all">
            <div className="text-6xl mb-4">💎</div>
            <h3 className="text-blue-200 text-2xl font-bold">Diamond</h3>
            <p className="text-white/40 text-xs mt-2">IGI Certified</p>
          </div>
        </div> */}
      {/* </div> */}

      <div className="w-full h-[44px] bg-black border-t-2 border-[#c9a84c] flex items-center justify-center gap-10 lg:gap-24 text-[#c9a84c] text-xs shrink-0">
        <span>🚚 Free Shipping</span>
        <span>🛡️ Secure Payments</span>
        <span>⭐ 1000+ Reviews</span>
      </div>
    </div>
  );
}