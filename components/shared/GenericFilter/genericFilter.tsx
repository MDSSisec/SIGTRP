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
    <div className="bg-white dark:bg-sidebar border border-gray-300 dark:border-sidebar-border rounded-xl p-4 mb-6">
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
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-accent text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-full placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            );
          }

          if (filtro.type === "select") {
            return (
              <select
                key={filtro.name}
                value={valores[filtro.name] || ""}
                onChange={(e) => onChange(filtro.name, e.target.value)}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-accent text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-full"
              >
                {filtro.options?.map((option) => (
                  <option key={option.value} value={option.value} className="dark:bg-gray-800">
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
          className="bg-[#52525b] dark:bg-[#3f3f46] text-white rounded-lg px-4 py-2 text-sm hover:bg-[#3f3f46] dark:hover:bg-[#52525b] transition"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
