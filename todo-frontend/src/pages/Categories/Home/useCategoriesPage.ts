import useMount from '../../../common/hooks/useMount';
import usePageLoader from '../../../common/hooks/usePageLoader';
import useCategoryService from '../../../services/useCategoryService';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { selectCategories, setCategories } from '../../../store/slices/categoriesSlice';

const useCategoriesPage = () => {
  const service = useCategoryService();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [{ errorMessage, loading }, setState] = usePageLoader();

  useMount(async () => {
    try {
      const results = await service.getCategories();
      dispatch(setCategories(results));
    } catch (error) {
      console.error('Failed to load categories:', error);
      setState({ errorMessage: 'Failed to load categories' });
    } finally {
      setState({ loading: false });
    }
  });

  const onClearError = () => setState({ errorMessage: null });

  const hasCategories = categories.length > 0;

  // display logic
  const showLoading = loading;
  const showError = !loading && !!errorMessage;
  const showEmpty = !loading && !errorMessage && !hasCategories;
  const showCategories = !loading && !errorMessage && hasCategories;

  return {
    categories,
    errorMessage,
    loading,
    onClearError,
    showCategories,
    showEmpty,
    showError,
    showLoading,
  };
};

export default useCategoriesPage;
