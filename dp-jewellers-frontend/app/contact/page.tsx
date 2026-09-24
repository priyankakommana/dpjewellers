// "use client";
"use client";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 relative">
      
      <div className="w-full max-w-[640px] mx-auto">

        
        <div className="flex justify-start mb-12 mt-2">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 rounded-full text-sm text-[#c9a84c] border border-[#c9a84c]/30 text-[15px] bg-black hover:bg-[#c9a84c] hover:text-black transition-all duration-200"
          >
            ← Back
          </button>
        </div>

        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-left leading-tight">
          Contact DP Jewellers
        </h1>
        <p className="text-gray-400 text-left mt-4 text-[15px]">
          Chanda Nagar, Hyderabad, Telangana - 500050
        </p>

        {/* Info Card */}
        <div className="mt-10 bg-[#11131A] rounded-2xl p-6 md:p-7 border border-white/5">
          <div className="space-y-5 text-[15px]">
            <p className="flex gap-3">
              <span>📞</span> Phone: +91 98765 43210
            </p>
            <p className="flex gap-3">
              <span>📧</span> Email: support@dpjewellers.com
            </p>
            <p className="flex gap-3">
              <span>📍</span> Store: MIG 123, Chanda Nagar Main Road
            </p>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="flex justify-center mt-10">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            className="bg-[#1DB954] hover:bg-[#1aa64b] text-white font-semibold px-8 py-3.5 rounded-full transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="fixed bottom-5 left-5 w-9 h-9 rounded-full bg-black border border-white/20 flex items-center justify-center text-white">
        N
      </div>
      <div className="fixed bottom-5 right-5 w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center">
        💬
      </div>
    </div>
  );
}