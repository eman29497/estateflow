"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "House",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    status: "For Sale",
    image: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      setFormData({
        title: "",
        type: "House",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        status: "For Sale",
        image: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (    <>
  <Navbar/>
      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Add New Property
          </h1>

          <p className="text-gray-500 mt-4">
            Fill in the property details to list it on EstateHub.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-8"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                Property Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Luxury Villa"
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Property Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              >
                <option>House</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>Penthouse</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="$450000"
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="California"
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="4"
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="3"
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Area (sq ft)
              </label>

              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="3500"
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Property Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
              >
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>

          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write property description..."
              className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 duration-300 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Add Property
          </button>

        </form>

      </section>

      <Footer />
    </>
  );
}