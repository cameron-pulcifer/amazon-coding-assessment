import { type DependencyList, useEffect, useRef } from 'react';
import useUnmount from './useUnmount';

const useUpdate = (effect: () => void, deps?: DependencyList) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      return effect();
    } else {
      isMountedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useUnmount(() => {
    isMountedRef.current = false;
  });
};

export default useUpdate;
