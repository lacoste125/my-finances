import * as React from "react";
import {STATIC_TEXT} from "../../../../../objects/static_text";
import {MonthType} from "../../../../../objects/payment.type";
import {Modal} from "../../../../structure/modal/Modal";

export const EnablePaymentModal: React.FC<{
    show: boolean;
    month: MonthType;
    onClose: () => void;
    onConfirmEnablePayment: () => void;
}> = ({
    show,
    month,
    onClose,
    onConfirmEnablePayment,
}) => {
    return (
        <Modal
            show={show}
            onConfirm={onConfirmEnablePayment}
            onClose={onClose}
            title={month}
            confirmButtonText={STATIC_TEXT.CONFIRM}
            cancelButtonText={STATIC_TEXT.ABORT}
            description={STATIC_TEXT.CONFIRM_ENABLE_MONTH_PAYMENT}
        />
    );
};