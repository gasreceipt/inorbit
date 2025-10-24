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
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            <span className="text-white">in</span>
            <span className="text-coral">orbit</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/graph"
              className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Explore
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 sm:px-5 sm:py-2 bg-coral text-black text-xs sm:text-sm font-medium rounded-lg hover:bg-coral-light transition-all"
            >
              Join
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // Public pages (graph, etc)
  if (variant === "public") {
    return (
      <header className="h-14 sm:h-16 flex-shrink-0 border-b border-gray-800 bg-gray-950 px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-bold hover:opacity-80 transition-opacity">
          <span className="text-white">in</span>
          <span className="text-coral">orbit</span>
        </Link>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm hover:text-coral transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-coral text-black rounded hover:bg-coral-light transition-colors"
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
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl sm:text-2xl font-bold">
              <span className="text-white">in</span>
              <span className="text-coral">orbit</span>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-4">
              {currentPage !== "dashboard" && (
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 text-xs sm:text-sm hover:text-coral transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/graph"
                className="px-3 py-1.5 text-xs sm:text-sm hover:text-coral transition-colors"
              >
                Constellation
              </Link>
              {currentPage !== "profile" && (
                <Link
                  href="/profile"
                  className="px-3 py-1.5 text-xs sm:text-sm hover:text-coral transition-colors"
                >
                  Profile
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs sm:text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
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
