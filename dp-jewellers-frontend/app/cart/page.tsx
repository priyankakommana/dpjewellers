"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/backend/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCart(data);
    setLoading(false);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQty = async (item: CartItem, newQty: number) => {
    if (newQty < 1) return;
    const token = localStorage.getItem("token");
    // remove and re-add with new qty (simplest)
    await fetch(`/api/backend/cart/${item.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (newQty > 0) {
      await fetch("/api/backend/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: item.productId, quantity: newQty }),
      });
    }
    fetchCart();
  };

  const remove = async (cartId: number) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/backend/cart/${cartId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (loading) return <div className="min-h-screen bg-black text-[#c9a84c] flex items-center justify-center">Loading Cart...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <button onClick={() => router.back()} className="mb-6 text-sm text-[#c9a84c] border border-[#c9a84c]/30 px-4 py-1.5 rounded-full hover:bg-[#c9a84c] hover:text-black transition">← Back</button>

        <h1 className="text-2xl font-serif text-[#c9a84c] mb-6">Shopping Cart - {cart.length} items</h1>

        {cart.length === 0 ? (
          <div className="bg-[#111] border border-[#c9a84c]/10 rounded-2xl p-12 text-center">
            <p className="text-gray-400">Your cart is empty</p>
            <button onClick={() => router.push("/gold")} className="mt-4 bg-[#c9a84c] text-black px-6 py-2 rounded-full font-bold">Browse Gold</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-[#c9a84c]/15 rounded-2xl p-4">
                  <img src={item.imageUrl} alt={item.productName} className="w-24 h-24 object-cover rounded-xl bg-white" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.productName}</h3>
                    <p className="text-[#c9a84c] text-sm mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQty(item, item.quantity - 1)} className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-[#c9a84c]">-</button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item, item.quantity + 1)} className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-[#c9a84c]">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold text-[#f7d774]">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    {/* Gold + White Delete */}
                    <button onClick={() => remove(item.id)} className="text-xs border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black px-3 py-1 rounded-full transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary - Real Cart */}
            <div className="bg-[#111] border border-[#c9a84c]/20 rounded-2xl p-6 h-fit sticky top-6">
              <h3 className="text-lg font-serif text-[#c9a84c] mb-4">Cart Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400"><span>Subtotal ({cart.length} items)</span><span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-green-400">FREE</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold"><span>Total</span><span className="text-[#f7d774]">₹{total.toLocaleString("en-IN")}</span></div>
              </div>
              <button onClick={() => router.push("/checkout")} className="w-full mt-6 bg-gradient-to-r from-[#c9a84c] to-[#f7d774] text-black font-bold py-3 rounded-full hover:scale-[1.02] transition">Place Order</button>
              <button onClick={() => router.push("/gold")} className="w-full mt-3 border border-white/15 text-white py-3 rounded-full text-sm">Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
