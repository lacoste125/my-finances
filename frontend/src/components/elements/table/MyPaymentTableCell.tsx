import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {DisabledPayment, MonthType, Payment, YearCategory} from "../../../objects/payment.type";
import {PaymentDetailsModal} from "../modals/PaymentDetailsModal";
import {STATIC_TEXT} from "../../../objects/static_text";
import {CREATE, DISABLE_PAYMENT_API_PATH, ENABLE_PAYMENT_API_PATH} from "../../../utils/api.actions";
import {getBorder} from "../../../utils/util.action";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import {DisablePaymentModal} from "../modals/DisablePaymentModal";
import {EnablePaymentModal} from "../modals/EnablePaymentModal";
import {Tooltip} from "../tooltip/Tooltip";
import {EnablePaymentRequestBody, TogglePaymentRequestBody} from "../../../objects/request.type";

export const MyPaymentTableCell: React.FC<{
    monthNumber: number,
    payments: Payment[],
    disabledPayments: DisabledPayment[],
    monthType: MonthType,
    yearCategory: YearCategory,
    year: number,
    onUpdate: () => void,
    open: boolean,
    isLastRow: boolean,
}> = ({
    monthNumber,
    payments,
    disabledPayments,
    monthType,
    yearCategory,
    year,
    onUpdate,
    open,
    isLastRow
}) => {
    const [paymentDetailModalVisible, setPaymentDetailModalVisible] = React.useState<boolean>(false);
    const [disablePaymentModalVisible, setDisablePaymentModalVisible] = React.useState<boolean>(false);
    const [enablePaymentModalVisible, setEnableModalVisible] = React.useState<boolean>(false);
    const [iconColor, setIconColor] = React.useState<string>("#2b2b2b");

    const monthPayments: Payment[] = payments.filter(
        (payment: Payment): boolean => payment.month === monthType
    );

    let monthSum: number = 0;
    monthPayments.forEach(
        (payment: Payment): number => monthSum += payment.amount
    );

    const paymentsWord: string = monthPayments.length === 1 ? STATIC_TEXT.PAYMENT : STATIC_TEXT.PAYMENTS;

    const isThisMonthDisabled: boolean = disabledPayments
        .map(
            (disabledPayment: DisabledPayment): MonthType => disabledPayment.month.name
        )
        .includes(monthType);

    const disabledPaymentComment = (month: MonthType) => {
        return disabledPayments.find(
            (dp: DisabledPayment): boolean => dp.month.name === month
        );
    };

    const tooltipId: string = "tooltip_" + monthType + "_" + yearCategory.id;

    const handleOnCellClick = () => {
        if (!isThisMonthDisabled) {
            setPaymentDetailModalVisible(true);
        } else {
            setEnableModalVisible(true);
        }
    };

    const handleDisablePaymentClick = () => {
        setPaymentDetailModalVisible(false);
        setDisablePaymentModalVisible(true);
    };

    const handleAbortDisablePayment = () => {
        setPaymentDetailModalVisible(true);
        setDisablePaymentModalVisible(false);
    };

    const handleConfirmDisablePayment = (comment?: string) => {
        disablePayment(comment).then(() => onUpdate());
        setPaymentDetailModalVisible(false);
        setDisablePaymentModalVisible(false);
    };

    const handleAbortEnablePayment = () => {
        setEnableModalVisible(false);
    };

    const handleConfirmEnablePayment = () => {
        enablePayment().then(() => onUpdate());
        setEnableModalVisible(false);
    };

    const disablePayment = async (comment?: string) => {
        const body: TogglePaymentRequestBody = {
            monthName: monthType,
            yearCategoryId: yearCategory.id,
            comment: comment
        };

        await CREATE(DISABLE_PAYMENT_API_PATH, body);
    };

    const enablePayment = async () => {
        const body: EnablePaymentRequestBody = {
            monthName: monthType,
            yearCategoryId: yearCategory.id
        };

        await CREATE(ENABLE_PAYMENT_API_PATH, body);
    };

    const borderClass: string = getBorder(open, isLastRow);
    const isCurrentMonth: boolean = monthNumber === new Date().getMonth() && new Date().getFullYear() === year;
    const isPreviousMonth: boolean = new Date().getFullYear() > year || (new Date().getFullYear() === year && monthNumber < new Date().getMonth());
    const currentMonthPrefix: string = isCurrentMonth ? "required_" : "";

    return (
        <React.Fragment>
            <TableCell
                id={`${currentMonthPrefix}table_cell_${monthType}_${yearCategory.id}`}
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
                            text={disabledPaymentComment(monthType)?.comment || STATIC_TEXT.PAYMENT_DISABLED_CLICK_TO_CHANGE}
                            place="top"
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
                            place="top"
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
                onClose={() => setPaymentDetailModalVisible(false)}
                payments={monthPayments}
                monthType={monthType}
                yearCategory={yearCategory}
                year={year}
                text=""
                onUpdate={onUpdate}
                onSetDisablePaymentModal={handleDisablePaymentClick}
            />
            <DisablePaymentModal
                show={disablePaymentModalVisible}
                monthType={monthType}
                onConfirmDisablePayment={(comment?: string) => handleConfirmDisablePayment(comment)}
                onClose={handleAbortDisablePayment}
            />
            <EnablePaymentModal
                show={enablePaymentModalVisible}
                month={monthType}
                onConfirmEnablePayment={handleConfirmEnablePayment}
                onClose={handleAbortEnablePayment}
            />
        </React.Fragment>
    );
};