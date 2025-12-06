import { TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import type { Category } from '../../../types/Category';

const CategoryItem = ({ id, name }: Category) => {
  return (
    <li className="flex  gap-x-5 py-4 px-6 items-center hover:bg-slate-100">
      <Link
        to={`/categories/${id}`}
        className="flex flex-1 min-w-0 gap-x-4"
      >
        <div className="min-w-0 flex-auto">
          <p className="text-base text-gray-900">{name}</p>
        </div>
      </Link>
      <Link
        to={`/categories/${id}/delete`}
        className="flex items-center text-gray-400 hover:text-gray-600"
        aria-label="Delete category"
      >
        <TrashIcon className="size-5" />
      </Link>
    </li>
  );
};

export default CategoryItem;
