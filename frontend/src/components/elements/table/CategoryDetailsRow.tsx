import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import {Box, TableBody, TableHead, Typography} from "@mui/material";
import {Table} from "react-bootstrap";
import {CategoryDetails, Payment} from "../../../objects/payment.type";
import {STATIC_TEXT} from "../../../objects/static_text";

type Props = {
    open: boolean,
    categoryDetails?: CategoryDetails,
    year: number,
};

export const CategoryDetailsRow: React.FC<Props> = ({
    open,
    categoryDetails,
    year
}: Props) => {
    const yearFilteredPayments: Payment[] | undefined = categoryDetails?.payments?.filter(
        (payment: Payment): boolean => payment.year === year);

    let sum: number = 0;
    categoryDetails?.payments.forEach((payment: Payment): number => sum += payment.amount);

    return (
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={9} className="border-0">
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{marginLeft: 70, marginTop: 3, marginBottom: 5}}>
                        <Typography variant="h6" gutterBottom component="div" align="center">
                            {STATIC_TEXT.PAYMENTS_FROM_YEAR}<strong>{year}</strong>
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                {
                                    !!yearFilteredPayments && yearFilteredPayments.length ? <TableRow>
                                        <TableCell className="border-0">{STATIC_TEXT.LP}</TableCell>
                                        <TableCell className="border-0">{STATIC_TEXT.DATE}</TableCell>
                                        <TableCell className="border-0" align="right">
                                            {STATIC_TEXT.AMOUNT}
                                        </TableCell>
                                    </TableRow> : <React.Fragment/>
                                }
                            </TableHead>
                            <TableBody>
                                {
                                    !!yearFilteredPayments && yearFilteredPayments.length ?
                                        <React.Fragment>
                                            {
                                                yearFilteredPayments.map(
                                                    (payment: Payment, index: number) =>
                                                        <TableRow key={`category-details-row-${index}`}>
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
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="border-top-0 border-bottom-0"
                                                    align="center"
                                                >
                                                    {STATIC_TEXT.NO_PAYMENTS_IN_CATEGORY}
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                }
                                <TableRow>
                                    <TableCell className="border-top border-bottom-0"/>
                                    <TableCell className="border-top border-bottom-0" align="right">
                                        {STATIC_TEXT.ALL_YEARS_SUM}
                                    </TableCell>
                                    <TableCell className="border-top border-bottom-0" align="right">
                                        {
                                            STATIC_TEXT.AMOUNT_ZL(sum.toFixed(2))
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};