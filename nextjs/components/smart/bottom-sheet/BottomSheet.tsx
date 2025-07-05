"use client";
import { Sheet } from "react-modal-sheet";
import React, { useMemo } from "react";
import styles from "./BottomSheet.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { setCloseSheet } from "../../../redux/actions/sheetActions";
import UpBalance from "./UpBalance/UpBalance";

const sheetComponents = {
    upBalance: UpBalance,
};
const BottomSheet: React.FC = () => {
    const dispatch = useDispatch();
    const { sheetType, isOpenSheet, propsSheet } = useRootSelector(
        (state) => state.sheet
    );

    const SheetComponent = useMemo(
        () => (sheetType ? sheetComponents[sheetType] : null),
        [sheetType]
    );
    const memoizedPropsSheet = useMemo(() => propsSheet, [propsSheet]);

    const idDisableDrag = sheetType === "card-notify";

    const handleClose = () => dispatch(setCloseSheet());

    console.log(isOpenSheet);
    if (!isOpenSheet) {
        return null;
    }

    return (
        <Sheet
            isOpen={isOpenSheet}
            onClose={handleClose}
            disableDrag={idDisableDrag}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Content className={cn(styles.itemsWrapper)}>
                    {SheetComponent ? (
                        <SheetComponent {...memoizedPropsSheet} />
                    ) : null}
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
};

export default BottomSheet;
