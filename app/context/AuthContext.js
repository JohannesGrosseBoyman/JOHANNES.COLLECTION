"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      console.log("📥 Retrieved Token (useEffect):", token);

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await fetch("/api/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("✅ User data received on page load:", data);
          setUser(data.user);
        } else {
          console.error("❌ Failed to fetch user:", res.statusText);
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Error checking user:", error);
        setUser(null);
      }
    };

    checkUser();
  }, []);

  const login = async (user, token) => {
    console.log("🔑 Storing Token:", token);
    localStorage.setItem("token", token); // ✅ Store token correctly
    setUser(null); // Ensure reset before fetching user data

    // Fetch user details immediately after login
    try {
      const res = await fetch("/api/protected", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ User data received after login:", data);
        setUser(data.user); // ✅ Set full user data in context
      } else {
        console.error("❌ Failed to fetch user after login:", res.statusText);
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Error fetching user after login:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    console.log("🚪 Logging out...");

    // ✅ Remove token from localStorage
    localStorage.removeItem("token");

    // ✅ Reset user state
    setUser(null);

    // ✅ Redirect to Login page
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
