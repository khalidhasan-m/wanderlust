import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Image from "next/image";
import CancelBookingButton from "@/components/CancelBookingButton";

const MyBookingPage = async () => {
  // Await headers and fetch session on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Render fallback if user is not logged in
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="mt-2 text-gray-500">
          Please log in to view your bookings.
        </p>
      </div>
    );
  }

  // Fetch bookings using the authenticated user's ID
  let bookings = [];
  try {
    const requestHeaders = await headers();

    const res = await fetch(`http://localhost:5050/booking/${user.id}`, {
      cache: "no-store",
      headers: {
        cookie: requestHeaders.get("cookie") || "",
      },
      credentials: "include",
    });

    if (res.ok) {
      bookings = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  }

  return (
    <div className="container mx-auto px-4 py-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-1 text-gray-500">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* No Bookings State */}
      {bookings.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            No bookings found
          </h2>
          <p className="mt-2 text-gray-500">
            Your travel bookings will appear here once you book a destination.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {bookings.map((booking) => {
            const departureDate = new Date(booking.departureDate);

            return (
              <div
                key={booking._id}
                className="flex flex-col gap-5 rounded-xl border border-[#e1e8ed] bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
              >
                {/* Image */}
                <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-lg border-2 border-[#0095ff] p-0.5 md:h-45 md:w-68">
                  <Image
                    src={booking.imageUrl}
                    alt={booking.destinationName}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 768px) 100vw, 270px"
                  />
                </div>

                {/* Booking Information */}
                <div className="flex flex-1 flex-col justify-between gap-5">
                  <div>
                    {/* Status */}
                    <div className="mb-2 inline-flex items-center rounded-full bg-[#e6f4ea] px-3 py-1 text-sm font-medium text-[#137333]">
                      <span className="mr-1.5">✓</span>
                      Confirmed
                    </div>

                    {/* Destination */}
                    <h2 className="text-2xl font-bold text-gray-900">
                      {booking.destinationName}
                    </h2>

                    {/* Country */}
                    <p className="mt-1 text-sm text-gray-500">
                      📍 {booking.country}
                    </p>

                    {/* Details */}
                    <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>
                          Departure:{" "}
                          {isNaN(departureDate.getTime())
                            ? "N/A"
                            : departureDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>🎫</span>
                        <span>Booking ID: {booking._id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>{booking.userName || user.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Price */}
                    <div>
                      <p className="text-xs text-gray-500">Total Price</p>
                      <p className="text-2xl font-bold text-[#0095ff]">
                        ${booking.price}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2.5">
                      <CancelBookingButton bookingId={booking._id} />
                      <button
                        type="button"
                        className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0095ff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#007acc]"
                      >
                        👁 View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
