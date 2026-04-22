import React from "react";

type TableRow = Record<string, unknown>;

interface TableColumn<T extends TableRow> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface TableProps<T extends TableRow> {
  data: T[];
  columns: TableColumn<T>[];
  className?: string;
  loading?: boolean;
  empty?: boolean;
}

export function Table<T extends TableRow>({
  data,
  columns,
  className = "",
  loading = false,
  empty = false,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 dark:border-slate-700 dark:border-t-white"></div>
          Loading data
        </div>
      </div>
    );
  }

  if (empty || data.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">No data available</div>
        <div className="text-sm text-slate-400 dark:text-slate-500">
          Try adjusting your filters or check back later
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/80 dark:divide-white/8">
          {data.map((row, index) => (
            <tr
              key={index}
              className="transition-colors hover:bg-slate-50/90 dark:hover:bg-white/4"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="whitespace-nowrap px-5 py-4 text-sm text-slate-800 dark:text-slate-100"
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
