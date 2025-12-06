import { TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import { formatDueDate } from '../../../common/utils/formatDueDate';
import type { Todo } from '../../../types/Todo';
import CompleteButton from './CompleteButton';

type Props = Todo & {
  onToggleComplete: (id: string, completed: boolean) => Promise<void> | void;
};

const TodoItem = ({ id, title, description, dueDate, completed, onToggleComplete }: Props) => {
  const handleComplete = () => onToggleComplete(id, completed);

  return (
    <li className="flex  gap-x-5 py-2 px-4 items-center hover:bg-slate-100">
      <div className="text-xs/5 text-green-600">
        <CompleteButton
          completed={completed}
          onToggleComplete={handleComplete}
        />
      </div>
      <Link
        to={`/todos/${id}`}
        className="flex flex-wrap flex-1 min-w-0 gap-x-4"
      >
        <div className="min-w-0 flex-auto">
          <p className="truncate text-base font-semibold text-gray-900">{title}</p>
          <p className="truncate  text-gray-500">{description}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm/6 text-gray-900 text-right whitespace-nowrap">
            Due <time>{formatDueDate(dueDate)}</time>
          </p>
        </div>
      </Link>
      <Link
        to={`/todos/${id}/delete`}
        className="flex items-center text-gray-400 hover:text-gray-600"
        aria-label="Delete todo"
      >
        <TrashIcon className="size-5" />
      </Link>
    </li>
  );
};

export default TodoItem;
