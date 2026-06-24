export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  team: string[];
  longDescription?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "AI Navigation Robot",
    description: "An autonomous robot capable of mapping and navigating dynamic indoor environments using deep reinforcement learning and computer vision.",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
    technologies: ["Python", "ROS", "TensorFlow", "C++"],
    githubUrl: "https://github.com",
    demoUrl: "https://youtube.com",
    team: ["Alice Chen", "Bob Smith"],
    longDescription: "This project explores cutting-edge SLAM algorithms combined with RL-based path planning. The robot can dynamically adapt to moving obstacles and map unexplored territories efficiently using a custom LiDAR setup."
  },
  {
    id: "2",
    title: "Decentralized Voting System",
    description: "A secure, transparent, and verifiable voting application built on Ethereum smart contracts to prevent voter fraud.",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80",
    technologies: ["Solidity", "React", "Web3.js", "Node.js"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    team: ["Charlie Davis", "Diana Prince"],
    longDescription: "Leveraging the immutable nature of the blockchain, we developed a system that eliminates voter fraud while protecting voter anonymity. The smart contracts were fully audited and deployed on the Sepolia testnet."
  },
  {
    id: "3",
    title: "Quantum Simulation Engine",
    description: "A lightweight browser-based simulator for visualizing basic quantum circuits, entanglement, and quantum states.",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
    technologies: ["TypeScript", "Three.js", "WebAssembly"],
    githubUrl: "https://github.com",
    team: ["Eve Torres"],
    longDescription: "Designed for educational purposes, this simulator runs entirely client-side using compiled WebAssembly modules for extreme performance, calculating qubit superpositions in real-time."
  }
];