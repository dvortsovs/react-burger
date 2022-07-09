import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";
import {TRootState, TAppDispatch} from "./reducers";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;