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

export default function MyTable(props: Props) {

    const isYearHasAnyCategory = !!props.year && props.year.categories.length;
    return (
        <Table
            className={"dark_background"}
            size={"small"}
        >
            <TableHead>
                <TableRow key={"tableHeader"}>
                    <TableCell/>
                    <TableCell className={"dark_background"}>{STATIC_TEXT.FEE}</TableCell>
                    {
                        Object.values(MonthType)
                            .map(
                                (monthType: MonthType, index: number) => {
                                    const required: string = index === new Date().getMonth() && new Date().getFullYear() === props.year?.name ? "required-" : "";
                                    return <TableCell
                                        id={`${required}month-header-cell-${index}-${monthType}`}
                                        key={monthType}
                                        align="center"
                                        className={"dark_background"}
                                    >
                                        {monthType}
                                    </TableCell>
                                }
                            )
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    isYearHasAnyCategory ? props.year!.categories.map(
                            (yearCategory: YearCategory, index: number) => (
                                <MyCategoryTableRow
                                    key={`${yearCategory.id}_${index}`}
                                    yearCategory={yearCategory}
                                    year={props.year!.name}
                                    onUpdate={
                                        () => GET(props.setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(props.year!.name))
                                            .then()
                                    }
                                    setNotificationDetails={props.setNotificationDetails}
                                    isLastRow={index === props.year!.categories.length - 1}
                                />
                            )
                        ) :
                        <TableRow>
                            <TableCell
                                colSpan={14}
                                align="center"
                                className={'dark_background border-end border-top border-dark border-bottom'}
                            >
                                <div id={"empty-year"}>{STATIC_TEXT.NO_CATEGORIES_IN_YEAR(props.year?.name)}</div>
                            </TableCell>
                        </TableRow>
                }
                {
                    !!props.year && props.year.name === new Date().getFullYear().valueOf() &&
                    <AddCategoryForm
                        year={props.year}
                        setYear={props.setYear}
                        setNotificationDetails={props.setNotificationDetails}
                        addCategorySectionVisible={props.addCategorySectionVisible}
                        setAddCategorySectionVisible={props.setAddCategorySectionVisible}
                    />
                }
            </TableBody>
        </Table>
    );
}