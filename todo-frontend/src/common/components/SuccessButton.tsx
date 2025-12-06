import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const SuccessButton = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={twMerge(
        'inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto',
        className,
      )}
    />
  );
};

export default SuccessButton;
