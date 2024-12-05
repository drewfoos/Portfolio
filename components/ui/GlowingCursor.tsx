// components/ui/GlowingCursor.tsx
'use client';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect } from 'react';

const BASE_SIZE = 24;
const EXPAND_MULTIPLIER = 3;
const EXPANDED_SIZE = BASE_SIZE * EXPAND_MULTIPLIER;
const DETECTION_PADDING = EXPANDED_SIZE / 2;

export const GlowingCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      // Get all elements that could be under the expanded cursor
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      
      // Check if any of the elements or their parents have the cursor-expand class
      const hasExpandableElement = elements.some(element => {
        if (element instanceof HTMLElement) {
          return element.classList.contains('cursor-expand') || 
                 element.parentElement?.classList.contains('cursor-expand');
        }
        return false;
      });
      
      animate(scale, hasExpandableElement ? EXPAND_MULTIPLIER : 1, {
        duration: 0.3,
        ease: "easeInOut"
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', checkHover);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', checkHover);
    };
  }, [cursorX, cursorY, scale]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-40 rounded-full pointer-events-none"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        width: BASE_SIZE,
        height: BASE_SIZE,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        transform: 'translate(-50%, -50%)',
        scale: scale
      }}
    />
  );
};

export default GlowingCursor;