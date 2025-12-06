import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useMount from '../../../common/hooks/useMount';
import useOnce from '../../../common/hooks/useOnce';
import useStateReducer from '../../../common/hooks/useStateReducer';
import useCategoryService from '../../../services/useCategoryService';
import useTodoService from '../../../services/useTodoService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import type { Todo } from '../../../types/Todo';
import { selectCategories, setCategories } from '../../../store/slices/categoriesSlice';
import { selectTodoById, updateTodo } from '../../../store/slices/todosSlice';

type TodoFormData = {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
};

const useEditTodosPage = () => {
  const service = useTodoService();
  const categoryService = useCategoryService();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const todoStore = useAppSelector(selectTodoById(id));
  const categories = useAppSelector(selectCategories);
  const [{ errorMessage, isSaving, loading, todoState }, setState] = useStateReducer<{
    errorMessage: string | null;
    isSaving: boolean;
    loading: boolean;
    todoState: Todo | null;
  }>({
    errorMessage: null,
    isSaving: false,
    loading: false,
    todoState: null,
  });

  const todo = todoStore || todoState;

  useMount(async () => {
    if (!id) return;
    try {
      setState({ loading: true });
      // Fetch the specific to-do by ID if not in Redux
      // can't append to list because we don't know the category since it's not in the route - could be an enhancement
      if (!todoStore) {
        const data = await service.getTodoById(id);
        if (data) {
          setState({ todoState: data });
        } else {
          setState({ errorMessage: 'Todo not found' });
        }
      }
      // Load categories if we don't have them
      if (!categories.length) {
        const data = await categoryService.getCategories();
        dispatch(setCategories(data));
      }
    } catch (err) {
      setState({ errorMessage: (err instanceof Error && err.message) || 'Todo not found' });
    } finally {
      setState({ loading: false });
    }
  });

  const onClearError = () => {
    setState({ errorMessage: null });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TodoFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      categoryId: '',
      completed: false,
    },
  });

  // Initialize form once on mount (component unmounts on navigation)
  useOnce(() => {
    if (!todo) return;

    // Format dueDate for datetime-local input (without seconds)
    const dueDate =
      typeof todo.dueDate === 'string'
        ? todo.dueDate.slice(0, 16) // Remove seconds from "YYYY-MM-DDTHH:mm:ss"
        : dayjs(todo.dueDate).format('YYYY-MM-DDTHH:mm');

    reset({
      title: todo.title,
      description: todo.description,
      dueDate,
      categoryId: todo.categoryId,
      completed: todo.completed,
    });
  }, [todo]);

  const onClose = () => {
    navigate(-1);
  };

  const onSubmit = async (data: TodoFormData) => {
    if (!todo) return;

    try {
      setState({ isSaving: true });

      // Add seconds to datetime-local format if not present
      const dueDate = data.dueDate.length === 16 ? `${data.dueDate}:00` : data.dueDate;

      const updated = await service.modifyTodo({
        id: todo.id,
        title: data.title.trim(),
        description: data.description.trim(),
        dueDate,
        categoryId: data.categoryId,
        completed: data.completed,
      });
      dispatch(updateTodo(updated));
      onClose();
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setState({ isSaving: false });
    }
  };

  return {
    todo,
    categories,
    errorMessage,
    loading,
    isSaving,
    onClearError,
    onClose,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
  };
};

export default useEditTodosPage;
