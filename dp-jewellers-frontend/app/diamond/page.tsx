"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProductCard from "../components/ProductCard"; // <-- 1. IDI PAINA ADD CHEY

export default function DiamondPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [active, setActive] = useState("All");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/backend/products").then(r=>r.json()).then(data=>{
      const diamond = data.filter((p:any)=> p.category?.toUpperCase() === "DIAMOND");
      console.log("DIAMOND PRODUCTS:", diamond);
      setProducts(diamond);
    });
  }, []);

  const allSubs = Array.from(new Set(products.map((p:any)=> p.subCategory || p.sub_category).filter(Boolean))) as string[];
  const FILTERS = ["All", ...allSubs];

  const list = active === "All" ? products : products.filter(p => (p.subCategory || p.sub_category) === active);

  return (
    <div className="min-h-screen bg-black text-white"><Navbar />
      <div className="px-6 md:px-20 py-6">
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setActive(f as string)} className={`px-5 py-2 rounded-full border text-xs ${active===f? "bg-[#f7d774] text-black font-bold":"border-[#c9a84c]/40 text-[#f7d774]"}`}>{f as string}</button>
          ))}
        </div>
        <h1 className="text-center text-3xl text-[#f7d774]">DIAMOND - {list.length} Products</h1>
        
        {/* 2. IKKADA MUNDU UNNA GRID NI TEESI IDI PETTU */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {list.map((p:any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </div>
  );
}
