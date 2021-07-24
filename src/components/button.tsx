import React from "react";
import { IButtonProps } from "../interfaces";

export const Button: React.FC<IButtonProps> = ({
  canClick,
  actionText,
  loading,
}) => {
  return (
    <button
      className={`text-lg font-medium focus:outline-none text-white py-4 transition-colors
      ${
        canClick
          ? "bg-lime-600 hover:bg-lime-700"
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
