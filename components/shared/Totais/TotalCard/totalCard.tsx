import React, { useState } from "react";
import { LucideIcon, Info } from "lucide-react";

type TotalCardProps = {
  title: string;
  totalCad: number | string;
  icon: LucideIcon;
  description: string;
};

export default function TotalCard({
  title,
  totalCad,
  icon: Icon,
  description,
}: TotalCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 w-full max-w-sm relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Icon size={28} className="text-black" />
          <h3 className="text-sm font-medium text-gray-700">
            {title}
          </h3>
        </div>

        {/* Info */}
        <div className="relative">
          <Info
            size={18}
            className="text-gray-500 cursor-pointer hover:text-black"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          />

          {showInfo && (
            <div className="absolute right-0 mt-2 w-48 bg-black text-white text-xs rounded-lg p-2 z-20">
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Total */}
      <div>
        <span className="text-3xl font-bold text-black">
          {totalCad}
        </span>
      </div>
    </div>
  );
}
