import { GraphData, GraphNode, GraphLink } from "@/types/graph";

// Color coding by discipline
const disciplineColors: Record<string, string> = {
  music: "#FF6B6B",
  art: "#4ECDC4",
  video: "#FFE66D",
  design: "#95E1D3",
  writing: "#C7B3E5",
};

// Generate dummy users
const users: GraphNode[] = [
  { id: "u1", name: "Alex Rivera", type: "user", discipline: "music", color: disciplineColors.music },
  { id: "u2", name: "Jordan Chen", type: "user", discipline: "art", color: disciplineColors.art },
  { id: "u3", name: "Taylor Swift", type: "user", discipline: "music", color: disciplineColors.music },
  { id: "u4", name: "Casey Morgan", type: "user", discipline: "video", color: disciplineColors.video },
  { id: "u5", name: "Sam Patel", type: "user", discipline: "design", color: disciplineColors.design },
  { id: "u6", name: "Riley Johnson", type: "user", discipline: "writing", color: disciplineColors.writing },
  { id: "u7", name: "Avery Kim", type: "user", discipline: "music", color: disciplineColors.music },
  { id: "u8", name: "Blake Martinez", type: "user", discipline: "art", color: disciplineColors.art },
  { id: "u9", name: "Dakota Lee", type: "user", discipline: "video", color: disciplineColors.video },
  { id: "u10", name: "Emerson Wu", type: "user", discipline: "design", color: disciplineColors.design },
];

// Generate dummy projects
const projects: GraphNode[] = [
  { id: "p1", name: "Neon Dreams EP", type: "project", color: "#FF6B6B" },
  { id: "p2", name: "Digital Canvas Collective", type: "project", color: "#4ECDC4" },
  { id: "p3", name: "Urban Beats Documentary", type: "project", color: "#FFE66D" },
  { id: "p4", name: "Synthwave Album Art", type: "project", color: "#95E1D3" },
  { id: "p5", name: "Creative Voices Podcast", type: "project", color: "#C7B3E5" },
];

// Generate dummy collaborations
const links: GraphLink[] = [
  // Project collaborations
  { source: "u1", target: "p1", type: "collaboration" },
  { source: "u3", target: "p1", type: "collaboration" },
  { source: "u7", target: "p1", type: "collaboration" },

  { source: "u2", target: "p2", type: "collaboration" },
  { source: "u8", target: "p2", type: "collaboration" },

  { source: "u4", target: "p3", type: "collaboration" },
  { source: "u9", target: "p3", type: "collaboration" },
  { source: "u1", target: "p3", type: "collaboration" },

  { source: "u5", target: "p4", type: "collaboration" },
  { source: "u10", target: "p4", type: "collaboration" },
  { source: "u2", target: "p4", type: "collaboration" },

  { source: "u6", target: "p5", type: "collaboration" },
  { source: "u1", target: "p5", type: "collaboration" },
  { source: "u4", target: "p5", type: "collaboration" },

  // User connections
  { source: "u1", target: "u3", type: "connection" },
  { source: "u1", target: "u7", type: "connection" },
  { source: "u2", target: "u8", type: "connection" },
  { source: "u4", target: "u9", type: "connection" },
  { source: "u5", target: "u10", type: "connection" },
];

export const dummyGraphData: GraphData = {
  nodes: [...users, ...projects],
  links,
};

export { disciplineColors };
