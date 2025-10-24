# Inorbit

A social collaboration platform for creators featuring 3D graph visualization and vScript command language.

## Overview

Inorbit is a creative collaboration hub where micro-influencers, artists, and musicians discover each other, collaborate on projects, and visualize their creative network as an interactive 3D constellation.

## Features

### MVP (Current)

- **3D Graph Visualization**: Interactive constellation showing creators and projects
  - Color-coded by creative discipline (music, art, video, design, writing)
  - Drag, zoom, and rotate to explore the network
  - Hover to see creator details

- **vScript Terminal**: Command-line interface for power users
  - `vS.scan(discipline:"music")` - Find creators by discipline
  - `vS.route(@username)` - Navigate to a user in the graph
  - `vS.link(@username, project:"idea")` - Propose collaborations
  - `vS.collab(create:{...})` - Start new projects
  - `vS.profile()` - View your profile

### Coming Soon

- User authentication (Supabase)
- User profiles with portfolios
- Real collaboration request system
- Project collaboration rooms
- Real-time graph updates
- Gamification (badges, reputation)
- Embeddable widgets

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **3D Visualization**: react-force-graph-3d + Three.js
- **Terminal**: Monaco Editor (VS Code editor)
- **Backend** (planned): Node.js/Express with WebSockets
- **Database** (planned): PostgreSQL via Supabase
- **Auth** (planned): Supabase Auth
- **Payments** (planned): Stripe Connect

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
inorbit/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── GraphVisualization.tsx
│   │   └── VScriptTerminal.tsx
│   ├── lib/                    # Utilities
│   │   └── dummyData.ts        # Mock data for MVP
│   └── types/                  # TypeScript types
│       └── graph.ts
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── next.config.mjs             # Next.js configuration
└── package.json
```

## vScript Language

vScript is Inorbit's native command language. Every action on the platform can be performed via vScript commands.

### Available Commands (MVP)

- `vS.help()` - Show available commands
- `vS.scan(discipline:"type")` - Find creators by discipline
- `vS.route(@username)` - Navigate to user profile
- `vS.link(@username, project:"idea")` - Propose collaboration
- `vS.collab(create:{title, roles})` - Create new project
- `vS.profile()` - View your profile

Learn more at [vsmpl.co/vscript](https://vsmpl.co/vscript)

## Design System

### Colors

- **Background**: Pure black (#000000)
- **Foreground**: White (#ffffff)
- **Accent**: Electric coral (#FF6B6B)
- **Grays**: Multiple shades from #0a0a0a to #4a4a4a

### Discipline Colors

- Music: #FF6B6B (Coral)
- Art: #4ECDC4 (Turquoise)
- Video: #FFE66D (Yellow)
- Design: #95E1D3 (Mint)
- Writing: #C7B3E5 (Purple)

## Contributing

This project is in active development. Contributions welcome!

## License

ISC

---

Built with vScript | Learn more at vsmpl.co
