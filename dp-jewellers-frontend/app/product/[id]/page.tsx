"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // <-- IDI IMPORTANT BRO - NEXT 15 FIX
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id || id === "undefined") return;
    fetch(`/api/backend/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product not found for ID: {id}</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="px-6 md:px-20 py-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-[#111] rounded-2xl overflow-hidden">
          <img src={product.imageUrl || product.image_url} alt={product.name} className="w-full h-[500px] object-cover" />
        </div>
        <div>
          <p className="text-[#c9a84c] tracking-widest text-xs">{product.category} • {product.subCategory || product.sub_category}</p>
          <h1 className="text-4xl font-serif font-bold mt-3 text-[#e6c87a]">{product.name}</h1>
          <p className="text-white/60 text-sm mt-3">{product.description}</p>
          <p className="text-3xl font-bold mt-6">₹{product.price?.toLocaleString()}</p>
          <p className="text-white/40 text-xs mt-2">Stock: {product.stock} • Weight: {product.weight}g • Purity: {product.purity || '22K'}</p>
          <div className="flex gap-4 mt-8">
            <button onClick={() => router.back()} className="px-6 py-3 border border-[#c9a84c] rounded-full text-sm">Go Back</button>
            <button className="px-8 py-3 bg-[#c9a84c] text-black font-bold rounded-full">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}