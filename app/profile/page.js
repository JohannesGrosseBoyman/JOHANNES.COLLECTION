"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import ProfileForm from "@/components/ProfileForm";
import RegisterForm from "@/components/RegisterForm";

const ProfilPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate loading time or wait for auth to hydrate
    if (user === undefined) return; // wait for AuthContext to hydrate
    setLoading(false);
  }, [user]);

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
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
        <RegisterForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <ProfileForm
        profile={profile}
        setProfile={setProfile}
        onSubmit={handleUpdate}
        error={error}
      />
    </div>
  );
};

export default ProfilPage;

