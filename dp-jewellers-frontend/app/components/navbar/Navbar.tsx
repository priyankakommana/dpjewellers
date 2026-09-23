"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MobileDrawer from "./MobileDrawer";
import UserDrawer from "./UserDrawer";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  
  const isLanding = pathname === "/";

  const guard = (e: any, href: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push(`/login?redirect=${href}`);
    } else {
      router.push(href);
    }
  };

  const fetchCounts = useCallback(async () => {
    const token = typeof window!== "undefined"? localStorage.getItem("token") : null;
    if (!token || token === "undefined" || token === "null") {
      setCartCount(0);
      setWishCount(0);
      return;
    }
    try {
      const cartRes = await fetch("/api/backend/cart", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        cache: "no-store",
      });
      if (cartRes.ok) {
        const d = await cartRes.json();
        const arr = Array.isArray(d)? d : d?.data || d?.items || [];
        setCartCount(arr.length);
      }
      const wishRes = await fetch("/api/backend/wishlist", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        cache: "no-store",
      });
      if (wishRes.ok) {
        const d = await wishRes.json();
        const arr = Array.isArray(d)? d : d?.data || d?.items || [];
        setWishCount(arr.length);
      }
    } catch (err) {
      console.log("Navbar fetch error", err);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setCartCount(0);
      setWishCount(0);
      return;
    }
    const timer = setTimeout(() => { fetchCounts(); }, 200);
    const handler = () => fetchCounts();
    window.addEventListener("cartUpdated", handler);
    window.addEventListener("wishlistUpdated", handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("cartUpdated", handler);
      window.removeEventListener("wishlistUpdated", handler);
    };
  }, [isLoggedIn, fetchCounts]);

  const handleSearch = (e: any) => {
    if (e.key === "Enter" && query.trim()) {
      setShowSearch(false);
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <>
      <nav className="w-full h-[74px] bg-[#0a0a0a] border-b-2 border-[#c9a84c] flex items-center sticky top-0 z-50">
        <div className="w-[120px] flex justify-center shrink-0">
          <Link href="/"><img src="/assets/logo.jpeg" alt="DP" className="w-12 h-12 rounded-full border border-[#c9a84c]" /></Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-8 font-serif text-[15px] text-white/80">
            <a href="#" onClick={(e) => guard(e, "/home")} className="hover:text-[#c9a84c] cursor-pointer">HOME</a>
            <a href="#" onClick={(e) => guard(e, "/silver")} className="hover:text-[#c9a84c] cursor-pointer">SILVER</a>
            <a href="#" onClick={(e) => guard(e, "/gold")} className="hover:text-[#c9a84c] cursor-pointer">GOLD</a>
            <a href="#" onClick={(e) => guard(e, "/diamond")} className="hover:text-[#c9a84c] cursor-pointer">DIAMOND</a>
            <Link href="/contact" className="hover:text-[#c9a84c]">CONTACT</Link>
          </div>
        </div>
        <div className="w-[240px] flex justify-end items-center gap-4 pr-8 shrink-0">
          {!isLoggedIn? (
            <>
              <Link href="/login" className="px-5 py-2 border border-[#c9a84c] text-[#c9a84c] rounded-lg text-sm">Sign In</Link>
              <Link href="/register" className="px-5 py-2 bg-[#d4af37] text-black rounded-lg text-sm font-bold">Sign Up</Link>
            </>
          ) : isLanding? (
            <>
              <button onClick={() => setOpenUser(true)} className="text-[#c9a84c] text-xl">👤</button>
              <button onClick={() => setOpenMenu(true)} className="text-[#c9a84c] text-3xl">☰</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowSearch(!showSearch)} className="text-[#c9a84c]">🔍</button>
              <Link href="/wishlist" className="text-[#c9a84c] relative">❤️ {wishCount > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{wishCount}</span>}</Link>
              <Link href="/cart" className="text-[#c9a84c] relative">👜 {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#c9a84c] text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}</Link>
              <button onClick={() => setOpenUser(true)} className="text-[#c9a84c] text-xl">👤</button>
              <button onClick={() => setOpenMenu(true)} className="text-[#c9a84c] text-3xl ml-2">☰</button>
            </>
          )}
        </div>
      </nav>

      {showSearch && (
        <div className="fixed top-[74px] left-0 w-full bg-[#0a0a0a] border-b border-[#c9a84c]/30 p-4 z-[60] flex justify-center">
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} placeholder="Search..." className="w-[500px] max-w-full px-4 py-2 rounded-lg bg-white text-black outline-none" />
          <button onClick={() => query && router.push(`/search?q=${query}`)} className="ml-2 px-4 py-2 bg-[#c9a84c] text-black rounded-lg font-bold">Search</button>
        </div>
      )}

      {/* TWO DRAWERS - SEPARATE */}
      <MobileDrawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        cartCount={cartCount}
        wishCount={wishCount}
        onLogout={() => { logout(); setOpenMenu(false); router.push("/"); }}
      />

      <UserDrawer
        open={openUser}
        onClose={() => setOpenUser(false)}
      />
    </>
  );
}
