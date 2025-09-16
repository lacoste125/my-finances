import * as React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {MonthType, Payment, YearCategory} from "../../../objects/payment.type";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import {MonthDetailsTable} from "../table/MonthDetailsTable";
import {ADD_PAYMENT_API_PATH, CREATE, NotificationDetails} from "../../../utils/api.actions";
import {getDateFromString} from "../../../utils/util.action";
import {FORMAT_TEXT, STATIC_TEXT} from "../../../objects/static_text";
import {Stack} from "react-bootstrap";
import {Tooltip} from "../tooltip/Tooltip";
import {AddPaymentRequestBody} from "../../../objects/request.type";

type Props = {
    show: boolean,
    onConfirm: () => void,
    onClose: () => void,
    payments: Payment[],
    monthType: MonthType,
    yearCategory: YearCategory,
    year: number,
    text: string,
    onUpdate: () => void,
    setNotificationDetails: (value?: NotificationDetails) => void,
    onSetDisablePaymentModal: () => void
};

export const PaymentDetailsModal: React.FC<Props> = ({
    show,
    onConfirm,
    onClose,
    payments,
    monthType,
    yearCategory,
    year,
    onUpdate,
    setNotificationDetails,
    onSetDisablePaymentModal,
}: Props) => {
    const [date, setDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const handleDateChange = (newDate: Date | null) => {
        if (newDate) {
            setDate(newDate);
        }
    };

    const handleAmountChange = (newAmount: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (newAmount) {
            setAmount(newAmount.target.value);
        }
    };

    const handleCommentChange = (newComment: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (newComment) {
            setComment(newComment.target.value);
        }
    };

    const addPayment = async () => {
        const body: AddPaymentRequestBody = {
            amount: parseFloat(amount),
            comment: comment,
            date: getDateFromString(date),
            monthName: monthType,
            yearCategoryId: yearCategory.id
        };

        await CREATE(
            ADD_PAYMENT_API_PATH,
            body,
            setNotificationDetails,
            STATIC_TEXT.SUCCESS_ADD_PAYMENT
        );
    };

    const handlePaymentClick = () => {
        addPayment().then(() => onUpdate());
        setDate(new Date());
        setComment("");
        setAmount("");
    };

    const isAddPaymentButtonActive = amount.length > 0 && comment.length > 0;

    return (
        <Modal size="xl" show={show} onHide={onClose} onEscapeKeyDown={onClose}>
            <Modal.Header closeButton closeVariant="white" className="dark_background">
                <Modal.Title>
                    {STATIC_TEXT.PAYMENT_MODAL_TITLE(year, monthType, yearCategory.categoryType.name.toUpperCase())}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="dark_background">
                <MonthDetailsTable payments={payments}/>
                <InputGroup className="mb-3 pt-5">
                    <InputGroup.Text>
                        {STATIC_TEXT.DATE}
                    </InputGroup.Text>
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        showIcon
                        dateFormat={FORMAT_TEXT.DATE_FORMAT}
                        todayButton={STATIC_TEXT.TODAY}
                        className="calendar shadow-none"
                    />
                    <InputGroup.Text>
                        {STATIC_TEXT.AMOUNT}
                    </InputGroup.Text>
                    <Form.Control
                        id="new_amount_input"
                        className="shadow-none"
                        type="number"
                        pattern="[0-9]"
                        onChange={event => handleAmountChange(event)}
                        value={amount}
                        placeholder={STATIC_TEXT.ADD_AMOUNT}
                    />
                    <InputGroup.Text>
                        {STATIC_TEXT.COMMENT}
                    </InputGroup.Text>
                    <Form.Control
                        className="comment_class shadow-none"
                        onChange={event => handleCommentChange(event)}
                        value={comment}
                        placeholder={STATIC_TEXT.ADD_NOTE_PLACEHOLDER}
                    />
                </InputGroup>
                <Stack className="float-md-end">
                    <Tooltip
                        id="add-payment-btn-tooltip"
                        text={!isAddPaymentButtonActive ? STATIC_TEXT.FILL_ALL_FIELDS_TO_ADD_PAYMENT : ""}
                        place="left"
                        element={
                            <Button
                                id={"add-payment-btn"}
                                variant={isAddPaymentButtonActive ? "success" : "secondary"}
                                onClick={handlePaymentClick}
                                color="dark"
                                disabled={!isAddPaymentButtonActive}
                                className="btn_and_tooltip float-md-end"
                            >
                                {STATIC_TEXT.ADD_PAYMENT}
                            </Button>
                        }
                    />
                </Stack>
            </Modal.Body>
            <Modal.Footer className="dark_background">
                <Tooltip
                    id="disable-payment-tooltip"
                    text={payments.length ? STATIC_TEXT.CANNOT_DISABLE_PAYMENT : ""}
                    place="left"
                    element={
                        <Button
                            disabled={!!payments.length}
                            id="disable-payment-btn"
                            variant="danger"
                            onClick={onSetDisablePaymentModal}
                        >
                            {STATIC_TEXT.DISABLE_PAYMENT_THIS_MONTH}
                        </Button>
                    }
                />
                <Button id="ok-modal-btn" variant="primary" onClick={onConfirm}>
                    {STATIC_TEXT.OK}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};