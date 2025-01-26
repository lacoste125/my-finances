import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {DisabledPayment, MonthType, Payment, YearCategory} from "../../../objects/payment.type";
import {PaymentDetailsModal} from "../modals/PaymentDetailsModal";
import {STATIC_TEXT} from "../../../objects/static_text";
import {
    CREATE,
    DISABLE_PAYMENT_API_PATH,
    ENABLE_PAYMENT_API_PATH,
    NotificationDetails
} from "../../../utils/api.actions";
import {getBorder} from "../../../utils/util.action";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import {DisablePaymentModal} from "../modals/DisablePaymentModal";
import {EnablePaymentModal} from "../modals/EnablePaymentModal";
import {Tooltip} from "../tooltip/Tooltip";
import {EnablePaymentRequestBody, TogglePaymentRequestBody} from "../../../objects/request.type";

type Props = {
    monthNumber: number
    payments: Payment[],
    disabledPayments: DisabledPayment[],
    monthType: MonthType,
    yearCategory: YearCategory,
    year: number,
    onUpdate: () => void,
    setNotificationDetails: (value?: NotificationDetails) => void,
    open: boolean,
    isLastRow: boolean
}

export const MyPaymentTableCell = (props: Props) => {
    const [paymentDetailModalVisible, setPaymentDetailModalVisible] = React.useState<boolean>(false);
    const [disablePaymentModalVisible, setDisablePaymentModalVisible] = React.useState<boolean>(false);
    const [enablePaymentModalVisible, setEnableModalVisible] = React.useState<boolean>(false);
    const [iconColor, setIconColor] = React.useState<string>("#2b2b2b");

    const monthPayments: Payment[] = props.payments
        .filter((payment: Payment): boolean => payment.month === props.monthType);

    let monthSum: number = 0;
    monthPayments.forEach((payment: Payment) => monthSum += payment.amount);

    const paymentsWord: string = monthPayments.length === 1 ? STATIC_TEXT.PAYMENT : STATIC_TEXT.PAYMENTS;

    const isThisMonthDisabled: boolean = props.disabledPayments
        .map(
            (disabledPayment: DisabledPayment) => disabledPayment.month.name
        )
        .includes(props.monthType);

    const disabledPaymentComment = (month: MonthType) => {
        return props.disabledPayments.find(
            (dp: DisabledPayment): boolean => dp.month.name === month)
    }

    const tooltipId: string = "tooltip_" + props.monthType + "_" + props.yearCategory.id

    const handleOnCellClick = () => {
        if (!isThisMonthDisabled) {
            setPaymentDetailModalVisible(true)
        } else {
            setEnableModalVisible(true);
        }
    }

    const handleDisablePaymentClick = () => {
        setPaymentDetailModalVisible(false);
        setDisablePaymentModalVisible(true);
    }

    const handleAbortDisablePayment = () => {
        setPaymentDetailModalVisible(true);
        setDisablePaymentModalVisible(false);
    }

    const handleConfirmDisablePayment = (comment?: string) => {
        disablePayment(comment).then(() => props.onUpdate());
        setPaymentDetailModalVisible(false);
        setDisablePaymentModalVisible(false);
    }

    const handleAbortEnablePayment = () => {
        setEnableModalVisible(false);
    }

    const handleConfirmEnablePayment = () => {
        enablePayment().then(() => props.onUpdate());
        setEnableModalVisible(false);
    }

    const disablePayment = async (comment?: string) => {
        const body: TogglePaymentRequestBody = {
            monthName: props.monthType,
            yearCategoryId: props.yearCategory.id,
            comment: comment
        }

        await CREATE(
            DISABLE_PAYMENT_API_PATH,
            body,
            props.setNotificationDetails,
            STATIC_TEXT.SUCCESS_PAYMENT_BLOCKED
        )
    }

    const enablePayment = async () => {
        const body: EnablePaymentRequestBody = {
            monthName: props.monthType,
            yearCategoryId: props.yearCategory.id
        };

        await CREATE(
            ENABLE_PAYMENT_API_PATH,
            body,
            props.setNotificationDetails,
            STATIC_TEXT.SUCCESS_PAYMENT_UNBLOCKED
        )
    };

    const borderClass: string = getBorder(props.open, props.isLastRow)
    const isCurrentMonth: boolean = props.monthNumber === new Date().getMonth() && new Date().getFullYear() === props.year;
    const isPreviousMonth: boolean = new Date().getFullYear() > props.year || (new Date().getFullYear() === props.year && props.monthNumber < new Date().getMonth())
    const currentMonthPrefix: string = isCurrentMonth ? "required_" : "";

    return <>
        <TableCell
            id={`${currentMonthPrefix}table_cell_${props.monthType}_${props.yearCategory.id}`}
            className={`table_cell border-dark border-top ${borderClass}`}
            align="center"
            onClick={handleOnCellClick}
            onMouseEnter={() => setIconColor("#cedbdb")}
            onMouseLeave={() => setIconColor("#2b2b2b")}
        >
            {
                isThisMonthDisabled ?
                    <Tooltip
                        id={tooltipId}
                        text={disabledPaymentComment(props.monthType)?.comment || STATIC_TEXT.PAYMENT_DISABLED_CLICK_TO_CHANGE}
                        place={"top"}
                        delay={1000}
                        element={
                            <span>
                                <DoNotDisturbAltIcon htmlColor={iconColor}/>
                            </span>
                        }
                    /> :
                    <Tooltip
                        id={tooltipId}
                        text={`${monthPayments.length} ${paymentsWord}`}
                        delay={1000}
                        place={"top"}
                        element={
                            <span>
                                {monthSum ? Math.round(monthSum * 100) / 100 : isCurrentMonth || isPreviousMonth ?
                                    <PriorityHigh htmlColor={"#bb2a2a"}/> : ""}
                            </span>
                        }
                    />
            }
        </TableCell>
        <PaymentDetailsModal
            show={paymentDetailModalVisible}
            onConfirm={() => setPaymentDetailModalVisible(false)}
            onClose={() => setPaymentDetailModalVisible(false)}
            payments={monthPayments}
            monthType={props.monthType}
            yearCategory={props.yearCategory}
            year={props.year}
            text={``}
            onUpdate={props.onUpdate}
            setNotificationDetails={props.setNotificationDetails}
            onSetDisablePaymentModal={handleDisablePaymentClick}
        />
        <DisablePaymentModal
            show={disablePaymentModalVisible}
            monthType={props.monthType}
            onConfirmDisablePayment={(comment?: string) => handleConfirmDisablePayment(comment)}
            onClose={handleAbortDisablePayment}
        />
        <EnablePaymentModal
            show={enablePaymentModalVisible}
            month={props.monthType}
            onConfirmEnablePayment={handleConfirmEnablePayment}
            onClose={handleAbortEnablePayment}
        />
    </>;
};