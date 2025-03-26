import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  children?: ReactNode;
  color?: "teal" | "red" | "blue" | "gray";
}

const colorStyles = {
  teal: {
    bg: "bg-teal-700",
    hover: "hover:bg-teal-600 hover:ring-teal-400",
    ring: "focus:ring-teal-200",
  },
  red: {
    bg: "bg-red-500",
    hover: "hover:bg-red-400 hover:ring-red-300",
    ring: "focus:ring-red-200",
  },
  blue: {
    bg: "bg-blue-600",
    hover: "hover:bg-blue-500 hover:ring-blue-400",
    ring: "focus:ring-blue-200",
  },
  gray: {
    bg: "bg-gray-600",
    hover: "hover:bg-gray-500 hover:ring-gray-400",
    ring: "focus:ring-gray-200",
  },
};

const Button = ({ onClick, icon, children, color }: ButtonProps) => {
  const styles = color ? colorStyles[color] : colorStyles.teal;

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer gap-2 px-5 py-2 text-white font-semibold rounded-lg shadow-md transition ${styles.bg} ${styles.hover} focus:outline-none focus:ring-2 ${styles.ring}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
