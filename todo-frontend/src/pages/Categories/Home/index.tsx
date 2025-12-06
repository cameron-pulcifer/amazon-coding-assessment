import { PlusIcon } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router';
import CardList from '../../../common/components/CardList';
import OutlineLink from '../../../common/components/OutlineLink';
import PageContent from '../../../common/components/PageContent';
import CategoryItem from './CategoryItem';
import useCategoriesPage from './useCategoriesPage';

const CategoriesPage = () => {
  const { categories, showLoading, showError, showEmpty, showCategories } = useCategoriesPage();

  return (
    <PageContent
      title="Categories"
      action={
        <OutlineLink
          to="/categories/add"
          icon={<PlusIcon />}
        >
          Add Category
        </OutlineLink>
      }
    >
      {showLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="max-w-md text-center">
            <p className="text-gray-600 text-lg">Loading categories...</p>
          </div>
        </div>
      )}

      {showError && (
        <div className="flex items-center justify-center py-16">
          <div className="max-w-md text-center space-y-3">
            <p className="text-gray-900 text-xl font-semibold">We couldn't load your categories right now.</p>
            <p className="text-gray-600">Please try refreshing the page or check back in a moment.</p>
          </div>
        </div>
      )}

      {showEmpty && (
        <div className="flex items-center justify-center py-16">
          <div className="max-w-md text-center">
            <p className="text-gray-600 text-lg">No categories yet. Create one to get started!</p>
          </div>
        </div>
      )}

      {showCategories && (
        <CardList className="mt-6">
          {categories.map(category => (
            <CategoryItem
              key={category.id}
              {...category}
            />
          ))}
        </CardList>
      )}

      <Outlet />
    </PageContent>
  );
};

export default CategoriesPage;
