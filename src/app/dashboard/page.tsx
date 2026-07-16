"use client";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  leadScore: string;
  createdAt: string;
  property: {
    title: string;
    location: string;
  };
}
export default function DashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/inquiries",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setInquiries(data.inquiries);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
  const deleteInquiry = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/inquiries/${id}`,
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
        fetchInquiries();
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

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Lead Dashboard
          </h1>

          <p className="text-gray-500 mt-4">
            Manage all customer inquiries here.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg">

          <table className="w-full bg-white">

            <thead className="bg-amber-500 text-white">

              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Property</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Message</th>
                <th className="p-4">Lead Score</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>

            </thead>

            <tbody>

              {inquiries.map((item) => (

                <tr
                  key={item.id}
                  className="border-b text-center hover:bg-gray-100"
                >

                  <td className="p-4 font-semibold">
                    {item.name}
                  </td>

                  <td className="p-4">
                    <p>{item.property.title}</p>
                    <p className="text-gray-500 text-sm">
                      {item.property.location}
                    </p>
                  </td>

                  <td className="p-4">
                    {item.email}
                  </td>

                  <td className="p-4">
                    {item.phone}
                  </td>

                  <td className="p-4">
  {item.message}
</td>

<td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-white font-semibold ${
      item.leadScore === "High"
        ? "bg-green-500"
        : item.leadScore === "Medium"
        ? "bg-yellow-500"
        : "bg-red-500"
    }`}
  >
    {item.leadScore}
  </span>
</td>

<td className="p-4">
  {new Date(item.createdAt).toLocaleDateString()}
</td>
                  <td className="p-4">

                    <button
                      onClick={() =>
                        deleteInquiry(item.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

      <Footer />
    </>
  );
}