import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const SecondaryButton = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={twMerge(
        'mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed sm:mt-0 sm:w-auto',
        className,
      )}
    />
  );
};

export default SecondaryButton;
