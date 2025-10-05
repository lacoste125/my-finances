import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {MonthType, Year, YearCategory} from "../../../objects/payment.type";
import {MyCategoryTableRow} from "./MyCategoryTableRow";
import {GET, GET_YEAR_BY_YEAR_NUMBER_API_PATH} from "../../../utils/api.actions";
import {STATIC_TEXT} from "../../../objects/static_text";
import {AddNewRowModal} from "../modals/AddNewRowModal";
import {Tooltip} from "../tooltip/Tooltip";
import Button from "@mui/material/Button";

export const MyTable: React.FC<{
    year?: Year,
    setYear: Dispatch<SetStateAction<Year | undefined>>,
    showAddNewCategoryModal: boolean,
    setShowAddNewCategoryModal: Dispatch<SetStateAction<boolean>>,
}> = ({
    year,
    setYear,
    showAddNewCategoryModal,
    setShowAddNewCategoryModal
}) => {

    const isYearHasAnyCategory = !!year && year.categories.length;
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
                                    <MyCategoryTableRow
                                        key={`${yearCategory.id}_${index}`}
                                        yearCategory={yearCategory}
                                        year={year!.name}
                                        onUpdate={
                                            () => GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(year!.name))
                                                .then()
                                        }
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
                                    <div id="empty-year">
                                        {STATIC_TEXT.NO_CATEGORIES_IN_YEAR(year?.name)}
                                    </div>
                                </TableCell>
                            </TableRow>
                    }
                    {
                        !!year && year.name === new Date().getFullYear().valueOf() && <TableRow key="tableHeader">
                            <TableCell colSpan={3}>
                                <Tooltip
                                    id={"add-row-tooltip"}
                                    text={STATIC_TEXT.ADD_ROW}
                                    place="right"
                                    delay={2000}
                                    element={
                                        <Button
                                            id="add-hide-row-btn"
                                            aria-label="expand row"
                                            variant={"contained"}
                                            onClick={() => setShowAddNewCategoryModal(true)}
                                            sx={{minWidth: 75}}
                                        >
                                            Add new category
                                        </Button>
                                    }
                                />
                            </TableCell>
                            <TableCell colSpan={13} height={60}/>
                        </TableRow>

                    }
                </TableBody>
            </Table>
            <AddNewRowModal
                show={showAddNewCategoryModal}
                onConfirm={() => setShowAddNewCategoryModal(false)}
                onClose={() => setShowAddNewCategoryModal(false)}
                year={year}
                setYear={setYear}
                setShowAddNewCategoryModal={setShowAddNewCategoryModal}
            />
        </React.Fragment>
    );
};