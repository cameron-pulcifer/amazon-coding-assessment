import { DialogTitle } from '@headlessui/react';
import type { ComponentType } from 'react';

type ModalHeaderProps = {
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  iconBgColor: string;
  iconColor: string;
  title: string;
};

const ModalHeader = ({ icon: Icon, iconBgColor, iconColor, title }: ModalHeaderProps) => {
  return (
    <div className="flex items-center mb-4">
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBgColor}`}>
        <Icon
          aria-hidden="true"
          className={`size-6 ${iconColor}`}
        />
      </div>
      <DialogTitle
        as="h3"
        className="ml-3 text-base font-semibold text-gray-900"
      >
        {title}
      </DialogTitle>
    </div>
  );
};

export default ModalHeader;
