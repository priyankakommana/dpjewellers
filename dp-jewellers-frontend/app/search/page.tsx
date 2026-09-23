"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/navbar/Navbar";

export default function SearchPage() {
  const q = useSearchParams().get("q")?.toLowerCase() || "";
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/backend/products")
     .then(r => r.json())
     .then((data: any) => {
        const arr = Array.isArray(data)? data : data.data || [];
        // Spelling matching - name, category, subCategory lo search
        const filtered = arr.filter((p:any) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        );
        setProducts(filtered);
      });
  }, [q]);

  return (
    <div className="min-h-screen bg-black text-white"><Navbar />
      <h1 className="text-center mt-6 text-[#f7d774]">Search: "{q}" - {products.length} found</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6 px-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}