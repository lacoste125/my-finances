import * as React from "react";
import {useCallback} from "react";
import {Modal} from "../../../../structure/modal/Modal";
import {AddCategoryForm} from "./AddCategoryForm";
import {getYearByYearNumber} from "@redux/payments/payment.thunk";
import {useAppDispatch} from "@app/hooks";
import {useYear} from "@app/useYear";

export const AddCategoryModal: React.FC<{
    show: boolean;
    onClose: () => void;
}> = ({
    show,
    onClose,
}) => {
    const dispatch = useAppDispatch();
    const year = useYear();

    const handleClose = useCallback(() => {
        dispatch(getYearByYearNumber(year!.name));
        onClose();
    }, [year?.name]);

    if (!show) return null;
    if (!year) return null;

    return (
        <Modal
            show={show}
            onClose={handleClose}
            skipOnCloseAfterConfirm
            confirmButtonVisible={false}
            title="Dodaj nową kategorię"
        >
            <AddCategoryForm close={handleClose}/>
        </Modal>
    );
};