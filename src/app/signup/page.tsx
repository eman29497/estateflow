"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        "http://localhost:5000/api/auth/signup",
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
      setFormData({
  name: "",
  email: "",
  password: "",
});
      router.push("/login");
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
          Create Account
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Sign up to continue
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >
          <div>
            <label className="font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:border-amber-500"
              required
            />
          </div>
          <div>
            <label className="font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:border-amber-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg duration-300 disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-amber-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}