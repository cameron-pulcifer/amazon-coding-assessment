import { PlusIcon } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router';
import CardList from '../../../common/components/CardList';
import OutlineLink from '../../../common/components/OutlineLink';
import PageContent from '../../../common/components/PageContent';
import VStack from '../../../common/components/VStack';
import CategoryTitle from './CategoryTitle';
import TodoFilter from './TodoFilter';
import TodoItem from './TodoItem';
import TodoSort from './TodoSort';
import useTodosPage from './useTodosPage';

const TodosPage = () => {
  const {
    filter,
    getEmptyMessage,
    onFilterChange,
    onSortChange,
    onToggleComplete,
    showEmpty,
    showError,
    showLoading,
    showTodos,
    sortBy,
    sortDirection,
    todos,
  } = useTodosPage();

  return (
    <PageContent
      title="My Tasks"
      action={
        <OutlineLink
          to="/todos/add"
          icon={<PlusIcon />}
        >
          Add Task
        </OutlineLink>
      }
    >
      <TodoFilter
        currentFilter={filter}
        onFilterChange={onFilterChange}
      />
      <TodoSort
        currentSort={sortBy}
        currentDirection={sortDirection}
        onSortChange={onSortChange}
      />

      {showLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="max-w-md text-center">
            <p className="text-gray-600 text-lg">Loading tasks...</p>
          </div>
        </div>
      )}

      {showError && (
        <div className="flex items-center justify-center py-16">
          <div className="max-w-md text-center space-y-3">
            <p className="text-gray-900 text-xl font-semibold">We couldn't load your tasks right now.</p>
            <p className="text-gray-600">Please try refreshing the page or check back in a moment.</p>
          </div>
        </div>
      )}

      {showEmpty && (
        <div className="flex items-center justify-center py-16">
          <div className="max-w-md text-center">
            <p className="text-gray-600 text-lg">{getEmptyMessage()}</p>
          </div>
        </div>
      )}

      {showTodos &&
        todos.map(([category, items]) => (
          <VStack
            key={category}
            className="mb-8"
          >
            <CategoryTitle name={category} />
            <CardList>
              {items.map(todo => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </CardList>
          </VStack>
        ))}

      <Outlet />
    </PageContent>
  );
};

export default TodosPage;
