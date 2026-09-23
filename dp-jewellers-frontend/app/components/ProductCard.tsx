"use client";
import { useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token?.substring(0,20)); // debug
  if (!token) {
    window.location.href = "/login";
    return;
  }
  setLoading(true);
  try {
    const res = await fetch("/api/backend/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.trim()}`, // trim important
      },
      body: JSON.stringify({ 
        productId: product.id, // _id vaddu, id okkate
        quantity: 1 
      }),
    });
    const data = await res.json();
    console.log("STATUS:", res.status, data);
    if (res.ok) {
      window.dispatchEvent(new Event("cartUpdated"));
      alert("Added to cart");
    } else {
      alert(JSON.stringify(data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
  const handleWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    const res = await fetch("/api/backend/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product._id || product.id }),
    });
    if (res.ok) window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="relative bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-lg p-3">
      <button onClick={handleWishlist} className="absolute top-2 right-2 text-white">♡</button>
      <img src={product.image || product.image || product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-sm text-white truncate">{product.name}</h3>
      <p className="text-[#f7d774] font-bold">₹{product.price}</p>
      <button onClick={handleAddToCart} disabled={loading} className="w-full mt-2 bg-[#c9a84c] text-black py-1 rounded-full text-sm">
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}