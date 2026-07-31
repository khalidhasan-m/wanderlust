import Image from "next/image";
import React from "react";
import { Button } from "@heroui/react";
import { CiLocationOn } from "react-icons/ci";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  const { _id, destinationName, country, price, duration, imageUrl } = destination;
  return (
    <div className="w-sm border-2 border-gray-200 p-4 rounded-2xl flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
      <Image
        className="max-h-48"
        src={imageUrl}
        alt={destinationName}
        width={400}
        height={400}
      />
      <div>
        <div className="flex items-center gap-2">
          <CiLocationOn /> <span>{country}</span>
        </div>
        <div className="flex items-center">
          <h2 className="text-xl font-bold">{destinationName}</h2>
        </div>
        <div>
          <span className="font-bold flex items-center">
            <FaDollarSign />
            {price}/Person
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          {duration}
        </div>
      </div>
      <Link href={`/destinations/${_id}`}>
        <Button className="text-cyan-500" variant="ghost">
          Book Now <MdOutlineArrowOutward />
        </Button>
      </Link>
    </div>
  );
};

export default DestinationCard;
