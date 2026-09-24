
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
        <div className="w-full lg:w-[60%] h-[500px] lg:h-auto relative lg:-ml-[5%]">
          <img src="/assets/bg.jpeg" alt="bridal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>
      </div>

      <div className="w-full h-[44px] bg-black border-t-2 border-[#c9a84c] flex items-center justify-center gap-10 lg:gap-24 text-[#c9a84c] text-xs shrink-0">
        <span>🚚 Free Shipping</span>
        <span>🛡️ Secure Payments</span>
        <span>⭐ 1000+ Reviews</span>
      </div>
    </div>
  );
}