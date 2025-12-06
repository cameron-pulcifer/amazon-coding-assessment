import type { ReactNode } from 'react';
import PageHeader from './PageHeader';

const PageContent = ({ children, title, action }: { children: ReactNode; title?: string; action?: ReactNode }) => {
  return (
    <main>
      {title && (
        <PageHeader
          title={title}
          action={action}
        />
      )}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
};

export default PageContent;
