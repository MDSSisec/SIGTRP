// components/ui/OpenPopUpButton.tsx
import React from "react";

type OpenPopUpButtonProps = {
  title: string;
  onClick: () => void;
};

export default function OpenPopUpButton({
  title,
  onClick,
}: OpenPopUpButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1e2938] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
    >
      {title}
    </button>
  );
}
