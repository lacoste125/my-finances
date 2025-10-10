import * as React from "react";
import {Modal} from "../../../../structure/modal/Modal";
import {AddCategoryForm} from "./AddCategoryForm";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@app/store";
import {getYearByYearNumber, PaymentsState} from "@redux/payments/paymentsSlice";

export const AddCategoryModal: React.FC<{
    show: boolean;
    onClose: () => void;
    setShowAddNewCategoryModal: (value: boolean) => void;
}> = ({
    show,
    onClose,
}) => {
    if (!show) return null;

    const dispatch = useDispatch<AppDispatch>();
    const {year} = useSelector((state: RootState): PaymentsState => state.payments);

    const handleClose = () => {
        dispatch(getYearByYearNumber(year!.name));
        onClose();
    };

    return (
        <Modal
            show={show}
            onClose={handleClose}
            skipOnCloseAfterConfirm
            confirmButtonVisible={false}
            title="Dodaj nową kategorię"
        >
            <AddCategoryForm year={year} close={handleClose}/>
        </Modal>
    );
};