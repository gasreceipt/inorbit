"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
  updateNode: (nodeId: string, updates: Partial<GraphNode>) => void;
  clearGraph: () => void;
  resetGraph: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

const STORAGE_KEY = "inorbit_graph_data";

export function GraphProvider({ children }: { children: ReactNode }) {
  const [graphData, setGraphData] = useState<GraphData>(dummyGraphData);
  const [focusedNode, setFocusedNode] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setGraphData(parsed);
        } catch (e) {
          console.error("Failed to parse stored graph data", e);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever graphData changes (after initialization)
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(graphData));
      } catch (e) {
        console.error("Failed to save graph data", e);
      }
    }
  }, [graphData, isInitialized]);

  const saveToLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(graphData));
    }
  };

  const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setGraphData(parsed);
        } catch (e) {
          console.error("Failed to parse stored graph data", e);
        }
      }
    }
  };

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
        (l) => {
          const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
          const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
          return sourceId !== nodeId && targetId !== nodeId;
        }
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
        (l) => {
          const linkSourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
          const linkTargetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
          return !(
            (linkSourceId === sourceId && linkTargetId === targetId) ||
            (linkSourceId === targetId && linkTargetId === sourceId)
          );
        }
      ),
    }));
  };

  const updateNode = (nodeId: string, updates: Partial<GraphNode>) => {
    setGraphData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === nodeId ? { ...n, ...updates } : n
      ),
    }));
  };

  const clearGraph = () => {
    setGraphData({ nodes: [], links: [] });
  };

  const resetGraph = () => {
    setGraphData(dummyGraphData);
    // Also clear localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyGraphData));
    }
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
        updateNode,
        clearGraph,
        resetGraph,
        saveToLocalStorage,
        loadFromLocalStorage,
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
