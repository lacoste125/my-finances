import * as React from "react";
import {useMemo} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import {Container, Table, TableBody, TableHead, Typography} from "@mui/material";
import {CategoryDetails, Payment} from "@objects/payment.type";
import {STATIC_TEXT} from "@objects/static_text";

export const CategoryDetailsRow: React.FC<{
    open: boolean;
    categoryDetails?: CategoryDetails;
    year: number;
}> = ({
    open,
    categoryDetails,
    year,
}) => {
    const yearFilteredPayments: Payment[] | undefined = useMemo(() => {
        return categoryDetails?.payments?.filter(
            (payment: Payment): boolean => payment.year === year);
    }, [categoryDetails]);

    const sum: number = useMemo(() => {
        return categoryDetails?.payments?.reduce((acc, payment) => acc + payment.amount, 0) ?? 0;
    }, [categoryDetails]);

    const showTable: boolean = useMemo(() => {
        return Boolean(!!yearFilteredPayments && yearFilteredPayments.length);
    }, [yearFilteredPayments]);

    return (
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={14} className="border-0">
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Typography variant="h6" gutterBottom component="div" align="center" className="mt-3">
                        {STATIC_TEXT.PAYMENTS_FROM_YEAR}<strong>{year}</strong>
                    </Typography>
                    <Container maxWidth="sm" sx={{mt: 1, mb: 4}}>
                        <Table className="dark_background" size="small">
                            {
                                showTable ? (
                                    <React.Fragment>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="border-0">{STATIC_TEXT.LP}</TableCell>
                                                <TableCell className="border-0">{STATIC_TEXT.DATE}</TableCell>
                                                <TableCell className="border-0" align="right">
                                                    {STATIC_TEXT.AMOUNT}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {
                                            yearFilteredPayments!.map(
                                                (payment: Payment, index: number) =>
                                                    <TableRow key={`category-details-row-${payment.id}`}>
                                                        <TableCell className="border-bottom-0">
                                                            {++index}
                                                        </TableCell>
                                                        <TableCell className="border-bottom-0">
                                                            {payment.date}
                                                        </TableCell>
                                                        <TableCell className="border-bottom-0" align="right">
                                                            {STATIC_TEXT.AMOUNT_ZL(payment.amount)}
                                                        </TableCell>
                                                    </TableRow>
                                            )
                                        }
                                    </React.Fragment>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="border-top-0 border-bottom-0" align="center">
                                            {STATIC_TEXT.NO_PAYMENTS_IN_CATEGORY}
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border-top border-bottom-0"/>
                                    <TableCell className="border-top border-bottom-0" align="right">
                                        {STATIC_TEXT.ALL_YEARS_SUM}
                                    </TableCell>
                                    <TableCell className="border-top border-bottom-0" align="right">
                                        {STATIC_TEXT.AMOUNT_ZL(sum.toFixed(2))}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Container>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};