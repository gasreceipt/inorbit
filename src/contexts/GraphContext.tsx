"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { GraphData, GraphNode, GraphLink } from "@/types/graph";
import { dummyGraphData } from "@/lib/dummyData";

interface GraphContextType {
  graphData: GraphData;
  setGraphData: (data: GraphData) => void;
  focusedNode: string | null;
  setFocusedNode: (nodeId: string | null) => void;
  addNode: (node: GraphNode) => void;
  removeNode: (nodeId: string) => void;
  addLink: (link: GraphLink) => void;
  removeLink: (sourceId: string, targetId: string) => void;
  clearGraph: () => void;
  resetGraph: () => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [graphData, setGraphData] = useState<GraphData>(dummyGraphData);
  const [focusedNode, setFocusedNode] = useState<string | null>(null);

  const addNode = (node: GraphNode) => {
    setGraphData((prev) => ({
      ...prev,
      nodes: [...prev.nodes, node],
    }));
  };

  const removeNode = (nodeId: string) => {
    setGraphData((prev) => ({
      nodes: prev.nodes.filter((n) => n.id !== nodeId),
      links: prev.links.filter(
        (l) => l.source !== nodeId && l.target !== nodeId
      ),
    }));
  };

  const addLink = (link: GraphLink) => {
    setGraphData((prev) => ({
      ...prev,
      links: [...prev.links, link],
    }));
  };

  const removeLink = (sourceId: string, targetId: string) => {
    setGraphData((prev) => ({
      ...prev,
      links: prev.links.filter(
        (l) =>
          !(
            (l.source === sourceId && l.target === targetId) ||
            (l.source === targetId && l.target === sourceId)
          )
      ),
    }));
  };

  const clearGraph = () => {
    setGraphData({ nodes: [], links: [] });
  };

  const resetGraph = () => {
    setGraphData(dummyGraphData);
  };

  return (
    <GraphContext.Provider
      value={{
        graphData,
        setGraphData,
        focusedNode,
        setFocusedNode,
        addNode,
        removeNode,
        addLink,
        removeLink,
        clearGraph,
        resetGraph,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
}
