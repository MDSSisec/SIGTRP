// components/ui/InputMoney.tsx
import React from "react";

type InputMoneyProps = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
};

export default function InputMoney({
  label,
  value,
  onChange,
}: InputMoneyProps) {
  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      <span className="text-xs text-gray-500">
        {formatCurrency(value || 0)}
      </span>
    </div>
  );
}
