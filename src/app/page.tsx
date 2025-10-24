"use client";

import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement waitlist signup
    console.log("Waitlist signup:", email);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-white">in</span>
            <span className="text-coral">orbit</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/graph"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Explore Graph
            </Link>
            <Link
              href="#features"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <button className="px-5 py-2 bg-coral text-black font-medium rounded-lg hover:bg-coral-light transition-all hover:scale-105">
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral/10 border border-coral/30 rounded-full text-sm text-coral animate-fade-in">
            <div className="w-2 h-2 bg-coral rounded-full animate-pulse"></div>
            <span>Now in Private Beta</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight animate-slide-up">
            Your creative network,
            <br />
            <span className="text-coral">visualized in 3D</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Discover collaborators, visualize your creative constellation, and
            build projects with micro-influencers, artists, and musicians.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up">
            <Link
              href="/graph"
              className="px-8 py-4 bg-coral text-black font-semibold rounded-lg hover:bg-coral-light transition-all hover:scale-105 w-full sm:w-auto text-center"
            >
              Explore the Graph
            </Link>
            <button className="px-8 py-4 border border-gray-700 rounded-lg hover:border-coral hover:text-coral transition-all w-full sm:w-auto">
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-pink-500 border-2 border-black"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-black"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black"></div>
              </div>
              <span>1,200+ creators in orbit</span>
            </div>
            <div>✦ 300+ active collaborations</div>
            <div>✦ $50k+ earned by creators</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full p-1">
            <div className="w-1.5 h-3 bg-coral rounded-full mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Where creators
              <span className="text-coral"> collide</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Inorbit is more than a platform—it's a living map of creation,
              showing the constellation of creative relationships.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 bg-gray-950 border border-gray-800 rounded-2xl hover:border-coral transition-all hover:scale-105">
              <div className="w-14 h-14 bg-coral/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-coral/20 transition-colors">
                <svg
                  className="w-7 h-7 text-coral"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">3D Constellation</h3>
              <p className="text-gray-400 leading-relaxed">
                Visualize your creative network as an interactive 3D graph.
                Every collaboration creates new connections in the constellation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 bg-gray-950 border border-gray-800 rounded-2xl hover:border-coral transition-all hover:scale-105">
              <div className="w-14 h-14 bg-coral/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-coral/20 transition-colors">
                <svg
                  className="w-7 h-7 text-coral"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">vScript Terminal</h3>
              <p className="text-gray-400 leading-relaxed">
                Command your creative journey with vScript. Find collaborators,
                propose projects, and navigate the graph—all through code.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 bg-gray-950 border border-gray-800 rounded-2xl hover:border-coral transition-all hover:scale-105">
              <div className="w-14 h-14 bg-coral/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-coral/20 transition-colors">
                <svg
                  className="w-7 h-7 text-coral"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Attribution Forever</h3>
              <p className="text-gray-400 leading-relaxed">
                Every contribution is permanently recorded. Build your
                reputation, earn from collaborations, and own your creative lineage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20">
            How it <span className="text-coral">works</span>
          </h2>

          <div className="space-y-24">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-coral font-mono mb-4">01 / DISCOVER</div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                  Find your creative tribe
                </h3>
                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-6">
                  Use vScript to scan for creators by discipline, explore the
                  3D constellation, and discover people making waves in music,
                  art, video, design, and writing.
                </p>
                <div className="bg-black border border-gray-800 rounded-lg p-4 font-mono text-sm">
                  <div className="text-coral mb-2">❯ vS.scan(discipline:"music")</div>
                  <div className="text-gray-500">
                    Found 3 creators nearby...
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-coral/20 to-transparent border border-coral/30 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-6xl">✨</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <div className="text-coral font-mono mb-4">02 / COLLABORATE</div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                  Build something together
                </h3>
                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-6">
                  Propose collaborations, create project rooms, and work
                  together in real-time. Set revenue splits and track
                  contributions automatically.
                </p>
                <div className="bg-black border border-gray-800 rounded-lg p-4 font-mono text-sm">
                  <div className="text-coral mb-2">
                    ❯ vS.link(@producer, project:"beat collab")
                  </div>
                  <div className="text-gray-500">✓ Request sent</div>
                </div>
              </div>
              <div className="md:order-1 bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-6xl">🤝</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-coral font-mono mb-4">03 / GROW</div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                  Watch your network expand
                </h3>
                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-6">
                  Every completed project adds a new edge to the graph. Build
                  your reputation, earn badges, and become a hub in the
                  creative constellation.
                </p>
                <div className="flex gap-4 items-center flex-wrap">
                  <div className="px-4 py-2 bg-coral/10 border border-coral/30 rounded-full text-sm">
                    🏆 Top Collaborator
                  </div>
                  <div className="px-4 py-2 bg-coral/10 border border-coral/30 rounded-full text-sm">
                    ⚡ 87 Reputation
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-6xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Ready to enter
            <span className="text-coral"> orbit</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join 1,200+ creators building the future of creative collaboration.
          </p>

          <form
            onSubmit={handleWaitlist}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-gray-950 border border-gray-800 rounded-lg focus:border-coral focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-coral text-black font-semibold rounded-lg hover:bg-coral-light transition-all hover:scale-105"
            >
              Join Waitlist
            </button>
          </form>

          <p className="text-sm text-gray-500">
            No spam. Just updates on when you can start collaborating.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">in</span>
                <span className="text-coral">orbit</span>
              </div>
              <p className="text-gray-500 text-sm">
                The creative collaboration platform built with vScript.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/graph" className="hover:text-coral transition-colors">
                    Explore Graph
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-coral transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="https://vsmpl.co/vscript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-coral transition-colors"
                  >
                    vScript Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>© 2025 Inorbit. Built with vScript.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-coral transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-coral transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-coral transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
