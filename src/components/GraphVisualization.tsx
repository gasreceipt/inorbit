"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { dummyGraphData } from "@/lib/dummyData";
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
  const [graphData, setGraphData] = useState(dummyGraphData);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    // Auto-rotate the camera slightly for a cool effect
    if (graphRef.current) {
      graphRef.current.cameraPosition({ z: 400 });
    }
  }, []);

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
    <div className="relative w-full h-full bg-black">
      {/* Graph Info Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-coral mb-2">
          Creative Constellation
        </h3>
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
            <span>Music</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4ECDC4]"></div>
            <span>Art</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFE66D]"></div>
            <span>Video</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#95E1D3]"></div>
            <span>Design</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C7B3E5]"></div>
            <span>Writing</span>
          </div>
        </div>
      </div>

      {/* Hover Node Info */}
      {hoverNode && (
        <div className="absolute top-4 right-4 z-10 bg-gray-950/90 backdrop-blur-sm border border-coral rounded-lg p-4 animate-fade-in">
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
      <div className="absolute bottom-4 left-4 z-10 text-xs text-gray-500">
        <div>Click + Drag to rotate • Scroll to zoom • Click nodes to explore</div>
      </div>
    </div>
  );
}
