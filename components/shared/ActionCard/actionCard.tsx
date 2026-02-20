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
      className="bg-card border border-border rounded-2xl transition-all duration-300 cursor-pointer p-6 sm:p-8 flex flex-col items-center text-center w-full min-w-0 hover:border-foreground/50 shadow-sm"
    >
      {/* Ícone */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <Icon className="h-14 w-14 sm:h-20 sm:w-20 text-foreground" />
      </div>

      {/* Título */}
      <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 break-words">
        {title}
      </h2>

      {/* Subtítulo */}
      <p className="text-muted-foreground text-xs sm:text-sm break-words">
        {subtitle}
      </p>
    </div>
  );
}
