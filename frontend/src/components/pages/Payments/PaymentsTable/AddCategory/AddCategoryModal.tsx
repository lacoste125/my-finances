import * as React from "react";
import {useCallback} from "react";
import {Modal} from "../../../../structure/modal/Modal";
import {AddCategoryForm} from "./AddCategoryForm";

export const AddCategoryModal: React.FC<{
    show: boolean;
    onClose: () => void;
}> = ({
    show,
    onClose,
}) => {

    const handleClose = useCallback(() => {
        onClose();
    }, []);

    if (!show) return null;

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