import useMount from '../../../common/hooks/useMount';
import useTodoService from '../../../services/useTodoService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { selectCriteria, selectTodos, setCriteria, setTodos } from '../../../store/slices/todosSlice';
import usePageLoader from '../../../common/hooks/usePageLoader';
import type { CompletionFilter, SortOption, SortDirection } from '../../../types/TodoSearchCriteria';

const useTodosPage = () => {
  const service = useTodoService();
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const criteria = useAppSelector(selectCriteria);
  const [{ errorMessage, loading }, setState] = usePageLoader();

  useMount(async () => {
    try {
      const data = await service.getTodos(criteria);
      dispatch(setTodos(data));
    } catch (err) {
      setState({ errorMessage: (err instanceof Error && err.message) || 'Failed to load todos' });
    } finally {
      setState({ loading: false });
    }
  });

  const onFilterChange = async (completed: CompletionFilter) => {
    try {
      dispatch(setCriteria({ completed }));
      const data = await service.getTodos({ ...criteria, completed });
      dispatch(setTodos(data));
    } catch (error) {
      console.error('Failed to set filter:', error);
      setState({ errorMessage: 'Failed to set filter' });
    }
  };

  const onSortChange = async (orderBy: SortOption, sortDirection: SortDirection) => {
    try {
      dispatch(setCriteria({ orderBy, sortDirection }));
      const data = await service.getTodos({ ...criteria, orderBy, sortDirection });
      dispatch(setTodos(data));
    } catch (error) {
      console.error('Failed to sort todos:', error);
      setState({ errorMessage: 'Failed to sort' });
    }
  };

  const onToggleComplete = async (id: string, currentCompleted: boolean) => {
    try {
      await service.modifyTodo({ id, completed: !currentCompleted });
      // Reload todos
      const data = await service.getTodos(criteria);
      dispatch(setTodos(data));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      setState({ errorMessage: 'Failed to toggle complete' });
    }
  };

  const onClearError = () => {
    setState({ errorMessage: null });
  };

  const hasTodos = todos.length > 0;
  const filter = criteria.completed || 'all';

  // display logic
  const showLoading = loading;
  const showError = !loading && !!errorMessage;
  const showEmpty = !loading && !errorMessage && !hasTodos;
  const showTodos = !loading && !errorMessage && hasTodos;
  const sortBy = criteria.orderBy || 'dueDate';
  const sortDirection = criteria.sortDirection || 'desc';

  // Empty message based on filter
  const getEmptyMessage = () => {
    if (filter === 'active') return 'No active to-do items.';
    if (filter === 'completed') return 'No completed to-do items.';
    return 'No to-do items yet. Create one to get started!';
  };

  return {
    errorMessage,
    filter,
    getEmptyMessage,
    loading,
    onClearError,
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
  };
};

export default useTodosPage;
