import type { AxiosError } from 'axios';
import type { Category } from '../types/Category';
import useApi from './useApi';

const useCategoryService = () => {
  const { api, handleError } = useApi();

  const getCategories = async (): Promise<Category[]> => {
    try {
      const response = await api.get<Category[]>('/categories');
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const getCategoryById = async (id: string): Promise<Category> => {
    try {
      const response = await api.get<Category>(`/categories/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    try {
      const response = await api.post<Category>('/categories', category);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const modifyCategory = async (category: Category): Promise<Category> => {
    try {
      const response = await api.put<Category>(`/categories/${category.id}`, category);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const removeCategory = async (id: string): Promise<Category> => {
    try {
      const response = await api.delete<Category>(`/categories/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  return {
    getCategories,
    getCategoryById,
    addCategory,
    modifyCategory,
    removeCategory,
  };
};

export default useCategoryService;
