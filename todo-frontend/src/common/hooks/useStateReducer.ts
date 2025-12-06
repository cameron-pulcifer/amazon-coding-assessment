import { useReducer } from 'react';

const useStateReducer = <Type>(
  initialState: Type,
): [state: Type, handleStateChange: (payload: Partial<Type>) => void] => {
  const [state, dispatch] = useReducer(
    (currentState: Type, payload: Partial<Type>): Type => ({ ...currentState, ...payload }),
    initialState,
  );

  const handleStateChange = (payload: Partial<Type>) => {
    dispatch(payload);
  };

  return [state, handleStateChange];
};
export default useStateReducer;
