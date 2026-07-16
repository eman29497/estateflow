"use client";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/home"
          className="text-3xl font-bold text-amber-500"
        >
          EstateFlow
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/home">Home</Link>
          <Link href="/buy">Buy</Link>
          <Link href="/rent">Rent</Link>
          <Link href="/agents">Agents</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/add-property">
            <button className="px-5 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 duration-300">
              Add Property
            </button>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2 rounded-lg border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white duration-300">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 duration-300">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-3xl">
            ☰
          </button>
        </div>

      </div>
    </nav>
  );
}