"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);

  const { price, destinationName, _id, imageUrl, country } = destination;

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (!departureDate) {
      toast.error("Please select a departure date.");
      return;
    }

    const bookingData = {
      destinationId: _id,

      destinationName,

      price,

      imageUrl,

      country,

      departureDate: new Date(departureDate),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // send Better Auth cookie
          credentials: "include",

          body: JSON.stringify(bookingData),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        console.log("Booking API Error:", result);

        throw new Error(result.error || "Booking failed");
      }

      toast.success("You booked successfully!");

      router.push("/my-bookings");

      router.refresh();
    } catch (error) {
      console.error("Booking error:", error);

      toast.error("Failed to book destination.");
    }
  };

  return (
    <Card className="rounded-none w-100 border-2 border-gray-soft">
      <p className="text-sm text-muted">Starting from</p>

      <h2 className="text-3xl font-bold text-cyan-500">${price}</h2>

      <p className="text-sm text-muted">Per Person</p>

      <DateField
        onChange={setDepartureDate}
        className="w-full rounded-none"
        name="date"
      >
        <Label>Date</Label>

        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      <Button
        onClick={handleBooking}
        disabled={!user}
        className="rounded-none w-full mt-2 bg-cyan-500"
      >
        {user ? "Book Now" : "Login to Book"}
      </Button>
    </Card>
  );
};

export default BookingCard;
