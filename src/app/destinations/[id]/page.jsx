import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlart";
import { EditModal } from "@/components/EditModal";

import Image from "next/image";

import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  //   console.log(id);
  const res = await fetch(`http://localhost:5050/destination/${id}`);
  const destination = await res.json();
  //   console.log(destination);
  const {
    _id,
    destinationName,
    country,
    price,
    duration,
    imageUrl,
    description,
    category,
  } = destination;
  return (
    <div className="container mx-auto">
      <div className="flex justify-end mb-4 mt-2 gap-4">
        <EditModal destination={destination} />
        <DeleteAlert destination={destination} />
      </div>
      <Image
        className="w-full h-100 rounded-xl mb-4"
        src={imageUrl}
        alt={destinationName}
        width={1000}
        height={1000}
      />
      <div className="flex items-center justify-between mt-5">
        <div>
          <div>
            <div className="flex items-center gap-2">
              <CiLocationOn /> <span>{country}</span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">{destinationName}</h2>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              {duration}
            </div>
            <div>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </div>
        <BookingCard destination={destination} />
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
