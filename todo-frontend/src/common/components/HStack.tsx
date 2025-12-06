import React from 'react';
import { twMerge } from 'tailwind-merge';

const HStack = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge('flex flex-row', className)}
      {...props}
    />
  );
};

export default HStack;
