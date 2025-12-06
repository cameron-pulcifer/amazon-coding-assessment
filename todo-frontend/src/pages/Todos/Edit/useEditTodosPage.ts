import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useMount from '../../../common/hooks/useMount';
import useOnce from '../../../common/hooks/useOnce';
import usePageLoader from '../../../common/hooks/usePageLoader';
import useCategoryService from '../../../services/useCategoryService';
import useTodoService from '../../../services/useTodoService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { selectCategories, setCategories } from '../../../store/slices/categoriesSlice';
import { selectCriteria, selectTodoById, setTodos, updateTodo } from '../../../store/slices/todosSlice';

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
  const todo = useAppSelector(selectTodoById(id));
  const categories = useAppSelector(selectCategories);
  const criteria = useAppSelector(selectCriteria);
  const [isSaving, setIsSaving] = useState(false);
  const [{ errorMessage, loading }, setState] = usePageLoader();

  useMount(async () => {
    if (!id) return;
    try {
      setState({ loading: true });
      // Load todos if we don't have the specific todo
      if (!todo) {
        const data = await service.getTodos(criteria);
        dispatch(setTodos(data));
      }
      // Load categories if we don't have them
      if (!categories.length) {
        const data = await categoryService.getCategories();
        dispatch(setCategories(data));
      }
    } catch (err) {
      setState({ errorMessage: (err instanceof Error && err.message) || 'Failed to load data' });
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
      setIsSaving(true);

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
      setIsSaving(false);
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
