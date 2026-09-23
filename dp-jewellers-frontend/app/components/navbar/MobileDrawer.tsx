"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  cartCount: number;
  wishCount: number;
  onLogout: () => void;
};

export default function MobileDrawer({ open, onClose, cartCount, wishCount, onLogout }: Props) {
  const router = useRouter();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-[320px] bg-[#111] border-l-2 border-[#c9a84c] p-6 flex flex-col gap-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#c9a84c] font-serif text-xl font-bold">My Account</h2>
          <button onClick={onClose} className="text-[#c9a84c] text-2xl">✕</button>
        </div>

        {/* LINKS - IVE ANNI WHITE COLOR - NEE PROBLEM FIX */}
        <Link href="/home" onClick={onClose} className="text-white hover:text-[#c9a84c] hover:bg-white/5 py-3 px-4 rounded-lg transition">🏠 Home</Link>

        <Link href="/profile" onClick={onClose} className="text-white hover:text-[#c9a84c] hover:bg-white/5 py-3 px-4 rounded-lg transition">
          👤 My Profile / Address
        </Link>

        <Link href="/cart" onClick={onClose} className="text-white hover:text-[#c9a84c] hover:bg-white/5 py-3 px-4 rounded-lg flex justify-between">
          <span>👜 My Cart</span> <span className="bg-[#c9a84c] text-black text-xs px-2 py-1 rounded-full">{cartCount}</span>
        </Link>

        <Link href="/checkout" onClick={onClose} className="bg-[#d4af37] text-black font-bold py-3 px-4 rounded-lg text-center mt-2">
          📦 Place Order
        </Link>

        <Link href="/orders" onClick={onClose} className="text-white hover:text-[#c9a84c] hover:bg-white/5 py-3 px-4 rounded-lg transition">
          📜 My Orders
        </Link>

        <Link href="/wishlist" onClick={onClose} className="text-white hover:text-[#c9a84c] hover:bg-white/5 py-3 px-4 rounded-lg flex justify-between">
          <span>❤️ Wishlist</span> <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{wishCount}</span>
        </Link>

        <Link href="/contact" onClick={onClose} className="text-white hover:text-[#c9a84c] hover:bg-white/5 py-3 px-4 rounded-lg transition">
          📞 Contact Us
        </Link>

        <button onClick={onLogout} className="mt-auto bg-[#c9a84c] text-black font-bold py-3 rounded-lg hover:bg-[#d4af37]">
          Sign Out
        </button>
      </div>
    </div>
  );
}