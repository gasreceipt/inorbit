"use client";

import GraphVisualization from "@/components/GraphVisualization";
import VScriptTerminal from "@/components/VScriptTerminal";
import Link from "next/link";

export default function GraphPage() {
  return (
    <main className="h-screen w-screen flex flex-col bg-black">
      {/* Header */}
      <header className="h-16 border-b border-gray-800 flex items-center px-6 bg-gray-950">
        <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
          <span className="text-white">in</span>
          <span className="text-coral">orbit</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <button className="px-4 py-2 text-sm hover:text-coral transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 bg-coral text-black rounded hover:bg-coral-light transition-colors">
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content - 3D Graph */}
      <div className="flex-1 relative">
        <GraphVisualization />
      </div>

      {/* vScript Terminal */}
      <div className="h-64 border-t border-gray-800">
        <VScriptTerminal />
      </div>
    </main>
  );
}
