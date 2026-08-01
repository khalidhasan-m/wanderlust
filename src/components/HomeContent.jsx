import Image from "next/image";
import React from "react";

const HomeContent = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Welcome to Wanderlust</h1>
        <p className="text-lg text-gray-700">
          Embark on a journey of discovery with Wanderlust. Explore the
          world&apos s most breathtaking destinations, find your next adventure,
          and create unforgettable memories. Whether you&apos re seeking a
          relaxing getaway or an action-packed expedition, Wanderlust has
          something for every traveler.
        </p>
      </div>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Featured Destinations</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/assets/destinations/image1.png"
              alt="Destination 1"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Tropical Paradise</h3>
              <p className="text-gray-600 mt-2">
                Experience the serene beauty of pristine beaches and
                crystal-clear waters.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/assets/destinations/image1.png"
              alt="Destination 2"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Mountain Adventure</h3>
              <p className="text-gray-600 mt-2">
                Conquer majestic peaks and explore breathtaking landscapes.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/assets/destinations/image3.png"
              alt="Destination 3"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Cultural Escape</h3>
              <p className="text-gray-600 mt-2">
                Immerse yourself in rich history and vibrant cultures around the
                world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
