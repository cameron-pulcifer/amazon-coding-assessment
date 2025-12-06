import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  autoFocus?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type = 'text', placeholder, hasError = false, autoFocus = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-invalid={hasError ? 'true' : 'false'}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white text-black"
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
