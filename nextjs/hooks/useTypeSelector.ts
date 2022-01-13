import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreData } from "../ts/types/redux/store.types";

export const useRootSelector: TypedUseSelectorHook<StoreData> = useSelector;
