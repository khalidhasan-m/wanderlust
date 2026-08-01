"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CancelBookingButton = ({ bookingId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`, {
        method: "DELETE",
        credentials: "include", // <-- Crucial: Sends the auth cookie to Express backend
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      const data = await res.json();

      console.log("Booking deleted:", data);

      // Refresh the Server Component
      router.refresh();
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#ea4335] bg-white px-4 py-2 text-sm font-medium text-[#ea4335] transition hover:bg-[#fce8e6] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Cancelling..." : "🗑 Cancel"}
    </button>
  );
};

export default CancelBookingButton;
