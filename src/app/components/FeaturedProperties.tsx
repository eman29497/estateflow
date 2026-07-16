"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Property {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
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
      getProperties();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
  <div className="text-center">
    <p className="text-amber-500 font-semibold">
      Featured Properties
    </p>

    <h2 className="text-4xl font-bold mt-2">
      Discover Our Best Properties
    </h2>

    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
      Browse our hand-picked premium properties available for
      buying and renting.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

    {properties.map((property) => (
      <div
        key={property.id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300"
      >
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">

          <h3 className="text-2xl font-bold">
            {property.title}
          </h3>

          <p className="text-gray-500 mt-2">
            📍 {property.location}
          </p>

          <div className="flex justify-between items-center mt-6">

            <span className="text-amber-500 font-bold text-xl">
              ${property.price}
            </span>

            <Link href={`/properties/${property.id}`}>
              <button className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-amber-500 duration-300">
                View Details
              </button>
            </Link>
            <button
  onClick={() => deleteProperty(property.id)}
  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg duration-300"
>
  Delete
</button>

          </div>

        </div>

      </div>
    ))}

  </div>

</section>
  )
}