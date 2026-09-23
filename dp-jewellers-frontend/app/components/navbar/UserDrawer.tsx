"use client";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function UserDrawer({ open, onClose }: Props) {
  const [user, setUser] = useState<any>(null);
  const [addr, setAddr] = useState<any>(null);
  const [showPass, setShowPass] = useState(false);
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    if (!open) return;
    const u = localStorage.getItem("user");
    if (u) {
      try { setUser(JSON.parse(u)); } catch {}
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:8080/api/address/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
   .then(r => r.json())
   .then(d => { if (Array.isArray(d) && d[0]) setAddr(d[0]); })
   .catch(() => {});
  }, [open]);

  const changePassword = async () => {
    if (!newPass) return alert("Enter new password bro");
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ newPassword: newPass })
    });
    if (res.ok) {
      alert("Password changed success!");
      setShowPass(false);
      setNewPass("");
    } else {
      alert("Backend API ledu bro - naku cheppu add chesta");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative w-[360px] bg-[#111] border-l-2 border-[#c9a84c] p-6 flex flex-col overflow-y-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#c9a84c] font-serif text-xl font-bold">My Details</h2>
          <button onClick={onClose} className="text-[#c9a84c] text-2xl">✕</button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-3xl">👤</div>
          <p className="text-white mt-3 font-bold">{user?.name || user?.fullName || "User"}</p>
          <p className="text-gray-400 text-sm">ID: #{user?.id || user?.userId || "001"}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-black border border-zinc-800 p-3 rounded-lg">
            <p className="text-[#c9a84c] text-[10px] tracking-widest">EMAIL</p>
            <p className="text-white mt-1 text-sm">{user?.email || "loading..."}</p>
          </div>

          <div className="bg-black border border-zinc-800 p-3 rounded-lg">
            <p className="text-[#c9a84c] text-[10px] tracking-widest">PHONE</p>
            <p className="text-white mt-1 text-sm">{addr?.phone || user?.phone || "Not added"}</p>
          </div>

          <div className="bg-black border border-zinc-800 p-3 rounded-lg">
            <p className="text-[#c9a84c] text-[10px] tracking-widest">ADDRESS</p>
            <p className="text-white mt-1 text-sm">
              {addr? `${addr.addressLine1}, ${addr.city}, ${addr.pincode}` : "No address - Add in Profile"}
            </p>
          </div>

          <div className="bg-black border border-zinc-800 p-3 rounded-lg">
            <p className="text-[#c9a84c] text-[10px] tracking-widest">PASSWORD</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-white text-sm">••••••••••••</span>
              <button onClick={() => setShowPass(!showPass)} className="text-[#c9a84c] text-xs underline">Change Password</button>
            </div>
            {showPass && (
              <div className="mt-3 flex gap-2">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-700 p-2 rounded text-white text-sm outline-none"
                />
                <button onClick={changePassword} className="bg-white text-black px-3 rounded text-sm font-bold">Save</button>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => { onClose(); window.location.href = "/profile"; }}
          className="mt-6 w-full border border-[#c9a84c] text-[#c9a84c] py-2.5 rounded-lg">
          Edit Full Profile
        </button>
      </div>
    </div>
  );
}