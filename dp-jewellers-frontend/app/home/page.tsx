"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/backend/products")
     .then((r) => r.json())
     .then((data) => {
        setProducts(data);
        setLoading(false);
      })
     .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* SHOP BY METAL - WITH REAL IMAGES */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-center text-[#e6c87a] tracking-[0.35em] text-lg md:text-xl font-semibold mb-8">
          SHOP BY METAL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* GOLD CARD */}
          <div
            onClick={() => router.push("/gold")}
            className="group relative h-[280px] rounded-[20px] overflow-hidden border border-[#c9a84c]/30 cursor-pointer shadow-[0_0_30px_rgba(201,168,76,0.15)]"
          >
            <img
              src="/assets/gold.jpg"
              alt="Gold Jewellery"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h3 className="text-[#f7d774] font-bold text-[22px] tracking-wide">Gold Jewellery</h3>
              <p className="text-white/60 text-xs mt-1 tracking-wider">22K 916 Hallmarked</p>
              <p className="text-[#f7d774]/80 text-xs mt-3 font-medium tracking-widest group-hover:text-[#f7d774] group-hover:underline underline-offset-4">
                Explore →
              </p>
            </div>
          </div>

          {/* SILVER CARD */}
          <div
            onClick={() => router.push("/silver")}
            className="group relative h-[280px] rounded-[20px] overflow-hidden border border-white/20 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <img
              src="/assets/silver.jpg"
              alt="Silver Jewellery"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h3 className="text-white font-bold text-[22px] tracking-wide">Silver Jewellery</h3>
              <p className="text-white/60 text-xs mt-1 tracking-wider">Pure 925 Silver</p>
              <p className="text-white/80 text-xs mt-3 font-medium tracking-widest group-hover:text-white group-hover:underline underline-offset-4">
                Explore →
              </p>
            </div>
          </div>

          {/* DIAMOND CARD */}
          <div
            onClick={() => router.push("/diamond")}
            className="group relative h-[280px] rounded-[20px] overflow-hidden border border-blue-200/20 cursor-pointer shadow-[0_0_30px_rgba(100,180,255,0.15)]"
          >
            <img
              src="/assets/diamond.jpg"
              alt="Diamond Jewellery"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h3 className="text-blue-50 font-bold text-[22px] tracking-wide">Diamond Jewellery</h3>
              <p className="text-white/60 text-xs mt-1 tracking-wider">IGI Certified</p>
              <p className="text-blue-100/80 text-xs mt-3 font-medium tracking-widest group-hover:text-blue-100 group-hover:underline underline-offset-4">
                Explore →
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ALL PRODUCTS */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-center text-[#e6c87a]/70 tracking-[0.3em] text-sm md:text-base font-semibold mb-2">
          ALL PRODUCTS - FROM BACKEND
        </h2>
        <p className="text-center text-white/40 text-xs mb-8">
          {loading? "Loading..." : `${products.length} Products Found`}
        </p>

        {loading? (
          <p className="text-center text-white/30">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {products.map((p) => (
              <div
                key={p.id}
                onClick={() => router.push(`/product/${p.id}`)}
                className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#e6c87a]/30 transition-all group"
              >
                <div className="h-52 overflow-hidden bg-[#0e0e0e]">
                  <img
                    src={p.imageUrl || p.image_url || "/placeholder.jpg"}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm truncate">{p.name}</p>
                  <p className="text-[#e6c87a] text-xs mt-1">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
//       {/* FOOTER TRUST */}
//       <div className="bg-[#111] border-t border-[#c9a84c]/20 py-6 grid grid-cols-3 text-center">
//         <div><p className="text-[#e6c87a] text-xl">🛡️</p><p className="text-[#e6c87a] text-xs font-bold mt-1">Certified 22K Gold</p><p className="text-white/50 text-[11px]">Hallmarked & Quality Assured</p></div>
//         <div><p className="text-[#e6c87a] text-xl">🔄</p><p className="text-[#e6c87a] text-xs font-bold mt-1">Lifetime Exchange</p><p className="text-white/50 text-[11px]">Easy exchange & buyback policy</p></div>
//         <div><p className="text-[#e6c87a] text-xl">🚚</p><p className="text-[#e6c87a] text-xs font-bold mt-1">Free Insured Shipping</p><p className="text-white/50 text-[11px]">Free & secure delivery across India</p></div>
//       </div>
//       <div className="bg-black text-center text-white/40 text-[11px] py-3">© 2024 DP Jewellers &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; Terms & Conditions &nbsp;|&nbsp; Contact Us</div>
//     </div>
//   );
// }