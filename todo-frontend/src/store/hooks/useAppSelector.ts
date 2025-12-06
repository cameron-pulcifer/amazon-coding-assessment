import { useSelector } from 'react-redux';
import type { RootState } from '../registry';

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
