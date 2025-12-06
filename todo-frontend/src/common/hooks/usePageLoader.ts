import useStateReducer from './useStateReducer';

const usePageLoader = () => {
  return useStateReducer<{ errorMessage: string | null; loading: boolean }>({
    errorMessage: null,
    loading: true,
  });
};

export default usePageLoader;
