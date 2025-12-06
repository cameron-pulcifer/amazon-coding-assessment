import type { ReactNode } from 'react';

const PageHeader = ({ title, action }: { title: string; action?: ReactNode }) => {
  return (
    <header className="relative shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {action && <div>{action}</div>}
      </div>
    </header>
  );
};

export default PageHeader;
