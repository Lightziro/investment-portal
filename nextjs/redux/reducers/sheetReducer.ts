import { AnyAction } from "redux";
import { SheetStore } from "../../ts/types/redux/store.types";
import { initStoreSheet } from "../../ts/types/redux/store.init";

const sheetReducer = (
    state: SheetStore = initStoreSheet,
    action: AnyAction
): SheetStore => {
    switch (action.type) {
        case "SET_OPEN_SHEET":
            return {
                ...state,
                isOpenSheet: true,
                propsSheet: action.propsSheet,
                sheetType: action.typeSheet,
            };
        case "SET_CLOSE_SHEET":
            return {
                ...state,
                ...initStoreSheet,
            };
        default:
            return state;
    }
};
export default sheetReducer;
