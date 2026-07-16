"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Link from "next/link";
import Navbar from "../components/Navbar";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export default function BuyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties"
      );

      const data = await response.json();

      if (response.ok) {
        setProperties(data.properties);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
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
        fetchProperties();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const price = searchParams.get("price") || "";

  const filteredProperties = properties.filter((property) => {
    const matchLocation = location
      ? property.location
          .toLowerCase()
          .includes(location.toLowerCase())
      : true;

    const matchType = type
      ? property.type === type
      : true;

    const matchPrice = price
      ? property.price <= Number(price)
      : true;

    return matchLocation && matchType && matchPrice;
  });

  return (
    <>
    <Navbar/>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold">
            Buy Your Dream Home
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Explore premium properties available for sale and find
            the perfect home that matches your lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl duration-300"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {property.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  📍 {property.location}
                </p>

                <p className="text-amber-500 text-2xl font-bold mt-4">
                  ${property.price}
                </p>

                <div className="flex justify-between mt-6 text-gray-600">
                  <span>🛏 {property.bedrooms} Beds</span>
                  <span>🛁 {property.bathrooms} Baths</span>
                  <span>📐 {property.area} sqft</span>
                </div>

                <Link href={`/properties/${property.id}`}>
                  <button className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold duration-300">
                    View Details
                  </button>
                </Link>

                <button
                  onClick={() => deleteProperty(property.id)}
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