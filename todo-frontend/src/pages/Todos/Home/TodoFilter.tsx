type CompletionFilter = 'all' | 'active' | 'completed';

type TodoFilterProps = {
  currentFilter: CompletionFilter;
  onFilterChange: (filter: CompletionFilter) => void;
};

const filters: Array<{ value: CompletionFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav
        className="-mb-px flex space-x-8"
        aria-label="Tabs"
      >
        {filters.map(filter => {
          const isActive = currentFilter === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                ${
                  isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {filter.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TodoFilter;
