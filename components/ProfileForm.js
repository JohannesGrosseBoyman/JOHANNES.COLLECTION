"use client";
import React from "react";

const ProfileForm = ({ profile, setProfile, onSubmit, isNewUser = false, error }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          value={profile.name || ""}
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
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full border rounded-md px-2 py-1"
          required
          disabled={!isNewUser} // Editable only for new users
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          placeholder="Your phone number"
          value={profile.phone || ""}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          className="w-full border rounded-md px-2 py-1"
        />
      </div>

      <h3 className="text-lg font-semibold mt-4">Address</h3>

      {["street", "city", "region", "country"].map((field) => (
        <div className="flex flex-col gap-2" key={field}>
          <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            id={field}
            placeholder={`Your ${field}`}
            value={profile.address?.[field] || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: { ...profile.address, [field]: e.target.value || "" },
              })
            }
            className="w-full border rounded-md px-2 py-1"
          />
        </div>
      ))}

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white"
      >
        {isNewUser ? "Register" : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileForm;
