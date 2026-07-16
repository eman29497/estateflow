"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (type) params.append("type", type);
    if (price) params.append("price", price);
    router.push(`/buy?${params.toString()}`);
  };
  return (
    <section className="max-w-6xl mx-auto -mt-8 bg-white shadow-xl rounded-2xl p-6 relative z-10">
      <div className="grid md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded-lg outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-3 rounded-lg outline-none"
        >
          <option value="">Property Type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
        </select>
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-3 rounded-lg outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-amber-500 text-white rounded-lg hover:bg-amber-600 duration-300"
        >
          Search
        </button>
      </div>
    </section>
  );
}