import {STATIC_TEXT} from "../../../../../objects/static_text";
import * as React from "react";
import {useState} from "react";
import {MonthType} from "../../../../../objects/payment.type";
import {Modal} from "../../../../structure/modal/Modal";
import {Stack, TextField} from "@mui/material";

export const DisablePaymentModal: React.FC<{
    show: boolean;
    monthType: MonthType;
    onClose: () => void;
    onConfirmDisablePayment: (comment?: string) => void;
}> = ({
    show,
    monthType,
    onClose,
    onConfirmDisablePayment,
}) => {
    const [comment, setComment] = useState<string | undefined>(undefined);

    const handleCommentChange = (newComment: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (newComment) {
            setComment(newComment.target.value);
        }
    };

    return (
        <Modal
            show={show}
            onConfirm={() => onConfirmDisablePayment(comment)}
            onClose={onClose}
            title={monthType}
            confirmButtonText={STATIC_TEXT.DISABLE_PAYMENT}
            cancelButtonText={STATIC_TEXT.ABORT}
            description={STATIC_TEXT.CONFIRM_ENABLE_MONTH_PAYMENT}
            skipOnCloseAfterConfirm
        >
            <React.Fragment>
                <Stack spacing={2}>
                    <div>
                        {STATIC_TEXT.CONFIRM_DISABLE_MONTH_PAYMENT}
                    </div>
                    <TextField
                        label={STATIC_TEXT.COMMENT}
                        value={comment}
                        onChange={event => handleCommentChange(event)}
                        placeholder={STATIC_TEXT.DISABLE_PAYMENT_PLACEHOLDER}
                        fullWidth
                    />
                </Stack>
            </React.Fragment>
        </Modal>
    );
};