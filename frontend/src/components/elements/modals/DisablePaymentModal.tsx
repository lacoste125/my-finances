import Modal from "react-bootstrap/Modal";
import {STATIC_TEXT} from "../../../objects/static_text";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {useState} from "react";
import {MonthType} from "../../../objects/payment.type";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

type Props = {
    show: boolean,
    monthType: MonthType,
    onClose: () => void,
    onConfirmDisablePayment: (comment?: string) => void
};

export const DisablePaymentModal = (props: Props) => {
    const [comment, setComment] = useState<string | undefined>(undefined);

    const handleCommentChange = (newComment: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (newComment) {
            setComment(newComment.target.value);
        }
    };

    return <Modal show={props.show} onHide={props.onClose} onEscapeKeyDown={props.onClose}>
        <Modal.Header closeButton closeVariant={"white"} className={"dark_background"}>
            <Modal.Title>
                {props.monthType}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className={"dark_background"}>
            {STATIC_TEXT.CONFIRM_DISABLE_MONTH_PAYMENT}
            {/*TODO - może zrobić to jako oddzielny komponent?*/}
            <InputGroup className="mb-3 pt-3">
                <InputGroup.Text>
                    {STATIC_TEXT.COMMENT}
                </InputGroup.Text>
                <Form.Control
                    className={"comment_class shadow-none"}
                    onChange={event => handleCommentChange(event)}
                    value={comment}
                    placeholder={STATIC_TEXT.DISABLE_PAYMENT_PLACEHOLDER}
                />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer className={"dark_background"}>
            <Button id={"close-modal-btn"} variant="secondary" onClick={props.onClose}>
                {STATIC_TEXT.ABORT}
            </Button>
            <Button id={"ok-modal-btn"} variant="danger" onClick={() => props.onConfirmDisablePayment(comment)}>
                {STATIC_TEXT.DISABLE_PAYMENT}
            </Button>
        </Modal.Footer>
    </Modal>;
};