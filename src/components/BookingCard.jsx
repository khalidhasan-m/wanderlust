"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  // console.log(new Date(departureDate));
  const { price, destinationName, _id, imageUrl, country } = destination;

  const handleBooking = async () => {
    if (!user) {
      alert("Please login first to make a booking.");
      return;
    }

    if (!departureDate) {
      alert("Please select a departure date.");
      return;
    }

    const bookingData = {
      userId: user.id,
      userImage: user.image,
      userName: user.name,
      userEmail: user.email,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include", // Crucial: Sends the auth cookie to Express backend
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await res.json();
      toast.success("You booked successfully!");
      
      // Redirect to the my-bookings page after a short delay or immediately
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