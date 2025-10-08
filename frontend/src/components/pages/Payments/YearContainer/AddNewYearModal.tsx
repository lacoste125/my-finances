import * as React from "react";
import {STATIC_TEXT} from "@objects/static_text";
import {Modal} from "../../../structure/modal/Modal";

export const AddNewYearModal: React.FC<{
    show: boolean;
    addNewYear: () => void;
    onClose: () => void;
}> = ({
    show,
    addNewYear,
    onClose,
}) => {
    if (!show) return null;

    return (
        <Modal
            show={show}
            onConfirm={addNewYear}
            onClose={onClose}
            title={STATIC_TEXT.ADD_NEXT_YEAR}
            description={STATIC_TEXT.NEW_YEAR_CONFIRMATION}
        />
    );
};