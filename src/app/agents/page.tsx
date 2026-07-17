"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Agent {
  id: string;
  name: string;
  email: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    try {
      const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/users`
      );

      const data = await response.json();

      if (response.ok) {
        setAgents(data.users);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  const deleteAgent = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this agent?"
  );
  if (!confirmDelete) return;
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/users/${id}`,
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
      getAgents();
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
            Meet Our Expert Agents
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Our experienced real estate professionals are here to help
            you buy, sell, or rent your dream property.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl duration-300"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt={agent.name}
                className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-amber-500"
              />

              <h2 className="text-2xl font-bold mt-6">
                {agent.name}
              </h2>

              <p className="text-amber-500 font-semibold mt-2">
                Real Estate Agent
              </p>

              <div className="mt-6 space-y-2 text-gray-600">
                <p>📧 {agent.email}</p>
              </div>

              <button className="mt-8 w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold duration-300">
                Contact Agent
              </button>
              <button
  onClick={() => deleteAgent(agent.id)}
  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold duration-300"
>
  Delete Agent
</button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}