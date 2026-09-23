"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type WishlistItem = {
  id: number;
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
};

export default function WishlistPage() {
  const [list, setList] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/backend/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setList([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const addToCart = async (item: WishlistItem) => {
    const token = localStorage.getItem("token");
    await fetch("/api/backend/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: item.productId, quantity: 1 }),
    });
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to cart!");
  };

  const remove = async (id: number) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/backend/wishlist/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchList();
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (loading) {
    return <div className="min-h-screen bg-[#050505] text-white p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <button onClick={() => router.back()} className="mb-4">← Back</button>
        <h1 className="text-2xl font-serif mb-6">My Wishlist</h1>

        {list.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {list.map((item: any) => (
              <div key={item.id} className="flex gap-4 border p-4 rounded">
                <img src={item.imageUrl || item.product?.imageUrl} alt="" className="w-24 h-24 object-cover" />
                <div className="flex-1">
                  <p>{item.productName}</p>
                  <p>₹{item.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => addToCart(item)} className="bg-white text-black px-3 py-1 rounded">Add to Cart</button>
                    <button onClick={() => remove(item.id)} className="border px-3 py-1 rounded">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}