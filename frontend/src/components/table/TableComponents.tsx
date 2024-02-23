// For table components
const TableHeadCell = ({ children }: { children: React.ReactNode }) => (
  <th className="py-3 ps-2 text-left">{children}</th>
);

// Table cell component
const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border-t border-gray-400/40 ps-2 pe-10 py-6">{children}</td>
);

// Action button component
const ActionButton = ({ onClick, children, color }: { onClick: () => void; children: React.ReactNode; color: string }) => {
  return (
    <button
      className={`font-bold text-sm me-2 py-1 px-4 rounded bg-${color}-500 hover:bg-${color}-700 text-white`}
      onClick={onClick}
    >
      {children}
    </button>
)};

// Action icon component
const ActionIcon = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  return (
    <button
      className="font-bold text-sm me-2 py-1 px-4 rounded bg-gray-500 hover:bg-gray-700 text-white"
      onClick={onClick}
    >
      {children}
    </button>
)}

export { TableHeadCell, TableCell, ActionButton, ActionIcon};