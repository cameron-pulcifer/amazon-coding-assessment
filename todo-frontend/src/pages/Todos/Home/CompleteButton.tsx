import { CheckCircleIcon as UncheckIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckedIcon } from '@heroicons/react/24/solid';
import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  completed: boolean;
  onToggleComplete: () => Promise<void> | void;
};

const CompleteButton = ({ completed, onToggleComplete, ...props }: Props) => {
  return (
    <button
      {...props}
      onClick={onToggleComplete}
    >
      {completed && <CheckedIcon className="h-6 w-6 " />}
      {!completed && <UncheckIcon className="h-6 w-6 " />}
    </button>
  );
};

export default CompleteButton;
