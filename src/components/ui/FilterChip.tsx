import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      role="switch"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
        active
          ? "bg-[#00D4FF]/10 border-[#00D4FF]/50 text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.2)]"
          : "bg-[#111827] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}
