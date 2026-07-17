"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "../../components/Footer";

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

export default function PropertyDetailsPage() {
  const { id } = useParams();

  const [property, setProperty] = useState<Property | null>(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = async () => {
    try {
      const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        setProperty(data.property);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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
      setLoading(true);

      const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/inquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            propertyId: property?.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }
  return (
  <>
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12">

        <div>
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-2xl"
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            {property.title}
          </h1>

          <p className="text-gray-500 text-lg mt-4">
            📍 {property.location}
          </p>

          <h2 className="text-4xl font-bold text-amber-500 mt-6">
            ${property.price}
          </h2>

          <p className="text-gray-600 leading-8 mt-8">
            {property.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-xl">Bedrooms</h3>
              <p className="text-gray-500 mt-2">
                {property.bedrooms} Bedrooms
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-xl">Bathrooms</h3>
              <p className="text-gray-500 mt-2">
                {property.bathrooms} Bathrooms
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-xl">Area</h3>
              <p className="text-gray-500 mt-2">
                {property.area} Sq Ft
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-xl">Status</h3>
              <p className="text-gray-500 mt-2">
                {property.status}
              </p>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-20 bg-gray-100 rounded-2xl p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          Send Inquiry
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-4 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-4 outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-4 outline-none md:col-span-2"
            required
          />

          <textarea
            rows={6}
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            className="border rounded-lg p-4 outline-none md:col-span-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-lg md:col-span-2 duration-300"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>

        </form>

      </div>

    </section>

    <Footer />
  </>
);
}