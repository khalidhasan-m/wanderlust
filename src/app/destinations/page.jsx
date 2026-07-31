import DestinationCard from "@/components/DestinationCard";
import React from "react";

const DestinationPage = async () => {
  const res = await fetch("http://localhost:5050/destination");
  const destinations = await res.json();
  console.log(destinations);
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">All Destinations</h1>

      <div className="grid grid-cols-4 gap-20">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
