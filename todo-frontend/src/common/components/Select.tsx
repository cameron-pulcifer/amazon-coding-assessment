import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  hasError?: boolean;
  children: ReactNode;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ id, hasError = false, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      id={id}
      aria-invalid={hasError ? 'true' : 'false'}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
