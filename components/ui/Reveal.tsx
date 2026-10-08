'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger child reveals by index when several are placed together. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper. Fades and lifts content into view once, when it
 * enters the viewport. framer-motion respects prefers-reduced-motion via the
 * MotionConfig set in the page, and the CSS media query covers the rest.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
