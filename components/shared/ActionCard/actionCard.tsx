import React from "react";

import { LucideIcon } from "lucide-react";

type ActionCardProps = {
  icon: LucideIcon;
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
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer p-8 flex flex-col items-center text-center w-full max-w-sm"
    >
      {/* Ícone */}
      <div className="mb-6">
        <Icon size={80} className="text-blue-600" />
      </div>

      {/* Título */}
      <h2 className="text-xl font-semibold text-blue-900 mb-2">
        {title}
      </h2>

      {/* Subtítulo */}
      <p className="text-gray-500 text-sm">
        {subtitle}
      </p>
    </div>
  );
}
