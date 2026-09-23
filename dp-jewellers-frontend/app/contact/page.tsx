"use client";

export default function ContactPage() {
  const phoneNumber = "62819666"; // Nee number
  const whatsappMsg = "Hi DP Jewellers! I need help with...";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="min-h-[85vh] bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center mb-8">
        <h1 className="text-white font-serif text-4xl md:text-5xl font-bold tracking-wide">Contact DP Jewellers</h1>
        <p className="text-white/60 mt-3 text-lg">Chanda Nagar, Hyderabad, Telangana - 500050</p>
      </div>

      <div className="w-full max-w-2xl bg-[#1c222e]/80 backdrop-blur border border-zinc-800 rounded-2xl p-6 md:p-8">
        <div className="space-y-4">
          <p className="flex items-center gap-3 text-white">
            <span className="text-pink-400">📞</span> Phone: +91 98765 43210
          </p>
          <p className="flex items-center gap-3 text-white">
            <span className="text-blue-400">📧</span> Email: support@dpjewellers.com
          </p>
          <p className="flex items-center gap-3 text-white">
            <span className="text-pink-400">📍</span> Store: MIG 123, Chanda Nagar Main Road
          </p>
        </div>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        className="mt-8 px-8 py-3 bg-[#25D366] text-white rounded-full font-bold text-lg hover:bg-[#1fb954] transition-all hover:scale-105 shadow-lg shadow-green-900/20"
      >
        Chat on WhatsApp
      </a>

      {/* Floating WhatsApp - antha site lo kanipistundi */}
      <a href={whatsappLink} target="_blank" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-2xl shadow-xl z-50 hover:scale-110 transition">💬</a>
    </div>
  );
}