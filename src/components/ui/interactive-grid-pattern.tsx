"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 }); // Move cursor far away to reset highlights
    };

    document.addEventListener('mousemove', handleMouseMove);
    if (svgRef.current) {
      svgRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (svgRef.current) {
        svgRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const getSquareOpacity = (squareX: number, squareY: number) => {
    const centerX = squareX + width / 2;
    const centerY = squareY + height / 2;
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2)
    );
    
    // Create a fade effect based on distance
    const maxDistance = 150; // Maximum distance for effect
    const opacity = Math.max(0, 1 - distance / maxDistance);
    return opacity;
  };

  return (
    <svg
      ref={svgRef}
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full",
        className,
      )}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        const opacity = getSquareOpacity(x, y);
        const isActive = opacity > 0.1;
        
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-600/20 transition-all duration-300 ease-out",
              squaresClassName,
            )}
            fill={`rgba(147, 51, 234, ${opacity * 0.3})`} // Purple with dynamic opacity
            stroke={`rgba(147, 51, 234, ${opacity * 0.6})`} // Purple stroke with dynamic opacity
            style={{
              filter: isActive ? `drop-shadow(0 0 8px rgba(147, 51, 234, ${opacity * 0.8}))` : 'none',
              transform: isActive ? `scale(${1 + opacity * 0.1})` : 'scale(1)',
              transformOrigin: 'center',
            }}
          />
        );
      })}
    </svg>
  );
} 