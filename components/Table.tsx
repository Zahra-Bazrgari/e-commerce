import React from "react";

interface TableColumn<T> {
  label: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  noDataMessage?: string;
  rowKey: (item: T) => string;
}

const Table = <T,>({
  data,
  columns,
  noDataMessage = "No data available.",
  rowKey,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse shadow-xl rounded-lg">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={`px-4 py-2 text-center font-medium ${column.className || ""}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                {noDataMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={rowKey(item)} className="border-b">
                {columns.map((column, index) => (
                  <td key={index} className={`px-4 py-2 text-center`}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
