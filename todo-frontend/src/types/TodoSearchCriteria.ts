export type CompletionFilter = 'all' | 'active' | 'completed';
export type SortOption = 'dueDate' | 'createdAt';
export type SortDirection = 'asc' | 'desc';

export type TodoSearchCriteria = {
  completed?: CompletionFilter;
  orderBy?: SortOption;
  sortDirection?: SortDirection;
};
