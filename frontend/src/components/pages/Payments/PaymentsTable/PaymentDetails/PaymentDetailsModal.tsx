import * as React from "react";
import {useMemo, useState} from "react";
import {MonthType, Payment, YearCategory} from "@objects/payment.type";
import {MonthDetailsTable} from "./MonthDetailsTable";
import {getDateFromString} from "@utils/util.action";
import {FORMAT_TEXT, STATIC_TEXT} from "@objects/static_text";
import {TooltipProvider} from "../../../../elements/tooltip/TooltipProvider";
import {AddPaymentRequestBody} from "@objects/request.type";
import {Modal} from "../../../../structure/modal/Modal";
import {Box, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {PickerValue} from "@mui/x-date-pickers/internals";
import {addPayment} from "@redux/year/year.thunk";
import {useAppDispatch} from "@app/hooks";
import {useYear} from "@app/useYear";

export const PaymentDetailsModal: React.FC<{
    show: boolean;
    onClose: () => void;
    payments: Payment[];
    monthType: MonthType;
    yearCategory: YearCategory;
    onSetDisablePaymentModal: () => void;
}> = ({
    show,
    onClose,
    payments,
    monthType,
    yearCategory,
    onSetDisablePaymentModal,
}) => {

    const dispatch = useAppDispatch();
    const year = useYear();

    const [date, setDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const isAddPaymentButtonActive: boolean = useMemo(() => amount.length > 0 && comment.length > 0, [amount, comment]);

    const handleDateChange = (newDate: PickerValue) => {
        if (newDate) {
            setDate(newDate.toDate());
        }
    };

    if (!show) return null;

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

    const handlePaymentClick = () => {
        const body: AddPaymentRequestBody = {
            amount: parseFloat(amount),
            comment: comment,
            date: getDateFromString(date),
            monthName: monthType,
            yearCategoryId: yearCategory.id
        };

        dispatch(addPayment(body));

        setDate(new Date());
        setComment("");
        setAmount("");
    };

    if (!year) return null;

    return (
        <Modal
            show={show}
            onConfirm={onClose}
            onClose={onClose}
            title={STATIC_TEXT.PAYMENT_MODAL_TITLE(year.name, monthType, yearCategory.categoryType.name.toUpperCase())}
            cancelButtonText={STATIC_TEXT.ABORT}
            size="md"
        >
            <MonthDetailsTable payments={payments}/>
            <Stack spacing={2} sx={{pt: 5}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        defaultValue={dayjs(new Date())}
                        format={FORMAT_TEXT.DATE_FORMAT}
                        onChange={value => handleDateChange(value)}
                    />
                </LocalizationProvider>
                <TextField
                    id="new_amount_input"
                    type="number"
                    label={STATIC_TEXT.AMOUNT}
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder={STATIC_TEXT.ADD_AMOUNT}
                    fullWidth
                    slotProps={{
                        input: {
                            inputProps: {
                                pattern: "[0-9]*"
                            }
                        }
                    }}
                />

                <TextField
                    label={STATIC_TEXT.COMMENT}
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder={STATIC_TEXT.ADD_NOTE_PLACEHOLDER}
                    fullWidth
                />
            </Stack>
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2} sx={{marginTop: 2}}>
                <TooltipProvider
                    id="add-payment-btn-tooltip"
                    text={!isAddPaymentButtonActive ? STATIC_TEXT.FILL_ALL_FIELDS_TO_ADD_PAYMENT : ""}
                    place="left"
                >
                    <Button
                        id="add-payment-btn"
                        onClick={handlePaymentClick}
                        variant="contained"
                        color="success"
                        disabled={!isAddPaymentButtonActive}
                    >
                        {STATIC_TEXT.ADD_PAYMENT}
                    </Button>
                </TooltipProvider>
                <TooltipProvider
                    id="disable-payment-tooltip"
                    text={payments.length ? STATIC_TEXT.CANNOT_DISABLE_PAYMENT : ""}
                    place="left"
                >
                    <Button
                        disabled={!!payments.length}
                        id="disable-payment-btn"
                        color="error"
                        variant="contained"
                        onClick={onSetDisablePaymentModal}
                    >
                        {STATIC_TEXT.DISABLE_PAYMENT_THIS_MONTH}
                    </Button>
                </TooltipProvider>
            </Box>
        </Modal>
    );
};