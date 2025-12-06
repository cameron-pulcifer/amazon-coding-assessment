import type { PropsWithChildren } from '../../types/PropsWithChildren';

const ModalContent = ({ children }: PropsWithChildren) => {
  return <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>;
};

export default ModalContent;
