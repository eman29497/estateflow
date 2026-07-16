"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: string;
  image: string;
  description: string;
}
export default function RentPage() {
  const [rentals, setRentals] = useState<Property[]>([]);
  useEffect(() => {
    getRentProperties();
  }, []);
  const getRentProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties"
      );
      const data = await response.json();

      if (response.ok) {
        const rentProperties = data.properties.filter(
          (item: Property) => item.status === "For Rent"
        );

        setRentals(rentProperties);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProperty = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this property?"
  );
  if (!confirmDelete) return;
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/properties/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      getRentProperties();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
  return (
    <>
    <Navbar/>
  <section className="max-w-7xl mx-auto px-6 py-16">
    <div className="text-center mb-14">
      <h1 className="text-5xl font-bold">
        Rent Your Perfect Home
      </h1>
      <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
        Discover affordable apartments, luxury villas, and family homes available for rent.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rentals.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl duration-300"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold">
              {item.title}
            </h2>
            <p className="text-gray-500 mt-2">
              📍 {item.location}
            </p>
            <h3 className="text-amber-500 text-2xl font-bold mt-4">
              ${item.price} / month
            </h3>
            <div className="flex justify-between mt-6 text-gray-600">
              <span>🛏 {item.bedrooms} Beds</span>
              <span>🛁 {item.bathrooms} Baths</span>
              <span>📐 {item.area} sqft</span>
            </div>
            <Link href={`/properties/${item.id}`}>
              <button className="w-full mt-8 bg-slate-900 hover:bg-amber-500 duration-300 text-white py-3 rounded-xl font-semibold">
                View Details
              </button>
            </Link>
            <button
  onClick={() => deleteProperty(item.id)}
  className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold duration-300"
>
  Delete Property
</button>
          </div>
        </div>
      ))}
    </div>
  </section>
  <Footer />
</>
  );
}