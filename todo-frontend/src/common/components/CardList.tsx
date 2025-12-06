import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const CardList = ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul
      className={twMerge('divide-y divide-gray-100 bg-white rounded-md shadow-sm', className)}
      {...props}
    />
  );
};

export default CardList;
