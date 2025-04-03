"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const ProfilPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  console.log("User from AuthContext: ", user); // ✅ Check if user is logged in
  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login"); //✅ Redirect if not logged in
      return;
    }

    setProfile(user); // Set initial profile state from user context
    setLoading(false);
  }, [user, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Profile updated successfully!");
      router.push("/"); // Redirect to homepage after update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col justify-between items-center  px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <form onSubmit={handleUpdate} className="w-full max-w-md space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full border rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full border rounded-md px-2 py-1"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            placeholder="Your phone number"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full border rounded-md px-2 py-1"
          />
        </div>
        <h3 className="text-lg font-semibold mt-4">Address</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            placeholder="Street address"
            value={profile.address?.street || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: { ...profile.address, street: e.target.value || "" },
              })
            }
            className="w-full border rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Your City"
            value={profile.address?.city || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: { ...profile.address, city: e.target.value || "" },
              })
            }
            className="w-full border rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="region">Region</label>
          <input
            type="text"
            id="region"
            placeholder="Your Region"
            value={profile.address?.region}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: { ...profile.address, region: e.target.value || "" },
              })
            }
            className="w-full border rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="region">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Your country"
            value={profile.address?.country}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: { ...profile.address, country: e.target.value || "" },
              })
            }
            className="w-full border rounded-md px-2 py-1"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className=" rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilPage;
