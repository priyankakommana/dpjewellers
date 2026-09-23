"use client"
import { useEffect, useState } from "react"

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([])
  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:8080/api/orders/my", { headers: { Authorization: `Bearer ${token}` } })
     .then(r => r.json()).then(setOrders)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 && <p className="text-gray-400">No orders yet bro</p>}
        {orders.map((o: any) => (
          <div key={o.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl mb-4">
            <div className="flex justify-between"><span className="font-bold">Order #{o.id}</span><span className="text-green-400 text-sm">{o.status}</span></div>
            <p className="text-gray-400 text-sm mt-1">{new Date(o.createdAt).toLocaleString()} | {o.paymentMethod} | ₹{o.totalAmount}</p>
            <p className="text-gray-300 text-sm mt-2 bg-black p-2 rounded">📍 {o.shippingAddress}</p>
            <div className="mt-3 border-t border-zinc-800 pt-3">
              {o.items?.map((it: any, idx: number) => (
                <p key={idx} className="text-sm flex justify-between"><span>{it.productName} x {it.quantity}</span><span>₹{it.price}</span></p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}