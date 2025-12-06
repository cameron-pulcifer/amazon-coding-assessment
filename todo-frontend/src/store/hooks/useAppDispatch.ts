import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../registry';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
