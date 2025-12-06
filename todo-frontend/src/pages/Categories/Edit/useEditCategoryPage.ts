import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useMount from '../../../common/hooks/useMount';
import useOnce from '../../../common/hooks/useOnce';
import usePageLoader from '../../../common/hooks/usePageLoader';
import useCategoryService from '../../../services/useCategoryService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { selectCategoryById, updateCategory } from '../../../store/slices/categoriesSlice';

type CategoryFormData = {
  name: string;
};

const useEditCategoryPage = () => {
  const service = useCategoryService();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategoryById(id));
  const [{ errorMessage, loading }, setState] = usePageLoader();
  const [isSaving, setIsSaving] = useState(false);

  useMount(async () => {
    if (!id) return;
    try {
      if (!category) {
        setState({ loading: true });
        const data = await service.getCategoryById(id);
        if (!data) {
          setState({ errorMessage: 'Category not found' });
        } else {
          dispatch(updateCategory(data));
        }
      }
    } catch (err) {
      setState({ errorMessage: (err instanceof Error && err.message) || 'Category not found' });
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
    formState: { errors, isValid, isDirty },
  } = useForm<CategoryFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  // Initialize form once when category data loads
  useOnce(() => {
    if (category) {
      reset({ name: category.name });
    }
  }, [category]);

  const onClose = () => {
    navigate(-1);
  };

  const onSubmit = async (data: CategoryFormData) => {
    if (!category) return;

    try {
      setIsSaving(true);
      await service.modifyCategory({ id: category.id, name: data.name.trim() });
      dispatch(updateCategory({ id: category.id, name: data.name.trim() }));
      onClose();
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    category,
    errorMessage,
    loading,
    isSaving,
    onClearError,
    onClose,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isDirty,
  };
};

export default useEditCategoryPage;
