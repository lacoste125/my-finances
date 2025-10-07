import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {Modal} from "../../../../structure/modal/Modal";
import {AddCategoryForm} from "./AddCategoryForm";
import {Year} from "../../../../../objects/payment.type";
import {GET, GET_YEAR_BY_YEAR_NUMBER_API_PATH} from "../../../../../utils/api.actions";

export const AddCategoryModal: React.FC<{
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    year?: Year;
    setYear: Dispatch<SetStateAction<Year | undefined>>;
    setShowAddNewCategoryModal: Dispatch<SetStateAction<boolean>>;
}> = ({
    show,
    onClose,
    onConfirm,
    year,
    setYear,
}) => {
    if (!show) return null;

    const handleClose = () => {
        GET(
            setYear,
            GET_YEAR_BY_YEAR_NUMBER_API_PATH(year!.name)
        );
        onClose();
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            show={show}
            onConfirm={handleConfirm}
            onClose={handleClose}
            skipOnCloseAfterConfirm
            title={"Dodaj nową kategorię"}
        >
            <AddCategoryForm year={year} close={handleClose}/>
        </Modal>
    );
};