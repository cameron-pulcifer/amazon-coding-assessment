import { PlusIcon } from '@heroicons/react/24/outline';
import FormField from '../../../common/components/FormField';
import Input from '../../../common/components/Input';
import Modal from '../../../common/components/Modal';
import ModalActions from '../../../common/components/ModalActions';
import ModalContent from '../../../common/components/ModalContent';
import ModalHeader from '../../../common/components/ModalHeader';
import SecondaryButton from '../../../common/components/SecondaryButton';
import Select from '../../../common/components/Select';
import SuccessButton from '../../../common/components/SuccessButton';
import Textarea from '../../../common/components/Textarea';
import Toast from '../../../common/components/Toast';
import useAddTodosPage from './useAddTodosPage';

const TodosAddPage = () => {
  const { categories, errorMessage, onClearError, onClose, register, handleSubmit, errors, isValid, isSaving } =
    useAddTodosPage();

  const hasCategories = categories.length > 0;

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
        {!hasCategories && (
          <ModalContent>
            <ModalHeader
              icon={PlusIcon}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              title="Add To-Do"
            />
            <div className="text-center py-8">
              <p className="text-gray-700 text-lg font-medium mb-2">No categories available</p>
              <p className="text-gray-600">You need to create at least one category before adding a to-do item.</p>
            </div>
            <ModalActions>
              <SecondaryButton
                type="button"
                onClick={onClose}
              >
                Close
              </SecondaryButton>
            </ModalActions>
          </ModalContent>
        )}

        {hasCategories && (
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <ModalHeader
                icon={PlusIcon}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
                title="Add To-Do"
              />
              <div className="space-y-4">
                {/* Title */}
                <FormField
                  label="Title"
                  htmlFor="todo-title"
                  error={errors.title?.message}
                >
                  <Input
                    type="text"
                    id="todo-title"
                    placeholder="Enter title"
                    autoFocus
                    hasError={!!errors.title}
                    {...register('title', {
                      required: 'Title is required',
                      minLength: {
                        value: 2,
                        message: 'Title must be at least 2 characters',
                      },
                      maxLength: {
                        value: 100,
                        message: 'Title must be less than 100 characters',
                      },
                    })}
                  />
                </FormField>

                {/* Description */}
                <FormField
                  label="Description"
                  htmlFor="todo-description"
                  error={errors.description?.message}
                >
                  <Textarea
                    id="todo-description"
                    rows={3}
                    placeholder="Enter description"
                    hasError={!!errors.description}
                    {...register('description', {
                      required: 'Description is required',
                      maxLength: {
                        value: 500,
                        message: 'Description must be less than 500 characters',
                      },
                    })}
                  />
                </FormField>

                {/* Category */}
                <FormField
                  label="Category"
                  htmlFor="todo-category"
                  error={errors.categoryId?.message}
                >
                  <Select
                    id="todo-category"
                    hasError={!!errors.categoryId}
                    {...register('categoryId', {
                      required: 'Category is required',
                    })}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormField>

                {/* Due Date */}
                <FormField
                  label="Due Date"
                  htmlFor="todo-dueDate"
                  error={errors.dueDate?.message}
                >
                  <Input
                    type="datetime-local"
                    id="todo-dueDate"
                    hasError={!!errors.dueDate}
                    {...register('dueDate', {
                      required: 'Due date is required',
                    })}
                  />
                </FormField>

                {/* Completed */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="todo-completed"
                    {...register('completed')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 text-white"
                  />
                  <label
                    htmlFor="todo-completed"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Mark as completed
                  </label>
                </div>
              </div>
            </ModalContent>
            <ModalActions>
              <SuccessButton
                type="submit"
                disabled={isSaving || !isValid}
              >
                {isSaving ? 'Adding...' : 'Add'}
              </SuccessButton>
              <SecondaryButton
                type="button"
                onClick={onClose}
                disabled={isSaving}
              >
                Cancel
              </SecondaryButton>
            </ModalActions>
          </form>
        )}
      </Modal>
    </>
  );
};

export default TodosAddPage;
