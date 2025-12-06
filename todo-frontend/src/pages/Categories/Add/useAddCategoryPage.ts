import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useCategoryService from '../../../services/useCategoryService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import { addCategory } from '../../../store/slices/categoriesSlice';

type CategoryFormData = {
  name: string;
};

const useAddCategoryPage = () => {
  const service = useCategoryService();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CategoryFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const onClose = () => {
    navigate(-1);
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setIsSaving(true);
      const category = await service.addCategory({ name: data.name.trim() });
      console.log(category);
      dispatch(addCategory(category));
      onClose();
    } catch (error) {
      console.error('Failed to add category:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    onClose,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
  };
};

export default useAddCategoryPage;
