import React, { useState } from "react";
// import { UserPlus } from "lucide-react";
// import { Button } from "./button"; // your custom Button
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to login");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white p-4">

      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

         <button type="submit" disabled={loading} className="w-full mt-4 bg-indigo-600 text-white p-2 rounded">
  {loading ? "Logging in..." : "Login"}
</button>

        </form>

        <p className="text-center text-sm mt-6 text-slate-400">
          Already have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
