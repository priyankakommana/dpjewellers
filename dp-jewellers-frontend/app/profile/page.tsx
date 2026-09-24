"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProfilePage() {
  const [form, setForm] = useState({ fullName: "", phone: "", addressLine1: "", city: "", state: "Telangana", pincode: "" })
  const [list, setList] = useState<any[]>([])
  const token = typeof window!== "undefined"? localStorage.getItem("token") : null;
  const router = useRouter();


  const load = () => {
    if (!token) return
    fetch("http://localhost:8080/api/address/my", { headers: { Authorization: `Bearer ${token}` } })
     .then(r => r.json()).then(setList)
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.fullName ||!form.addressLine1) return alert("Name & Address required")
    const res = await fetch("http://localhost:8080/api/address/save", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    })
    if (res.ok) { setForm({ fullName: "", phone: "", addressLine1: "", city: "", state: "Telangana", pincode: "" }); load() }
  }

  const deleteAddr = async (id: number) => {
    if (!confirm("Delete this address?")) return
    await fetch(`http://localhost:8080/api/address/${id}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${token}` }
    })
    load()
  }

  return (
    <div className="flex min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.back()} className="flex w-full justify-start py-4 md:py-8 text-white text-left">← Back</button>
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
          <input placeholder="Full Name" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value })} className="w-full bg-black border border-zinc-700 p-3 rounded mb-3 text-white outline-none" />
          <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value })} className="w-full bg-black border border-zinc-700 p-3 rounded mb-3 text-white outline-none" />
          <textarea placeholder="House No, Street" value={form.addressLine1} onChange={e => setForm({...form, addressLine1: e.target.value })} className="w-full bg-black border border-zinc-700 p-3 rounded mb-3 text-white outline-none h-20" />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value })} className="bg-black border border-zinc-700 p-3 rounded text-white outline-none" />
            <input placeholder="Pincode" value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value })} className="bg-black border border-zinc-700 p-3 rounded text-white outline-none" />
          </div>
          <input placeholder="State" value={form.state} onChange={e => setForm({...form, state: e.target.value })} className="w-full bg-black border border-zinc-700 p-3 rounded mt-3 text-white outline-none" />
          <button onClick={save} className="w-full bg-white text-black font-bold p-3 rounded mt-6">Save Address</button>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Saved Addresses</h2>
        {list.map((a: any) => (
          <div key={a.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg mb-3 flex justify-between items-start">
            <div><p className="font-bold">{a.fullName} - {a.phone}</p><p className="text-gray-400 text-sm mt-1">{a.addressLine1}, {a.city}, {a.state} - {a.pincode}</p></div>
            <button onClick={() => deleteAddr(a.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm ml-4 hover:bg-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}