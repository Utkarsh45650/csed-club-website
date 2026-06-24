export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  banner: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationUrl?: string;
  description?: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Global AI Hackathon 2026",
    date: "Oct 15 - Oct 17, 2026",
    venue: "Main Campus Auditorium",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
    status: "ongoing",
    registrationUrl: "#",
    description: "Join 500+ developers for a 48-hour sprint to build the future of artificial intelligence."
  },
  {
    id: "2",
    title: "Web3 & Decentralized Future",
    date: "Nov 02, 2026",
    venue: "Innovation Lab 402",
    banner: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationUrl: "#",
    description: "An exclusive workshop on building secure smart contracts and exploring the future of Web3."
  },
  {
    id: "3",
    title: "Quantum Computing Symposium",
    date: "Nov 20, 2026",
    venue: "Virtual Event",
    banner: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationUrl: "#",
    description: "Dive into the mechanics of qubits and superposition with industry-leading researchers."
  },
  {
    id: "4",
    title: "Intro to Neural Networks",
    date: "Aug 12, 2026",
    venue: "Main Campus Auditorium",
    banner: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
    status: "completed",
    registrationUrl: "#",
    description: "A beginner-friendly session breaking down the mathematics and architecture behind modern neural networks."
  },
  {
    id: "5",
    title: "Cybersecurity Capture The Flag",
    date: "Jul 28, 2026",
    venue: "Virtual Event",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
    status: "completed",
    registrationUrl: "#",
    description: "A 24-hour intense CTF competition featuring web exploitation, reverse engineering, and cryptography challenges."
  }
];