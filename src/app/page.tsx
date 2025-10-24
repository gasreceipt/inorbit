"use client";

import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waitlist signup:", email);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />

      {/* Navigation */}
      <Header variant="landing" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-24 pb-20">
        <div className="max-w-7xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 glass rounded-full text-sm sm:text-base animate-fade-in">
            <div className="w-2 h-2 bg-gradient-to-r from-coral to-purple rounded-full animate-pulse"></div>
            <span className="bg-gradient-to-r from-coral via-purple to-cyan bg-clip-text text-transparent font-semibold">
              Now in Private Beta
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight animate-slide-up px-4">
            Where creators
            <br />
            <span className="gradient-text">build together</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up px-4 font-light">
            A visual platform for musicians, artists, designers, and storytellers to collaborate, share credit, and grow their creative networks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-6 animate-scale-in px-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/graph"
              className="group relative px-8 py-4 bg-gradient-to-r from-coral to-pink rounded-2xl text-black text-base sm:text-lg font-semibold hover:shadow-glow-lg transition-all hover:scale-105 w-full sm:w-auto text-center overflow-hidden"
            >
              <span className="relative z-10">Explore the Constellation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 glass rounded-2xl text-base sm:text-lg font-semibold hover:bg-white/10 transition-all hover:scale-105 w-full sm:w-auto text-center"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-12 sm:pt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base text-gray-400 px-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-pink border-2 border-black shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-cyan border-2 border-black shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow to-coral border-2 border-black shadow-lg"></div>
              </div>
              <span>1,200+ creators</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-coral">✦</span>
              <span>300+ collaborations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple">✦</span>
              <span>$50k+ earned</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 px-4">
              Made for{" "}
              <span className="gradient-text">creatives</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 font-light">
              Connect with artists across disciplines and build something amazing together.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 glass rounded-3xl hover:bg-white/10 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-coral/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-coral to-pink rounded-2xl flex items-center justify-center mb-6 shadow-glow">
                  <span className="text-3xl">🌌</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">Visual Networks</h3>
                <p className="text-gray-400 leading-relaxed">
                  See your creative network as a living, breathing 3D constellation. Watch it grow with every collaboration.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 glass rounded-3xl hover:bg-white/10 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple to-cyan rounded-2xl flex items-center justify-center mb-6 shadow-purple-glow">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">Smart Matching</h3>
                <p className="text-gray-400 leading-relaxed">
                  Find collaborators who complement your skills. Our algorithm connects you with creators who vibe with your style.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 glass rounded-3xl hover:bg-white/10 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan to-purple rounded-2xl flex items-center justify-center mb-6 shadow-cyan-glow">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">Fair Attribution</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every contribution is tracked and credited. Build your portfolio while ensuring everyone gets recognized.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral to-transparent"></div>
      </section>

      {/* Disciplines Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-transparent via-gray-950/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 px-4">
              All <span className="gradient-text">disciplines</span> welcome
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: "Music", emoji: "🎵", color: "from-coral to-pink" },
              { name: "Art", emoji: "🎨", color: "from-purple to-pink" },
              { name: "Video", emoji: "🎬", color: "from-cyan to-purple" },
              { name: "Design", emoji: "✨", color: "from-yellow to-coral" },
              { name: "Writing", emoji: "📝", color: "from-pink to-purple" },
            ].map((discipline) => (
              <div
                key={discipline.name}
                className="group relative p-6 glass rounded-3xl hover:bg-white/10 transition-all hover:scale-105 text-center"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${discipline.color} rounded-2xl flex items-center justify-center mb-4 text-3xl shadow-lg group-hover:shadow-glow transition-shadow`}>
                  {discipline.emoji}
                </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold">{discipline.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 px-4">
            Ready to <span className="gradient-text">create together</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-10 sm:mb-12 max-w-2xl mx-auto px-4 font-light">
            Join thousands of creators building the future of collaborative art.
          </p>

          <form
            onSubmit={handleWaitlist}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8 px-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 glass rounded-2xl focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-base"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-coral to-pink rounded-2xl font-semibold hover:shadow-glow-lg transition-all hover:scale-105 text-black"
            >
              Join Waitlist
            </button>
          </form>

          <p className="text-sm text-gray-500 px-4">
            No spam, just updates on when you can start creating together.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl font-display font-bold mb-4">
                <span className="text-white">in</span>
                <span className="gradient-text">orbit</span>
              </div>
              <p className="text-gray-500 text-sm">
                Where creativity meets collaboration.
              </p>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4 text-base sm:text-lg">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/graph" className="hover:text-coral transition-colors">
                    Explore Graph
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-coral transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-coral transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4 text-base sm:text-lg">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-400">
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
                  <Link href="#" className="hover:text-coral transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-coral transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4 text-base sm:text-lg">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-coral transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-coral transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-coral transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>© 2025 Inorbit. Made with love by creators, for creators.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-coral transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-coral transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-coral transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
