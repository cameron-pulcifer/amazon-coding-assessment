import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../types/Category';
import type { RootState } from '../registry';

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex((cat: Category) => cat.id === action.payload.id);
      if (index >= 0) {
        state.categories[index] = action.payload;
      } else {
        // just in case the category is not found
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((cat: Category) => cat.id !== action.payload);
    },
  },
});

export const { setCategories, addCategory, updateCategory, removeCategory } = categoriesSlice.actions;

// Selectors
export const selectCategories = (state: RootState) => state.categories.categories;

// Selector factory - returns a selector function for a specific category ID
export const selectCategoryById = (id: string) => (state: RootState) =>
  state.categories.categories.find((category: Category) => category.id === id);

export default categoriesSlice.reducer;
