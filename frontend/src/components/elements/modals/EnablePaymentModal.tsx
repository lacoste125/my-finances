import Modal from "react-bootstrap/Modal";
import {STATIC_TEXT} from "../../../objects/static_text";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {MonthType} from "../../../objects/payment.type";

type Props = {
    show: boolean,
    month: MonthType,
    onClose: () => void,
    onConfirmEnablePayment: () => void
};

export const EnablePaymentModal = (props: Props) => {
    return <Modal show={props.show} onHide={props.onClose} onEscapeKeyDown={props.onClose}>
        <Modal.Header closeButton closeVariant={"white"} className={"dark_background"}>
            <Modal.Title>
                {props.month}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className={"dark_background"}>
            {STATIC_TEXT.CONFIRM_ENABLE_MONTH_PAYMENT}
        </Modal.Body>
        <Modal.Footer className={"dark_background"}>
            <Button id={"close-modal-btn"} variant="secondary" onClick={props.onClose}>
                {STATIC_TEXT.ABORT}
            </Button>
            <Button id={"ok-modal-btn"} variant="success" onClick={props.onConfirmEnablePayment}>
                {STATIC_TEXT.CONFIRM}
            </Button>
        </Modal.Footer>
    </Modal>
}