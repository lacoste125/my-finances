import * as React from "react";
import {useMemo, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {MonthType, YearCategory} from "@objects/payment.type";
import {CategoryTableRow} from "./TableRow/CategoryTableRow";
import {STATIC_TEXT} from "@objects/static_text";
import {AddCategoryModal} from "./AddCategory/AddCategoryModal";
import {Tooltip} from "../../../elements/tooltip/Tooltip";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@app/store";
import {getYearByYearNumber, PaymentsState} from "@redux/payments/paymentsSlice";
import styles from "./PaymentsTable.module.css";

export const PaymentsTable: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [showAddNewCategoryModal, setShowAddNewCategoryModal] = useState<boolean>(false);

    const {year} = useSelector((state: RootState): PaymentsState => state.payments);

    const isYearHasAnyCategory = useMemo(() => {
        return !!year && year.categories.length;
    }, [year]);

    const showAddCategoryRow: boolean = useMemo(() => {
        return !!year && year.name === new Date().getFullYear().valueOf();
    }, [year]);

    return (
        <React.Fragment>
            <Table className="dark_background" size="small">
                <TableHead>
                    <TableRow key="tableHeader">
                        <TableCell/>
                        <TableCell className="dark_background">{STATIC_TEXT.FEE}</TableCell>
                        {
                            Object.values(MonthType)
                                .map(
                                    (monthType: MonthType, index: number) => {
                                        const required: string = index === new Date().getMonth() && new Date().getFullYear() === year?.name ? "required-" : "";
                                        return <TableCell
                                            id={`${required}month-header-cell-${index}-${monthType}`}
                                            key={monthType}
                                            align="center"
                                            className="dark_background"
                                        >
                                            {monthType}
                                        </TableCell>;
                                    }
                                )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        isYearHasAnyCategory ? year!.categories.map(
                                (yearCategory: YearCategory, index: number) => (
                                    <CategoryTableRow
                                        key={`${yearCategory.id}_${index}`}
                                        yearCategory={yearCategory}
                                        year={year!.name}
                                        onUpdate={() => dispatch(getYearByYearNumber(year!.name))}
                                        isLastRow={index === year!.categories.length - 1}
                                    />
                                )
                            ) :
                            <TableRow>
                                <TableCell
                                    colSpan={14}
                                    align="center"
                                    className="dark_background border-end border-top border-dark border-bottom"
                                >
                                    <div className={styles.emptyYear}>
                                        {STATIC_TEXT.NO_CATEGORIES_IN_YEAR(year?.name)}
                                    </div>
                                </TableCell>
                            </TableRow>
                    }
                    {
                        showAddCategoryRow && <TableRow>
                            <TableCell colSpan={3}>
                                <Tooltip
                                    id="add-row-tooltip"
                                    text="Dodaj wiersz"
                                    place="right"
                                    delay={2000}
                                >
                                    <Button
                                        id="add-hide-row-btn"
                                        aria-label="expand row"
                                        variant="contained"
                                        onClick={() => setShowAddNewCategoryModal(true)}
                                        sx={{minWidth: 75}}
                                    >
                                        Add new category
                                    </Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell colSpan={13} height={60}/>
                        </TableRow>

                    }
                </TableBody>
            </Table>
            <AddCategoryModal
                show={showAddNewCategoryModal}
                onClose={() => setShowAddNewCategoryModal(false)}
                setShowAddNewCategoryModal={(value: boolean) => setShowAddNewCategoryModal(value)}
            />
        </React.Fragment>
    );
};