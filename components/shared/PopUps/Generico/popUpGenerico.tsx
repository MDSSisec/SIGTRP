// components/ui/Popup.tsx
import React, { ReactNode } from "react";
import { X } from "lucide-react";

type PopupProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Popup({
  open,
  title,
  onClose,
  children,
}: PopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Conteúdo */}
      <div className="relative bg-white w-full max-w-lg rounded-xl border border-gray-300 p-6 z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">
            {title}
          </h2>

          <button onClick={onClose}>
            <X size={20} className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Corpo */}
        <div>{children}</div>

      </div>
    </div>
  );
}
