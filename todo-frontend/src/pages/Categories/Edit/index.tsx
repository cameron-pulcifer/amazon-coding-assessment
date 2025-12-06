import { PencilSquareIcon } from '@heroicons/react/24/outline';
import FillButton from '../../../common/components/FillButton';
import FormField from '../../../common/components/FormField';
import Input from '../../../common/components/Input';
import Modal from '../../../common/components/Modal';
import ModalActions from '../../../common/components/ModalActions';
import ModalContent from '../../../common/components/ModalContent';
import ModalHeader from '../../../common/components/ModalHeader';
import SecondaryButton from '../../../common/components/SecondaryButton';
import Toast from '../../../common/components/Toast';
import useEditCategoryPage from './useEditCategoryPage';

const CategoriesEditPage = () => {
  const { category, loading, errorMessage, onClearError, onClose, register, handleSubmit, errors, isValid, isSaving } =
    useEditCategoryPage();

  if (loading || !category) {
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
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader
              icon={PencilSquareIcon}
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
              title="Edit Category"
            />
            <div className="space-y-4">
              <FormField
                label="Category Name"
                htmlFor="category-name"
                error={errors.name?.message}
              >
                <Input
                  type="text"
                  id="category-name"
                  placeholder="Enter category name"
                  autoFocus
                  hasError={!!errors.name}
                  {...register('name', {
                    required: 'Category name is required',
                    minLength: {
                      value: 2,
                      message: 'Category name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Category name must be less than 50 characters',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\s-]+$/,
                      message: 'Category name can only contain letters, numbers, spaces, and hyphens',
                    },
                  })}
                />
              </FormField>
            </div>
          </ModalContent>
          <ModalActions>
            <FillButton
              type="submit"
              disabled={isSaving || !isValid}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </FillButton>
            <SecondaryButton
              type="button"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </SecondaryButton>
          </ModalActions>
        </form>
      </Modal>
    </>
  );
};

export default CategoriesEditPage;
