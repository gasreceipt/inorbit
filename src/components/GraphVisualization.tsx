"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGraph } from "@/contexts/GraphContext";
import { GraphNode } from "@/types/graph";

// Dynamically import ForceGraph3D to avoid SSR issues
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-coral animate-pulse">Loading constellation...</div>
    </div>
  ),
});

export default function GraphVisualization() {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { graphData, focusedNode } = useGraph();
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle window resize and update graph dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Initial camera position
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.cameraPosition({ z: 400 });
    }
  }, []);

  // Focus on a specific node when commanded
  useEffect(() => {
    if (graphRef.current && focusedNode) {
      const node = graphData.nodes.find((n) => n.id === focusedNode);
      if (node) {
        // Focus camera on the node
        graphRef.current.cameraPosition(
          { x: node.x, y: node.y, z: (node.z || 0) + 200 },
          node, // lookAt
          1000 // duration
        );
      }
    }
  }, [focusedNode, graphData.nodes]);

  const handleNodeClick = (node: any) => {
    console.log("Node clicked:", node);
    // Future: Navigate to user/project page
  };

  const handleNodeHover = (node: any) => {
    setHoverNode(node || null);

    if (node) {
      // Highlight connected nodes and links
      const connectedNodes = new Set([node.id]);
      const connectedLinks = new Set();

      graphData.links.forEach((link: any) => {
        if (link.source.id === node.id || link.target.id === node.id) {
          connectedLinks.add(link);
          connectedNodes.add(
            typeof link.source === "object" ? link.source.id : link.source
          );
          connectedNodes.add(
            typeof link.target === "object" ? link.target.id : link.target
          );
        }
      });

      setHighlightNodes(connectedNodes);
      setHighlightLinks(connectedLinks);
    } else {
      setHighlightNodes(new Set());
      setHighlightLinks(new Set());
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black">
      {/* Graph Info Overlay */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-lg p-2 sm:p-4">
        <h3 className="text-xs sm:text-sm font-semibold text-coral mb-1 sm:mb-2">
          Constellation ({graphData.nodes.length} nodes)
        </h3>
        <div className="text-[10px] sm:text-xs space-y-0.5 sm:space-y-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF6B6B]"></div>
            <span>Music</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#4ECDC4]"></div>
            <span>Art</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFE66D]"></div>
            <span>Video</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#95E1D3]"></div>
            <span>Design</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#C7B3E5]"></div>
            <span>Writing</span>
          </div>
        </div>
      </div>

      {/* Hover Node Info */}
      {hoverNode && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-gray-950/90 backdrop-blur-sm border border-coral rounded-lg p-2 sm:p-4 animate-fade-in max-w-[200px]">
          <div className="text-sm">
            <div className="font-semibold text-coral">{hoverNode.name}</div>
            <div className="text-xs text-gray-400 mt-1">
              {hoverNode.type === "user" ? (
                <>
                  <span className="capitalize">{hoverNode.discipline}</span> Creator
                </>
              ) : (
                "Project"
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3D Graph */}
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeLabel={(node: any) => node.name}
        nodeColor={(node: any) => node.color || "#666"}
        nodeRelSize={6}
        nodeOpacity={0.9}
        linkColor={(link: any) =>
          highlightLinks.has(link) ? "#FF6B6B" : "#333333"
        }
        linkWidth={(link: any) => (highlightLinks.has(link) ? 2 : 1)}
        linkOpacity={0.6}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        backgroundColor="#000000"
        showNavInfo={false}
        controlType="orbit"
        enableNodeDrag={true}
        enableNavigationControls={true}
        d3VelocityDecay={0.3}
      />

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20 text-[10px] sm:text-xs text-gray-500">
        <div className="hidden sm:block">Click + Drag to rotate • Scroll to zoom • Click nodes to explore</div>
        <div className="sm:hidden">Drag • Pinch • Tap nodes</div>
      </div>
    </div>
  );
}
