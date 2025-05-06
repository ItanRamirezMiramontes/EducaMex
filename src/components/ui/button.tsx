// src/components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "destructive" | "primary"; // Añadí el tipo "primary"
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-4 py-2 rounded-md text-white font-medium transition-all";

  const variants = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline:
      "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100",
    destructive: "bg-red-600 hover:bg-red-700 text-white border border-red-600", // Estilo para el botón destructivo
    primary: "bg-green-600 hover:bg-green-700", // Estilo para el botón primary
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
