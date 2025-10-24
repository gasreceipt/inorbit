"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { memo } from "react";

type HeaderVariant = "landing" | "public" | "authenticated";

interface HeaderProps {
  variant?: HeaderVariant;
  currentPage?: "dashboard" | "profile" | "graph";
}

function Header({ variant = "public", currentPage }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Landing page nav - fixed with backdrop blur
  if (variant === "landing") {
    return (
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <Link href="/" className="text-2xl sm:text-3xl font-display font-bold hover:opacity-80 transition-opacity">
            <span className="text-white">in</span>
            <span className="gradient-text">orbit</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/graph"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors hidden sm:block font-medium"
            >
              Explore
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-coral to-pink rounded-xl text-black text-sm sm:text-base font-semibold hover:shadow-glow transition-all hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // Public pages (graph, etc)
  if (variant === "public") {
    return (
      <header className="h-16 sm:h-20 flex-shrink-0 glass border-b border-white/5 px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl sm:text-3xl font-display font-bold hover:opacity-80 transition-opacity">
          <span className="text-white">in</span>
          <span className="gradient-text">orbit</span>
        </Link>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-colors font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-coral to-pink rounded-xl text-black text-sm sm:text-base font-semibold hover:shadow-glow transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </header>
    );
  }

  // Authenticated pages (dashboard, profile)
  if (variant === "authenticated") {
    return (
      <header className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="text-2xl sm:text-3xl font-display font-bold hover:opacity-80 transition-opacity">
              <span className="text-white">in</span>
              <span className="gradient-text">orbit</span>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-4">
              {currentPage !== "dashboard" && (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-colors font-medium rounded-lg hover:bg-white/5"
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/graph"
                className="px-4 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-colors font-medium rounded-lg hover:bg-white/5"
              >
                Constellation
              </Link>
              {currentPage !== "profile" && (
                <Link
                  href="/profile"
                  className="px-4 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-colors font-medium rounded-lg hover:bg-white/5"
                >
                  Profile
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm sm:text-base glass rounded-lg hover:bg-white/10 transition-all font-medium"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return null;
}

export default memo(Header);
