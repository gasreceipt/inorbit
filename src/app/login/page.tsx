"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-black to-black pointer-events-none"></div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="text-white">in</span>
            <span className="text-coral">orbit</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Creative Collaboration Network</p>
        </Link>

        {/* Login Card */}
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-6">Sign in to your Inorbit account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                placeholder="demo@inorbit.io"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-coral text-black font-semibold rounded-lg hover:bg-coral-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">
              <span className="text-coral font-semibold">Demo Mode:</span> Enter any email and password to sign in with the test account.
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-coral transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
