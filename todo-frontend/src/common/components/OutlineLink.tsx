import type { ReactNode } from 'react';
import { Link } from 'react-router';

type OutlineLinkProps = {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
};

const OutlineLink = ({ to, children, icon }: OutlineLinkProps) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {icon && (
        <span
          className="-ml-0.5 size-5"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </Link>
  );
};

export default OutlineLink;
