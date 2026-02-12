import React from "react"

export type TableColumn<T> = {
  id: string
  label: string
  align?: "left" | "center" | "right"
  /** Renderização customizada da célula. Se não passar, usa row[id]. */
  render?: (row: T) => React.ReactNode
}

type DataTableProps<T extends Record<string, unknown>> = {
  columns: TableColumn<T>[]
  data: T[]
  getRowKey: (row: T) => string | number
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div className="pt-0 pb-6">
      <div className="overflow-hidden rounded-[10px] border border-gray-300">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#1e2938" }}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`border border-gray-300 p-2 text-white ${alignClass[col.align ?? "left"]}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={getRowKey(row)} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={`border p-2 ${alignClass[col.align ?? "left"]}`}
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.id] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
