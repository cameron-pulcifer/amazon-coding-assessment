import { Link, type LinkProps } from 'react-router';
import { twMerge } from 'tailwind-merge';

const FillLink = ({ className, ...props }: LinkProps) => {
  return (
    <Link
      {...props}
      className={twMerge(
        'rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        className,
      )}
    />
  );
};

export default FillLink;
