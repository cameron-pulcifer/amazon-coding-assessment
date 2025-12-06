import { type DependencyList, useEffect, useRef } from 'react';

/**
 * Runs an effect only once when dependencies become truthy
 */
const useOnce = (effect: () => void, deps: DependencyList) => {
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Check if all dependencies are truthy
    const allDepsReady = deps.every(dep => !!dep);

    if (allDepsReady && !hasRunRef.current) {
      effect();
      hasRunRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useOnce;
