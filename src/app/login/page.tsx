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
    <main className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <Link href="/" className="block text-center mb-10 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-display font-bold">
            <span className="text-white">in</span>
            <span className="gradient-text">orbit</span>
          </h1>
          <p className="text-gray-400 text-sm mt-3">Where creators build together</p>
        </Link>

        {/* Login Card */}
        <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl animate-scale-in">
          <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-8">Sign in to continue creating</p>

          {error && (
            <div className="bg-coral/10 border border-coral/50 text-coral px-4 py-3 rounded-xl mb-6 text-sm animate-slide-down">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 glass rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all"
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
                className="w-full px-5 py-3.5 glass rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-coral to-pink text-black font-semibold rounded-xl hover:shadow-glow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-8 p-5 bg-gradient-to-br from-purple/10 to-cyan/10 border border-purple/20 rounded-2xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="text-sm font-semibold text-white mb-1">Demo Mode</p>
                <p className="text-xs text-gray-400">
                  Enter any email and password to explore with a test account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-8 animate-fade-in">
          <Link href="/" className="text-sm text-gray-400 hover:text-coral transition-colors font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
