
"use client";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const productId = product._id || product.id;

  // Initial + wishlist page nundi remove chesina kuda update avvadaniki
  useEffect(() => {
    const checkWishlist = () => {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsLiked(saved.includes(productId));
    };

    checkWishlist();

    // Wishlist page nundi event vaste malli check
    window.addEventListener("wishlistUpdated", checkWishlist);
    return () => window.removeEventListener("wishlistUpdated", checkWishlist);
  }, [productId]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) { window.location.href = "/login"; return; }
    setLoading(true);
    try {
      const res = await fetch("/api/backend/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (res.ok) window.dispatchEvent(new Event("cartUpdated"));
    } finally { setLoading(false); }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) { window.location.href = "/login"; return; }

    const wasLiked = isLiked;
    const newLiked =!wasLiked;

    // 1. Instant UI change
    setIsLiked(newLiked);

    // 2. Local storage update
    let saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (newLiked) {
      if (!saved.includes(productId)) saved.push(productId);
    } else {
      saved = saved.filter((x: any) => x!== productId);
    }
    localStorage.setItem("wishlist", JSON.stringify(saved));
    window.dispatchEvent(new Event("wishlistUpdated"));

    // 3. API - ADD or REMOVE correct
    try {
      const endpoint = newLiked? "/api/backend/wishlist/add" : "/api/backend/wishlist/remove";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        // fail ayithe rollback
        setIsLiked(wasLiked);
        localStorage.setItem("wishlist", JSON.stringify(
          wasLiked? [...saved, productId] : saved.filter((x:any) => x!== productId)
        ));
      }
    } catch (e) {
      setIsLiked(wasLiked);
    }
  };

  return (
    <div className="relative bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-lg p-3">
      <button onClick={handleWishlist} className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center bg-black/50 rounded-full">
        <span className={`text-[18px] transition-all ${isLiked? "text-red-500" : "text-white"}`}>
          {isLiked? "♥" : "♡"}
        </span>
      </button>

      <img src={product.image || product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-sm text-white truncate mt-2">{product.name}</h3>
      <p className="text-[#f7d774] font-bold">₹{product.price}</p>
      <button onClick={handleAddToCart} disabled={loading} className="w-full mt-2 bg-[#c9a84c] text-black py-1 rounded-full text-sm">
        {loading? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}