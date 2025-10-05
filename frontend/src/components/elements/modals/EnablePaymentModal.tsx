import * as React from "react";
import {STATIC_TEXT} from "../../../objects/static_text";
import {MonthType} from "../../../objects/payment.type";
import {Modal} from "../../Modal";

type Props = {
    show: boolean,
    month: MonthType,
    onClose: () => void,
    onConfirmEnablePayment: () => void,
};

export const EnablePaymentModal: React.FC<Props> = ({
    show,
    month,
    onClose,
    onConfirmEnablePayment
}: Props) => {
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