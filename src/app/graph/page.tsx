"use client";

import GraphVisualization from "@/components/GraphVisualization";
import VScriptTerminal from "@/components/VScriptTerminal";
import Link from "next/link";
import { GraphProvider } from "@/contexts/GraphContext";

export default function GraphPage() {
  return (
    <GraphProvider>
      <main className="h-screen w-screen flex flex-col bg-black overflow-hidden">
        {/* Header */}
        <header className="h-14 sm:h-16 border-b border-gray-800 flex items-center px-4 sm:px-6 bg-gray-950 flex-shrink-0">
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

        {/* Main Content - 3D Graph */}
        <div className="flex-1 relative overflow-hidden">
          <GraphVisualization />
        </div>

        {/* vScript Terminal */}
        <div className="h-48 sm:h-56 md:h-64 border-t border-gray-800 flex-shrink-0">
          <VScriptTerminal />
        </div>
      </main>
    </GraphProvider>
  );
}
