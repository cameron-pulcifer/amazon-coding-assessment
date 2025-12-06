import type { PropsWithChildren } from '../../types/PropsWithChildren';

const ModalActions = ({ children }: PropsWithChildren) => {
  return <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">{children}</div>;
};

export default ModalActions;
