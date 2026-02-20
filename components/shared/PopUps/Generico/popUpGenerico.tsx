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
      <div className="relative bg-white dark:bg-sidebar w-full max-w-lg rounded-xl border border-gray-300 dark:border-sidebar-border p-6 z-10 shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {title}
          </h2>

          <button onClick={onClose}>
            <X size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>

        {/* Corpo */}
        <div className="text-foreground">{children}</div>

      </div>
    </div>
  );
}
