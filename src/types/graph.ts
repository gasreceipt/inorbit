export interface GraphNode {
  id: string;
  name: string;
  type: "user" | "project";
  discipline?: "music" | "art" | "video" | "design" | "writing";
  color?: string;
  x?: number;
  y?: number;
  z?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  type: "collaboration" | "connection";
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
