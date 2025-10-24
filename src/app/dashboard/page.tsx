"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-coral animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <Header variant="authenticated" currentPage="dashboard" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            @{user.username} • {user.discipline.charAt(0).toUpperCase() + user.discipline.slice(1)} Creator
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-coral">{user.followers}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">Followers</div>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-coral">{user.following}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">Following</div>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-coral">{user.reputation}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">Reputation</div>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-coral">{user.badges.length}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">Badges</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Badges Section */}
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Your Badges</h2>
              <Link href="/profile#badges" className="text-xs sm:text-sm text-coral hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {user.badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-start gap-3 p-3 bg-gray-900/50 border border-gray-800 rounded-lg"
                >
                  <div className="text-2xl sm:text-3xl flex-shrink-0">{badge.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                        {badge.name}
                      </h3>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          badge.rarity === "legendary"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : badge.rarity === "epic"
                            ? "bg-purple-500/20 text-purple-400"
                            : badge.rarity === "rare"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {badge.rarity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Preview */}
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Work</h2>
              <Link href="/profile#portfolio" className="text-xs sm:text-sm text-coral hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {user.portfolio.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-coral/50 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-2">{item.description}</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span className="capitalize">{item.type}</span>
                    <span>•</span>
                    <span>{new Date(item.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <Link
              href="/graph"
              className="flex flex-col items-center justify-center p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-coral transition-colors"
            >
              <div className="text-2xl mb-2">🌌</div>
              <div className="text-xs sm:text-sm text-center">Explore Graph</div>
            </Link>
            <button className="flex flex-col items-center justify-center p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-coral transition-colors">
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-xs sm:text-sm text-center">New Collab</div>
            </button>
            <Link
              href="/profile"
              className="flex flex-col items-center justify-center p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-coral transition-colors"
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="text-xs sm:text-sm text-center">Edit Profile</div>
            </Link>
            <button className="flex flex-col items-center justify-center p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-coral transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-xs sm:text-sm text-center">Analytics</div>
            </button>
          </div>
        </div>

        {/* Bio Section */}
        {user.bio && (
          <div className="mt-8 bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">About</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{user.bio}</p>
          </div>
        )}
      </div>
    </main>
  );
}
