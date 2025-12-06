import { type RefObject, useEffect, useRef } from 'react';

const useMountedRef = <T>(value: T): RefObject<T> => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

const useUnmount = (effect: () => void) => {
  const effectRef = useMountedRef(effect);

  useEffect(
    () => () => {
      effectRef.current();
    },
    [effectRef],
  );
};

export default useUnmount;
