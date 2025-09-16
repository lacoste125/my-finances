import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {MonthType, Year, YearCategory} from "../../../objects/payment.type";
import {MyCategoryTableRow} from "./MyCategoryTableRow";
import {GET, GET_YEAR_BY_YEAR_NUMBER_API_PATH, NotificationDetails} from "../../../utils/api.actions";
import {STATIC_TEXT} from "../../../objects/static_text";
import {AddCategoryForm} from "./AddCategoryForm";

type Props = {
    setNotificationDetails: (value?: NotificationDetails) => void,
    year?: Year,
    setYear: Dispatch<SetStateAction<Year | undefined>>
    addCategorySectionVisible: boolean,
    setAddCategorySectionVisible: Dispatch<SetStateAction<boolean>>
}

export const MyTable: React.FC<Props> = ({
    setNotificationDetails,
    year,
    setYear,
    addCategorySectionVisible,
    setAddCategorySectionVisible
}: Props) => {

    const isYearHasAnyCategory = !!year && year.categories.length;
    return (
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
                                    setNotificationDetails={setNotificationDetails}
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
                    !!year && year.name === new Date().getFullYear().valueOf() &&
                    <AddCategoryForm
                        year={year}
                        setYear={setYear}
                        setNotificationDetails={setNotificationDetails}
                        addCategorySectionVisible={addCategorySectionVisible}
                        setAddCategorySectionVisible={setAddCategorySectionVisible}
                    />
                }
            </TableBody>
        </Table>
    );
};