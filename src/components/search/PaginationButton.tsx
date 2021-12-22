// Types
type PaginationButtonProps = {
  current: boolean;
  onClick: () => void;
};

// Component
const PaginationButton: React.FC<PaginationButtonProps> = ({ current, onClick, children }) => {
  // Render
  return (
    <button
      type="button"
      className={
        `border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium` +
        (current
          ? ` border-indigo-500 text-indigo-600`
          : ` border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`)
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
