import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useMount from '../../../common/hooks/useMount';
import useStateReducer from '../../../common/hooks/useStateReducer';
import useCategoryService from '../../../services/useCategoryService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { selectCategories, setCategories } from '../../../store/slices/categoriesSlice';
import useTodoService from '../../../services/useTodoService';
import { addTodo } from '../../../store/slices/todosSlice';
import type { Category } from '../../../types/Category';

type TodoFormData = {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
};

const useAddTodosPage = () => {
  const categoryService = useCategoryService();
  const todoService = useTodoService();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [{ isSaving, errorMessage }, setState] = useStateReducer<{
    errorMessage: string | null;
    isSaving: boolean;
    loading: boolean;
  }>({
    errorMessage: null,
    isSaving: false,
    loading: false,
  });

  useMount(async () => {
    try {
      if (!categories.length) {
        setState({ loading: true });
        const data = await categoryService.getCategories();
        dispatch(setCategories(data));
      }
    } catch (err) {
      setState({ errorMessage: (err instanceof Error && err.message) || 'Failed to load category' });
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

  const onClose = () => {
    navigate(-1);
  };

  const onSubmit = async (data: TodoFormData) => {
    try {
      setState({ isSaving: true });

      // Add seconds to datetime-local format if not present
      const dueDate = data.dueDate.length === 16 ? `${data.dueDate}:00` : data.dueDate;

      const todo = await todoService.addTodo({
        title: data.title.trim(),
        description: data.description.trim(),
        dueDate,
        categoryId: data.categoryId,
        completed: data.completed,
      });
      const category = categories.find((x: Category) => x.id === data.categoryId);
      dispatch(addTodo({ categoryName: category?.name ?? '', todo }));
      onClose();
    } catch (error) {
      console.error('Failed to add todo:', error);
      setState({ errorMessage: 'Failed to add todo' });
    } finally {
      setState({ isSaving: false });
    }
  };

  return {
    categories,
    errorMessage,
    isSaving,
    onClearError,
    onClose,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
  };
};

export default useAddTodosPage;
