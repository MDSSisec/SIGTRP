// components/ui/InputText.tsx
import React from "react";

type InputTextProps = {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function InputText({
  label,
  value,
  placeholder,
  onChange,
}: InputTextProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
