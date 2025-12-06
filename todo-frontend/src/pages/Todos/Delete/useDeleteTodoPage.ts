import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useMount from '../../../common/hooks/useMount';
import usePageLoader from '../../../common/hooks/usePageLoader';
import useTodoService from '../../../services/useTodoService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { removeTodo, selectCriteria, selectTodoById, setTodos } from '../../../store/slices/todosSlice';

const useDeleteTodoPage = () => {
  const service = useTodoService();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const criteria = useAppSelector(selectCriteria);
  const todo = useAppSelector(selectTodoById(id));
  const [isDeleting, setIsDeleting] = useState(false);
  const [{ errorMessage, loading }, setState] = usePageLoader();

  useMount(async () => {
    if (!id) return;
    try {
      if (!todo) {
        setState({ loading: true });
        const data = await service.getTodos(criteria);
        dispatch(setTodos(data));
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

  const onClose = () => {
    navigate(-1);
  };

  const onDelete = async () => {
    if (!todo) return;

    try {
      setIsDeleting(true);
      await service.removeTodo(todo.id);
      dispatch(removeTodo(todo.id));
      onClose();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    todo,
    errorMessage,
    loading,
    isDeleting,
    onClearError,
    onClose,
    onDelete,
  };
};

export default useDeleteTodoPage;
