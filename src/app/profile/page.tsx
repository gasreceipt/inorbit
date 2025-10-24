"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
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

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl sm:text-2xl font-bold">
              <span className="text-white">in</span>
              <span className="text-coral">orbit</span>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 text-xs sm:text-sm hover:text-coral transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/graph"
                className="px-3 py-1.5 text-xs sm:text-sm hover:text-coral transition-colors"
              >
                Constellation
              </Link>
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header */}
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-coral to-coral-light flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{user.name.charAt(0)}</span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-gray-400 mb-3">
                @{user.username} • {user.discipline.charAt(0).toUpperCase() + user.discipline.slice(1)} Creator
              </p>
              {user.bio && (
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">{user.bio}</p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
                <div>
                  <span className="text-lg sm:text-xl font-bold text-coral">{user.followers}</span>
                  <span className="text-sm text-gray-400 ml-1">followers</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-coral">{user.following}</span>
                  <span className="text-sm text-gray-400 ml-1">following</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-coral">{user.reputation}</span>
                  <span className="text-sm text-gray-400 ml-1">reputation</span>
                </div>
              </div>

              {/* Social Links */}
              {user.socialLinks && (
                <div className="flex flex-wrap gap-2">
                  {user.socialLinks.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {user.socialLinks.instagram && (
                    <a
                      href={user.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                  {user.socialLinks.website && (
                    <a
                      href={user.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded transition-colors"
                    >
                      Website
                    </a>
                  )}
                  {user.socialLinks.discord && (
                    <a
                      href={user.socialLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded transition-colors"
                    >
                      Discord
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-full text-xs sm:text-sm hover:border-coral transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div id="badges" className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            Badges <span className="text-gray-500 text-base">({user.badges.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {user.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-start gap-3 sm:gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-coral/50 transition-colors"
              >
                <div className="text-3xl sm:text-4xl flex-shrink-0">{badge.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {badge.name}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded w-fit ${
                        badge.rarity === "legendary"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : badge.rarity === "epic"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : badge.rarity === "rare"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {badge.rarity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">{badge.description}</p>
                  <p className="text-[10px] text-gray-500">
                    Earned {new Date(badge.earnedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div id="portfolio" className="bg-gray-950 border border-gray-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            Portfolio <span className="text-gray-500 text-base">({user.portfolio.length})</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {user.portfolio.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-coral/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{item.title}</h3>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs capitalize w-fit">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-300 mb-3">{item.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>{new Date(item.createdDate).toLocaleDateString()}</span>
                  {item.collaborators && item.collaborators.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{item.collaborators.length} collaborator{item.collaborators.length > 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Member Since */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>
    </main>
  );
}
