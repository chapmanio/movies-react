type TabButtonProps = {
  children: React.ReactNode;
  current: boolean;
  onClick: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({
  current,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={
        `whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium` +
        (current
          ? ` border-indigo-500 text-indigo-600`
          : ` border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`)
      }
      aria-current={current}
    >
      {children}
    </button>
  );
};

export default TabButton;
