import React, { useId } from 'react';
import { Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export default function SearchBar({ 
  className, 
  label = "Search", 
  description,
  id: externalId,
  ...props 
}: SearchBarProps) {
  const internalId = useId();
  const id = externalId || internalId;
  const descriptionId = `${id}-description`;

  return (
    <div 
      className={cn("relative group w-full max-w-md", className)}
      role="search"
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      
      <div 
        className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
        aria-hidden="true"
      >
        <Search size={20} className="text-gray-400 group-focus-within:text-[#00D4FF] transition-colors duration-300" />
      </div>
      
      {/* Background Glow on Focus */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 group-focus-within:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-opacity duration-300 pointer-events-none" />

      <input
        id={id}
        type="search"
        role="searchbox"
        aria-label={label}
        aria-describedby={description ? descriptionId : undefined}
        className="w-full bg-[#111827] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]/50 focus-visible:ring-2 focus-visible:ring-[#00D4FF] transition-all duration-300 relative z-10"
        {...props}
      />
      
      {description && (
        <span id={descriptionId} className="sr-only">
          {description}
        </span>
      )}
    </div>
  );
}
