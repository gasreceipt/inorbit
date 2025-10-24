"use client";

import GraphVisualization from "@/components/GraphVisualization";
import VScriptTerminal from "@/components/VScriptTerminal";
import Header from "@/components/Header";
import { GraphProvider } from "@/contexts/GraphContext";

export default function GraphPage() {
  return (
    <GraphProvider>
      <main className="h-screen w-screen flex flex-col bg-black overflow-hidden">
        {/* Header */}
        <Header variant="public" />

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
