import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {useMemo} from "react";
import {DisabledPayment, MonthType, Payment, YearCategory} from "@objects/payment.type";
import {PaymentDetailsModal} from "../PaymentDetails/PaymentDetailsModal";
import {STATIC_TEXT} from "@objects/static_text";
import {getBorder} from "@utils/util.action";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import {DisablePaymentModal} from "../Modals/DisablePaymentModal";
import {EnablePaymentModal} from "../Modals/EnablePaymentModal";
import {TooltipProvider} from "../../../../elements/tooltip/TooltipProvider";
import {TogglePaymentRequestBody} from "@objects/request.type";
import styles from "./MyPaymentTableCell.module.css";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {disablePayment} from "@redux/year/year.thunk";

export const MyPaymentTableCell: React.FC<{
    monthNumber: number;
    monthType: MonthType;
    yearCategory: YearCategory;
    open: boolean;
    isLastRow: boolean;
}> = ({
    monthNumber,
    monthType,
    yearCategory,
    open,
    isLastRow,
}) => {

    const dispatch = useAppDispatch();
    const year = useAppSelector(state => state.yearReducer.year);

    const [paymentDetailModalVisible, setPaymentDetailModalVisible] = React.useState<boolean>(false);
    const [disablePaymentModalVisible, setDisablePaymentModalVisible] = React.useState<boolean>(false);
    const [enablePaymentModalVisible, setEnableModalVisible] = React.useState<boolean>(false);
    const [iconColor, setIconColor] = React.useState<string>("#2b2b2b");

    const monthPayments: Payment[] = useMemo(() => {
        return yearCategory.payments.filter(
            (payment: Payment): boolean => payment.month === monthType
        );
    }, [yearCategory.payments]);

    const monthSum = useMemo(() => {
        return monthPayments?.reduce((acc, payment) => acc + payment.amount, 0) ?? 0;
    }, [monthPayments]);

    const paymentsWord: string = useMemo(() => {
        return monthPayments.length === 1 ? STATIC_TEXT.PAYMENT : STATIC_TEXT.PAYMENTS;
    }, [monthPayments]);

    const isThisMonthDisabled: boolean = useMemo(() => {
        return yearCategory.disabledPayments
            .filter(dp => dp.valid)
            .map(
                (disabledPayment: DisabledPayment): MonthType => disabledPayment.month.name
            )
            .includes(monthType);
    }, [yearCategory.disabledPayments, monthType]);

    const disabledPaymentComment = (month: MonthType) => {
        return yearCategory.disabledPayments.find(
            (dp: DisabledPayment): boolean => dp.month.name === month
        );
    };

    const tooltipId: string = useMemo(() => {
        return "tooltip_" + monthType + "_" + yearCategory.id;
    }, [monthType, yearCategory]);

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
        const body: TogglePaymentRequestBody = {
            monthName: monthType,
            yearCategoryId: yearCategory.id,
            comment: comment
        };
        dispatch(disablePayment(body));

        setPaymentDetailModalVisible(false);
        setDisablePaymentModalVisible(false);
    };

    const handleAbortEnablePayment = () => {
        setEnableModalVisible(false);
    };

    const borderClass: string = useMemo(() => {
        return getBorder(open, isLastRow);
    }, [open, isLastRow]);

    const isCurrentMonth: boolean = useMemo(() => {
        return monthNumber === new Date().getMonth() && new Date().getFullYear() === year?.name;
    }, [monthNumber, year]);

    const isPreviousMonth: boolean = useMemo(() => {
        return new Date().getFullYear() > (year?.name ?? 0) ||
            (
                new Date().getFullYear() === (year?.name ?? 0) &&
                monthNumber < new Date().getMonth()
            );
    }, [year, monthNumber]);

    const currentMonthPrefix: string = useMemo(() => {
        return isCurrentMonth ? "required_" : "";
    }, [isCurrentMonth]);

    return (
        <React.Fragment>
            <TableCell
                id={`${currentMonthPrefix}table_cell_${monthType}_${yearCategory.id}`}
                className={`border-dark border-top ${styles.table_cell} ${borderClass}`}
                align="center"
                onClick={handleOnCellClick}
                onMouseEnter={() => setIconColor("#cedbdb")}
                onMouseLeave={() => setIconColor("#2b2b2b")}
            >
                {
                    isThisMonthDisabled ? (
                        <TooltipProvider
                            id={tooltipId}
                            text={disabledPaymentComment(monthType)?.comment || STATIC_TEXT.PAYMENT_DISABLED_CLICK_TO_CHANGE}
                            place="top"
                        >
                             <span>
                                <DoNotDisturbAltIcon htmlColor={iconColor}/>
                            </span>
                        </TooltipProvider>
                    ) : (
                        <TooltipProvider
                            id={tooltipId}
                            text={`${monthPayments.length} ${paymentsWord}`}
                            place="top"
                        >
                            <span>
                                {monthSum ? Math.round(monthSum * 100) / 100 : isCurrentMonth || isPreviousMonth ?
                                    <PriorityHigh htmlColor={"#bb2a2a"}/> : ""}
                            </span>
                        </TooltipProvider>
                    )
                }
            </TableCell>
            <PaymentDetailsModal
                show={paymentDetailModalVisible}
                onClose={() => setPaymentDetailModalVisible(false)}
                payments={monthPayments}
                monthType={monthType}
                yearCategory={yearCategory}
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
                yearCategory={yearCategory}
                month={monthType}
                onClose={handleAbortEnablePayment}
            />
        </React.Fragment>
    );
};