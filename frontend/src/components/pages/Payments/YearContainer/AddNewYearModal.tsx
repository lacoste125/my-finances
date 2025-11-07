import * as React from "react";
import {STATIC_TEXT} from "@objects/static_text";
import {Modal} from "../../../structure/modal/Modal";
import {addNewYear} from "@redux/year/year.thunk";
import {useAppDispatch} from "@app/hooks";

export const AddNewYearModal: React.FC<{
    show: boolean;
    onClose: () => void;
}> = ({
    show,
    onClose,
}) => {
    if (!show) return null;

    const dispatch = useAppDispatch();

    return (
        <Modal
            show={show}
            onConfirm={() => dispatch(addNewYear())}
            onClose={onClose}
            title={STATIC_TEXT.ADD_NEXT_YEAR}
            description={STATIC_TEXT.NEW_YEAR_CONFIRMATION}
        />
    );
};