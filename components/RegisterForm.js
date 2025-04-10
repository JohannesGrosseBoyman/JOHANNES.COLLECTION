"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: {
      street: "",
      city: "",
      region: "",
      country: "",
    },
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

    
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // 🔐 Auto-login after registration
      localStorage.setItem("token", data.token);
      router.push("/"); // Or /profile to edit further
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-2">Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        required
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        required
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        required
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={profile.phone}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        className="w-full border rounded-md px-3 py-2"
      />

      {/* Address */}
      <input
        type="text"
        placeholder="Street"
        value={profile.address.street}
        onChange={(e) =>
          setProfile({
            ...profile,
            address: { ...profile.address, street: e.target.value },
          })
        }
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        type="text"
        placeholder="City"
        value={profile.address.city}
        onChange={(e) =>
          setProfile({
            ...profile,
            address: { ...profile.address, city: e.target.value },
          })
        }
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        type="text"
        placeholder="Region"
        value={profile.address.region}
        onChange={(e) =>
          setProfile({
            ...profile,
            address: { ...profile.address, region: e.target.value },
          })
        }
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        type="text"
        placeholder="Country"
        value={profile.address.country}
        onChange={(e) =>
          setProfile({
            ...profile,
            address: { ...profile.address, country: e.target.value },
          })
        }
        className="w-full border rounded-md px-3 py-2"
      />

      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="rounded-xl ring-1 ring-primary text-primary py-2 px-4 text-sm hover:bg-primary hover:text-white"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
