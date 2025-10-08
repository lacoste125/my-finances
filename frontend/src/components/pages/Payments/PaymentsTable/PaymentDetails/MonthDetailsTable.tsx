import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useMemo} from "react";
import {STATIC_TEXT} from "@objects/static_text";
import {Payment} from "@objects/payment.type";

export const MonthDetailsTable: React.FC<{
    payments: Payment[];
}> = ({
    payments,
}) => {

    const sortedPayments: Payment[] = useMemo(() => payments.sort(
            (a: Payment, b: Payment): number => new Date(a.date).getTime() - new Date(b.date).getTime()
        ), [payments]
    );

    const isAnyPaymentAvailable: number = useMemo(() => payments.length, [payments]);

    return (
        <TableContainer component={Paper}>
            <Table id="month-payment-table">
                <TableHead>
                    <TableRow key="tableHeader">
                        <TableCell width="9%">{STATIC_TEXT.LP}</TableCell>
                        <TableCell width="15%">{STATIC_TEXT.DATE}</TableCell>
                        <TableCell width="15%">{STATIC_TEXT.AMOUNT}</TableCell>
                        <TableCell>{STATIC_TEXT.COMMENT}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        isAnyPaymentAvailable ? sortedPayments.map(
                            (payment: Payment, index: number): React.ReactElement => (
                                <TableRow key={`PaymentDetail_${index}`}>
                                    <TableCell scope="row">
                                        {++index}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {payment.date}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {STATIC_TEXT.AMOUNT_ZL(payment.amount)}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {payment.comment}
                                    </TableCell>
                                </TableRow>
                            )
                        ) : (
                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    {STATIC_TEXT.NO_PAYMENT_THIS_MONTH_TEXT}
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};