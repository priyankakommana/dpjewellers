"use client"
import Script from "next/script"
import { useEffect, useState } from "react"

export default function Checkout() {
  const [addresses, setAddresses] = useState<any[]>([])
  const [selected, setSelected] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY")

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:8080/api/address/my", { 
      headers: { Authorization: `Bearer ${token}` } 
    })
     .then(r => r.json()).then((d) => { 
        setAddresses(d); 
        if (d[0]) setSelected(`${d[0].fullName}, ${d[0].phone}, ${d[0].addressLine1}, ${d[0].city}, ${d[0].pincode}`) 
     })
  }, [])

  const payWithRazorpay = async () => {
    if (!selected) return alert("Select address bro")
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: 1000 }),
      })
      
      // LOG THE REAL ERROR
      if (!res.ok) {
        const err = await res.text()
        console.log("BACKEND ERROR:", err)
        alert("Backend Error: " + err)
        return
      }

      const data = await res.json()
      console.log("Razorpay Data:", data)

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "DP Jewellers",
        description: "Gold Jewellery Purchase",
        order_id: data.orderId,
        handler: function (response: any) {
          alert("Payment Success! " + response.razorpay_payment_id)
          window.location.href = "/orders"
        },
        theme: { color: "#D4AF37" },
      }
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (e) {
      console.error(e)
      alert("Error: " + e)
    }
  }

  const placeCOD = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:8080/api/orders/place", {
      method: "POST", 
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ address: selected })
    })
    if (res.ok) { alert("Order Placed!"); window.location.href = "/orders" }
    else { alert(await res.text()) }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
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
        <div className="flex gap-3 my-6">
          <label className={`flex-1 border p-3 rounded-lg cursor-pointer ${paymentMethod==='RAZORPAY' ? 'border-yellow-500' : 'border-zinc-800'}`}>
            <input type="radio" checked={paymentMethod==='RAZORPAY'} onChange={()=>setPaymentMethod('RAZORPAY')} className="mr-2"/> Online
          </label>
          <label className={`flex-1 border p-3 rounded-lg cursor-pointer ${paymentMethod==='COD' ? 'border-yellow-500' : 'border-zinc-800'}`}>
            <input type="radio" checked={paymentMethod==='COD'} onChange={()=>setPaymentMethod('COD')} className="mr-2"/> COD
          </label>
        </div>
        {paymentMethod === 'COD' ? (
          <button onClick={placeCOD} className="w-full bg-zinc-700 font-bold p-4 rounded-xl">Place Order (Cash On Delvery)</button>
        ) : (
          <button onClick={payWithRazorpay} className="w-full bg-[#D4AF37] text-black font-bold p-4 rounded-xl">Pay Now with Razorpay</button>
        )}
      </div>
    </div>
  )
}
// // "use client"
// // import { useEffect, useState } from "react"

// // export default function Checkout() {
// //   const [addresses, setAddresses] = useState<any[]>([])
// //   const [selected, setSelected] = useState("")
// //   useEffect(() => {
// //     const token = localStorage.getItem("token")
// //     fetch("http://localhost:8080/api/address/my", { headers: { Authorization: `Bearer ${token}` } })
// //      .then(r => r.json()).then((d) => { setAddresses(d); if (d[0]) setSelected(`${d[0].fullName}, ${d[0].phone}, ${d[0].addressLine1}, ${d[0].city}, ${d[0].pincode}`) })
// //   }, [])

// //   const place = async () => {
// //     if (!selected) return alert("Select address bro")
// //     const token = localStorage.getItem("token")
// //     const res = await fetch("http://localhost:8080/api/orders/place", {
// //       method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// //       body: JSON.stringify({ address: selected })
// //     })
// //     if (res.ok) { alert("Order Placed Success!"); window.location.href = "/orders" }
// //     else { const t = await res.text(); alert(t) }
// //   }

// //   return (
// //     <div className="min-h-screen bg-black text-white p-6">
// //       <div className="max-w-xl mx-auto">
// //         <h1 className="text-3xl font-bold mb-6">Place Order</h1>
// //         <p className="text-gray-400 mb-3">Select Delivery Address</p>
// //         {addresses.map((a: any) => {
// //           const full = `${a.fullName}, ${a.phone}, ${a.addressLine1}, ${a.city}, ${a.state}, ${a.pincode}`
// //           return (
// //             <label key={a.id} className={`block border p-4 rounded-lg mb-3 cursor-pointer ${selected === full? 'border-yellow-500 bg-zinc-900' : 'border-zinc-800'}`}>
// //               <input type="radio" checked={selected === full} onChange={() => setSelected(full)} className="mr-2" />
// //               {full}
// //             </label>
// //           )
// //         })}
// //         <button onClick={place} className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl mt-6 text-lg">Place Order (COD)</button>
// //       </div>
// //     </div>
// //   )
// // }
