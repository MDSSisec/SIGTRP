import React from "react";
import styles from "./genericTable.module.css";

export type TableColumn<T> = {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  /** Renderização customizada da célula. Se não passar, usa row[id]. */
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`${styles.th} ${
                    styles[col.align ?? "left"]
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={getRowKey(row)}
                className={styles.row}
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={`${styles.td} ${
                      styles[col.align ?? "left"]
                    }`}
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
  );
}
