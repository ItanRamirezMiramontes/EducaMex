// src/components/ui/Separator.tsx
import React from "react";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Separator: React.FC<SeparatorProps> = ({
  className = "",
  orientation = "horizontal",
}) => {
  return (
    <div
      className={`bg-gray-300 ${
        orientation === "horizontal" ? "w-full h-px my-4" : "h-full w-px mx-4"
      } ${className}`}
    />
  );
};
