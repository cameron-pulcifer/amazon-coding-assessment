import { useEffect, useRef } from 'react';

const useMount = (effect: () => void) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
