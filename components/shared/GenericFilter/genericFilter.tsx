import React from "react";

export type FiltroOption = {
  label: string;
  value: string;
};

export type FiltroConfig = {
  name: string; // identificador do filtro
  placeholder?: string;
  type: "text" | "select";
  options?: FiltroOption[]; // usado apenas se for select
};

type FiltroGenericoProps = {
  filtros: FiltroConfig[];
  valores: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onLimpar: () => void;
};

export default function FiltroGenerico({
  filtros,
  valores,
  onChange,
  onLimpar,
}: FiltroGenericoProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filtros.map((filtro) => {
          if (filtro.type === "text") {
            return (
              <input
                key={filtro.name}
                type="text"
                placeholder={filtro.placeholder}
                value={valores[filtro.name] || ""}
                onChange={(e) => onChange(filtro.name, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
              />
            );
          }

          if (filtro.type === "select") {
            return (
              <select
                key={filtro.name}
                value={valores[filtro.name] || ""}
                onChange={(e) => onChange(filtro.name, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
              >
                {filtro.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }

          return null;
        })}

        <button
          onClick={onLimpar}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm hover:bg-black transition"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
