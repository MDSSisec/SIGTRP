// components/ui/CreateButton.tsx
import React from "react";

type CreateButtonProps = {
  title: string;
  onClick: () => void;
};

export default function CreateButton({
  title,
  onClick,
}: CreateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1e2938] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
    >
      {title}
    </button>
  );
}
