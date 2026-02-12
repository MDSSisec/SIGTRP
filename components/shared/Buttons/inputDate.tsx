// components/ui/InputDate.tsx
import React from "react";

type InputDateProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function InputDate({
  label,
  value,
  onChange,
}: InputDateProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
