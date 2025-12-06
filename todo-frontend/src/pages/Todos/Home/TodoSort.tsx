type SortOption = 'dueDate' | 'createdAt';
type SortDirection = 'asc' | 'desc';

type TodoSortProps = {
  currentSort: SortOption;
  currentDirection: SortDirection;
  onSortChange: (sort: SortOption, direction: SortDirection) => void;
};

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'dueDate', label: 'Due Date' },
  { value: 'createdAt', label: 'Created Date' },
];

const TodoSort = ({ currentSort, currentDirection, onSortChange }: TodoSortProps) => {
  const toggleDirection = () => {
    onSortChange(currentSort, currentDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex items-center gap-x-3 mb-6">
      <span className="text-sm text-gray-700">Sort by:</span>
      <div className="flex items-center gap-x-2">
        {sortOptions.map(option => {
          const isActive = currentSort === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value, currentDirection)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md
                ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-inset ring-gray-300'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
        <button
          onClick={toggleDirection}
          className="p-1.5 text-gray-700 hover:bg-gray-50 rounded-md ring-1 ring-inset ring-gray-300"
          aria-label={`Sort ${currentDirection === 'asc' ? 'ascending' : 'descending'}`}
        >
          {currentDirection === 'asc' ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoSort;
