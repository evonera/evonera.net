import React, { useState } from "react";

interface ReservationFormProps {
  whatsappNumber: string;
  restaurantName: string;
}

export default function ReservationForm({ whatsappNumber, restaurantName }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "7:00 PM",
    partySize: "2",
    dietaryNotes: "",
  });

  const [dateError, setDateError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Today's date in YYYY-MM-DD for min datepicker boundary
  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (val: string) => {
    setDateError("");
    setFormData({ ...formData, date: val });

    if (val) {
      // Check day of week (0 is Sunday)
      const selected = new Date(`${val}T00:00:00`);
      if (selected.getDay() === 0) {
        setDateError("Toriei is closed on Sundays. Please select a dining date between Monday and Saturday.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (dateError) {
      return;
    }

    const cleanDigits = formData.phone.replace(/[^0-9]/g, "");
    if (cleanDigits.length < 8) {
      alert("Please enter a valid phone number (at least 8 digits).");
      return;
    }

    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Hello Chef Roy & ${restaurantName} team,\n\nI would like to request a counter reservation:\n• Name: ${formData.name}\n• Contact: ${formData.phone}\n• Date: ${formData.date}\n• Time: ${formData.time} (Single Seating)\n• Party Size: ${formData.partySize} guest(s)\n• Dietary/Special Notes: ${formData.dietaryNotes || "None"}\n\nThank you!`
    );

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;
    setSubmitted(true);

    // Open WhatsApp directly
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white text-[#191919] rounded-[24px] p-6 sm:p-10 shadow-2xl border border-[#FDF1DC]/20">
      <div className="mb-6 pb-6 border-b border-neutral-100 text-center">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#4A0D1C] font-bold block mb-1">
          Counter Seating Request
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#191919]">
          Reserve Your Table
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Single evening seating at 7:00 PM • 10 seats total
        </p>
      </div>

      {/* Demo Notification Banner */}
      <div className="mb-6 p-3.5 rounded-xl bg-[#FDF1DC] border border-[#4A0D1C]/20 text-[#5A0F22] text-xs flex items-center gap-2.5">
        <svg className="w-5 h-5 flex-shrink-0 text-[#4A0D1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          <strong>Demo Notice:</strong> Submitting prefills a direct WhatsApp message to the restaurant for Chef Roy's team to confirm. No live payment is taken.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Your Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Kenneth Tan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4A0D1C] focus:ring-1 focus:ring-[#4A0D1C] text-sm outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              required
              placeholder="+65 9123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4A0D1C] focus:ring-1 focus:ring-[#4A0D1C] text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Party Size *
            </label>
            <select
              value={formData.partySize}
              onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4A0D1C] focus:ring-1 focus:ring-[#4A0D1C] text-sm outline-none transition-colors bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"} {num === 10 ? "(Full Counter Buyout)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              min={today}
              value={formData.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                dateError ? "border-red-500 bg-red-50/30" : "border-neutral-200"
              } focus:border-[#4A0D1C] focus:ring-1 focus:ring-[#4A0D1C] text-sm outline-none transition-colors`}
            />
            {dateError && (
              <p className="text-[11px] text-red-600 mt-1 font-medium leading-tight">
                {dateError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Seating Time
            </label>
            <input
              type="text"
              readOnly
              value="7:00 PM (Single Seating)"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 text-sm cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Dietary Restrictions / Notes
          </label>
          <textarea
            rows={3}
            placeholder="Please let us know of any allergies or special celebrations..."
            value={formData.dietaryNotes}
            onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4A0D1C] focus:ring-1 focus:ring-[#4A0D1C] text-sm outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={Boolean(dateError)}
          className={`w-full py-4 px-6 rounded-full bg-[#4A0D1C] text-[#FDF1DC] font-medium text-xs uppercase tracking-widest hover:opacity-95 transition-opacity shadow-lg mt-2 flex items-center justify-center gap-2 ${
            dateError ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <span>Send Booking Request via WhatsApp</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>

      {submitted && (
        <div className="mt-4 p-4 rounded-xl bg-[#FDF1DC] border border-[#4A0D1C]/25 text-[#4A0D1C] text-xs text-center font-medium">
          WhatsApp opened with your pre-filled reservation details. Tap Send in WhatsApp to contact Chef Roy.
        </div>
      )}
    </div>
  );
}
