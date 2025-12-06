import React from 'react';
import { twMerge } from 'tailwind-merge';

const VStack = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge('flex flex-col', className)}
      {...props}
    />
  );
};

export default VStack;
