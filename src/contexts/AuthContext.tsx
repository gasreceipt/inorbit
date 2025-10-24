"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types/graph";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock test user
const TEST_USER: User = {
  id: "u_test",
  username: "demo_creator",
  email: "demo@inorbit.io",
  name: "Demo Creator",
  bio: "Producer & DJ exploring the intersection of electronic music and visual art. Always looking for creative collaborations!",
  discipline: "music",
  avatar: undefined,
  followers: 1245,
  following: 342,
  reputation: 87,
  badges: [
    {
      id: "b1",
      name: "Early Adopter",
      description: "One of the first creators on Inorbit",
      icon: "🚀",
      earnedDate: new Date("2025-01-15"),
      rarity: "epic",
    },
    {
      id: "b2",
      name: "Top Collaborator",
      description: "Completed 10+ successful collaborations",
      icon: "🤝",
      earnedDate: new Date("2025-03-20"),
      rarity: "rare",
    },
    {
      id: "b3",
      name: "Community Leader",
      description: "Helped 50+ creators find collaborators",
      icon: "⭐",
      earnedDate: new Date("2025-05-10"),
      rarity: "legendary",
    },
  ],
  portfolio: [
    {
      id: "p1",
      title: "Neon Dreams EP",
      type: "project",
      description: "5-track electronic music EP featuring collaborations with visual artists",
      createdDate: new Date("2025-02-14"),
      collaborators: ["u1", "u3"],
    },
    {
      id: "p2",
      title: "Synthwave Sunset",
      type: "track",
      description: "Featured track on Spotify's Electronic Rising playlist",
      createdDate: new Date("2025-04-22"),
    },
    {
      id: "p3",
      title: "Live at Warehouse 404",
      type: "video",
      description: "45-minute DJ set from underground warehouse show",
      createdDate: new Date("2025-06-05"),
    },
  ],
  skills: ["Music Production", "DJing", "Sound Design", "Ableton Live", "Mixing & Mastering"],
  joinedDate: new Date("2025-01-10"),
  socialLinks: {
    twitter: "https://twitter.com/demo_creator",
    instagram: "https://instagram.com/demo_creator",
    website: "https://democreator.com",
  },
};

const STORAGE_KEY = "inorbit_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load auth state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        } catch (e) {
          console.error("Failed to parse auth data", e);
        }
      }
    }
  }, []);

  // Save auth state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - accept any email/password for demo
    // In production, this would call an API
    if (email && password) {
      setUser(TEST_USER);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
