import React from "react";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

type ActionCardProps = {
  icon: LucideIcon | IconType;
  title: string;
  subtitle: string;
  onClick?: () => void;
};

export default function ActionCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-300 rounded-2xl transition-all duration-300 cursor-pointer p-8 flex flex-col items-center text-center w-full max-w-sm hover:border-gray-400"
    >
      {/* Ícone */}
      <div className="mb-6">
        <Icon size={80} className="text-black" />
      </div>

      {/* Título */}
      <h2 className="text-xl font-semibold text-black mb-2">
        {title}
      </h2>

      {/* Subtítulo */}
      <p className="text-gray-500 text-sm">
        {subtitle}
      </p>
    </div>
  );
}
