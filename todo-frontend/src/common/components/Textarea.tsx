import { forwardRef, type TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  rows?: number;
  placeholder?: string;
  hasError?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, rows = 3, placeholder, hasError = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={hasError ? 'true' : 'false'}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
