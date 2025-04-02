"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);



  useEffect(() => {
    // Check if user is logged in (by calling /api/protected)
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      console.log("📥 Retrieved Token (useEffect):", token);

      if (!token) return; // Prevent API call if token is missing

      try {
        
        const res = await fetch("/api/protected", {
          method: "GET",
          
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // ✅ Send token in Authorization header
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Protected route response:", data);
          setUser({ id: data.user.userId, role: data.user.role });
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      }
    };
    checkUser();
  }, []);  // ✅ Run only once on component mount

  const login = (id, role, token) => {
    console.log("🔑 Storing Token:", token);  // Debugging
    localStorage.setItem("token", token); // ✅ Store token correctly
    setUser({ id, role });
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }); // Remove token
    setUser(null);
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
