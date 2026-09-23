"use client"
import { useEffect, useState } from "react"

export default function Checkout() {
  const [addresses, setAddresses] = useState<any[]>([])
  const [selected, setSelected] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:8080/api/address/my", { headers: { Authorization: `Bearer ${token}` } })
     .then(r => r.json()).then((d) => { setAddresses(d); if (d[0]) setSelected(`${d[0].fullName}, ${d[0].phone}, ${d[0].addressLine1}, ${d[0].city}, ${d[0].pincode}`) })
  }, [])

  const place = async () => {
    if (!selected) return alert("Select address bro")
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:8080/api/orders/place", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ address: selected })
    })
    if (res.ok) { alert("Order Placed Success!"); window.location.href = "/orders" }
    else { const t = await res.text(); alert(t) }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Place Order</h1>
        <p className="text-gray-400 mb-3">Select Delivery Address</p>
        {addresses.map((a: any) => {
          const full = `${a.fullName}, ${a.phone}, ${a.addressLine1}, ${a.city}, ${a.state}, ${a.pincode}`
          return (
            <label key={a.id} className={`block border p-4 rounded-lg mb-3 cursor-pointer ${selected === full? 'border-yellow-500 bg-zinc-900' : 'border-zinc-800'}`}>
              <input type="radio" checked={selected === full} onChange={() => setSelected(full)} className="mr-2" />
              {full}
            </label>
          )
        })}
        <button onClick={place} className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl mt-6 text-lg">Place Order (COD)</button>
      </div>
    </div>
  )
}

