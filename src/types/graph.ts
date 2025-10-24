export interface GraphNode {
  id: string;
  name: string;
  type: "user" | "project";
  discipline?: "music" | "art" | "video" | "design" | "writing";
  color?: string;
  x?: number;
  y?: number;
  z?: number;
  // Extended user properties
  bio?: string;
  followers?: number;
  reputation?: number;
  badges?: Badge[];
  portfolio?: PortfolioItem[];
  skills?: string[];
  joinedDate?: Date;
  // Extended project properties
  description?: string;
  collaborators?: string[]; // User IDs
  status?: "active" | "completed" | "archived";
  createdDate?: Date;
}

export interface GraphLink {
  source: string;
  target: string;
  type: "collaboration" | "connection";
  strength?: number;
  createdDate?: Date;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: "project" | "track" | "video" | "design" | "article";
  url?: string;
  thumbnail?: string;
  description: string;
  createdDate: Date;
  collaborators?: string[];
}

export interface CollaborationRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  projectTitle: string;
  projectDescription: string;
  roles: string[];
  status: "pending" | "accepted" | "rejected";
  createdDate: Date;
  respondedDate?: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  discipline: "music" | "art" | "video" | "design" | "writing";
  avatar?: string;
  followers: number;
  following: number;
  reputation: number;
  badges: Badge[];
  portfolio: PortfolioItem[];
  skills: string[];
  joinedDate: Date;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
    discord?: string;
  };
}
