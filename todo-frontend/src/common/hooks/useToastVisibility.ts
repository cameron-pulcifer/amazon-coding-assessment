import { useState } from 'react';
import useUpdate from './useUpdate';

const useToastVisibility = (isError: boolean, message: string) => {
  // toast visibility
  const [showError, setShowError] = useState(true);

  useUpdate(() => {
    if (isError) {
      setShowError(true);
    }
  }, [isError]);

  const onClearError = () => {
    setShowError(false);
  };

  return {
    errorMessage: showError && isError ? message : null,
    onClearError,
  };
};

export default useToastVisibility;
