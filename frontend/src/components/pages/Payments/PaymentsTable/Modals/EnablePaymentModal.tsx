import * as React from "react";
import {STATIC_TEXT} from "@objects/static_text";
import {MonthType, YearCategory} from "@objects/payment.type";
import {Modal} from "../../../../structure/modal/Modal";
import {TogglePaymentRequestBody} from "@objects/request.type";
import {enablePayment} from "@redux/year/year.thunk";
import {useAppDispatch} from "@app/hooks";

export const EnablePaymentModal: React.FC<{
    show: boolean;
    month: MonthType;
    onClose: () => void;
    yearCategory: YearCategory;
}> = ({
    show,
    month,
    onClose,
    yearCategory,
}) => {
    if (!show) return null;

    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        const body: TogglePaymentRequestBody = {
            monthName: month,
            yearCategoryId: yearCategory.id
        };
        dispatch(enablePayment(body));
    }

    return (
        <Modal
            show={show}
            onConfirm={handleConfirm}
            onClose={onClose}
            title={month}
            confirmButtonText={STATIC_TEXT.CONFIRM}
            cancelButtonText={STATIC_TEXT.ABORT}
            description={STATIC_TEXT.CONFIRM_ENABLE_MONTH_PAYMENT}
        />
    );
};