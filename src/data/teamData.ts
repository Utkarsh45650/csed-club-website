export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'email';
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  category: 'chief-patron' | 'patron' | 'mentor' | 'council';
  socials: SocialLink[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "cp1",
    name: "Dr. Robert Smith",
    role: "Chief Patron",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
    category: "chief-patron",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "email", url: "mailto:#" }
    ]
  },
  {
    id: "p1",
    name: "Dr. Sarah Chen",
    role: "Chief Patron & Dean of Computer Science",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    category: "patron",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "email", url: "mailto:#" }
    ]
  },
  {
    id: "m1",
    name: "David Rodriguez",
    role: "Senior AI Researcher",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    category: "mentor",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "twitter", url: "#" }
    ]
  },
  {
    id: "c1",
    name: "Emma Watson",
    role: "Club President",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    category: "council",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "github", url: "#" }
    ]
  },
  {
    id: "c2",
    name: "Marcus Johnson",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    category: "council",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "github", url: "#" },
      { platform: "twitter", url: "#" }
    ]
  }
];