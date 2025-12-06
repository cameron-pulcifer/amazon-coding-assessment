import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useMount from '../../../common/hooks/useMount';
import usePageLoader from '../../../common/hooks/usePageLoader';
import useCategoryService from '../../../services/useCategoryService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { removeCategory, selectCategoryById, updateCategory } from '../../../store/slices/categoriesSlice';

interface ApiError extends Error {
  status?: number;
  data?: {
    message?: string;
  };
}

const useDeleteCategoryPage = () => {
  const service = useCategoryService();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const category = useAppSelector(selectCategoryById(id));
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [{ errorMessage, loading }, setState] = usePageLoader();

  useMount(async () => {
    if (!id) return;
    try {
      if (!category) {
        setState({ loading: true });
        const data = await service.getCategoryById(id);
        dispatch(updateCategory(data));
      }
    } catch (err) {
      setState({ errorMessage: (err instanceof Error && err.message) || 'Failed to load category' });
    } finally {
      setState({ loading: false });
    }
  });

  const onClose = () => {
    navigate(-1);
  };

  const onDelete = async () => {
    if (!category) return;

    try {
      setIsDeleting(true);
      await service.removeCategory(category.id);
      dispatch(removeCategory(category.id));
      onClose();
    } catch (error) {
      console.error('Failed to delete category:', error);

      const apiError = error as ApiError;

      // Check if it's a 409 conflict (category in use)
      if (apiError.status === 409) {
        setState({
          errorMessage:
            apiError.data?.message ||
            'This category cannot be deleted because it is being used by one or more to-do items.',
        });
      } else {
        setState({ errorMessage: apiError.message || 'Failed to delete category. Please try again.' });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    category,
    errorMessage,
    loading,
    isDeleting,
    onClose,
    onDelete,
  };
};

export default useDeleteCategoryPage;
