"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
setFormData({
  email: "",
  password: "",
});
      router.push("/home");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Login to your account
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >
          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:border-amber-500"
              required
            />
          </div>
          <div>
            <label className="font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-amber-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg duration-300 disabled:bg-gray-400"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-amber-500 font-semibold"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}