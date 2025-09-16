import Modal from "react-bootstrap/Modal";
import {STATIC_TEXT} from "../../../objects/static_text";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {MonthType} from "../../../objects/payment.type";

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
        <Modal show={show} onHide={onClose} onEscapeKeyDown={onClose}>
            <Modal.Header closeButton closeVariant="white" className="dark_background">
                <Modal.Title>
                    {month}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="dark_background">
                {STATIC_TEXT.CONFIRM_ENABLE_MONTH_PAYMENT}
            </Modal.Body>
            <Modal.Footer className="dark_background">
                <Button id="close-modal-btn" variant="secondary" onClick={onClose}>
                    {STATIC_TEXT.ABORT}
                </Button>
                <Button id="ok-modal-btn" variant="success" onClick={onConfirmEnablePayment}>
                    {STATIC_TEXT.CONFIRM}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};