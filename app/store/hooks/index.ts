import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '..';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useAppDispatch = useDispatch<AppDispatch>;

export { useAppSelector, useAppDispatch };
