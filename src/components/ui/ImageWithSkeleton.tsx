import { useState } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import Skeleton from './Skeleton';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ImageWithSkeletonProps extends HTMLMotionProps<"img"> {
  containerClassName?: string;
  imageClassName?: string;
  alt: string;
  variants?: any; // Framer motion variants
}

function generateUnsplashSrcSet(url?: string) {
  if (!url || !url.includes('images.unsplash.com')) return undefined;
  
  // Clean URL to base and append WebP formatting
  const baseUrl = url.split('&w=')[0].split('?w=')[0];
  const sep = baseUrl.includes('?') ? '&' : '?';
  
  return `
    ${baseUrl}${sep}fm=webp&q=80&w=400 400w,
    ${baseUrl}${sep}fm=webp&q=80&w=800 800w,
    ${baseUrl}${sep}fm=webp&q=80&w=1200 1200w,
    ${baseUrl}${sep}fm=webp&q=80&w=1600 1600w
  `.trim();
}

export default function ImageWithSkeleton({
  src,
  alt,
  containerClassName,
  imageClassName,
  variants,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Auto-generate WebP srcSet if Unsplash image
  const optimizedSrcSet = props.srcSet || generateUnsplashSrcSet(src);
  // Default sizes if none provided
  const responsiveSizes = props.sizes || "100vw";

  return (
    <div className={cn("relative overflow-hidden w-full h-full bg-[#050816]", containerClassName)}>
      {/* Skeleton overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        srcSet={optimizedSrcSet}
        sizes={responsiveSizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        variants={variants}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          !isLoaded && "invisible", // Prevent layout shifts or ugly borders while loading
          imageClassName
        )}
        {...props}
      />
    </div>
  );
}
