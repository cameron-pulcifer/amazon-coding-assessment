import { DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import DangerButton from '../../../common/components/DangerButton';
import Modal from '../../../common/components/Modal';
import ModalActions from '../../../common/components/ModalActions';
import SecondaryButton from '../../../common/components/SecondaryButton';
import Toast from '../../../common/components/Toast';
import useDeleteTodoPage from './useDeleteTodoPage';

const TodosDeletePage = () => {
  const { todo, loading, errorMessage, onClearError, onClose, onDelete, isDeleting } = useDeleteTodoPage();

  if (loading || !todo) {
    return null;
  }

  return (
    <>
      {errorMessage && (
        <Toast
          message={errorMessage}
          onClose={onClearError}
        />
      )}

      <Modal
        open
        onClose={onClose}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
              <ExclamationTriangleIcon
                aria-hidden="true"
                className="size-6 text-red-600"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-900"
              >
                Delete To-Do
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <span className="font-semibold">{todo.title}</span>? This action
                  cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ModalActions>
          <DangerButton
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </DangerButton>
          <SecondaryButton
            type="button"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </SecondaryButton>
        </ModalActions>
      </Modal>
    </>
  );
};

export default TodosDeletePage;
