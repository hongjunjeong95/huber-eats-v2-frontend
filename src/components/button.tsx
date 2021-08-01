import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  actionText,
  loading,
}) => {
  return (
    <button
      className={`button text-lg font-medium focus:outline-none py-4 transition-colors
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
