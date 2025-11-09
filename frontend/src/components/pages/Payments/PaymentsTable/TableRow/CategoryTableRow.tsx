import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {useMemo, useState} from "react";
import {MonthType, YearCategory} from "@objects/payment.type";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {MyPaymentTableCell} from "../TableCell/MyPaymentTableCell";
import {getBorder} from "@utils/util.action";
import {TooltipProvider} from "../../../../elements/tooltip/TooltipProvider";
import {STATIC_TEXT} from "@objects/static_text";
import {CategoryDetailsRow} from "../CategoryDetails/CategoryDetailsRow";

const ICON_HTML_COLOR: string = "white";

export const CategoryTableRow: React.FC<{
    yearCategory: YearCategory;
    isLastRow: boolean;
}> = ({
    yearCategory,
    isLastRow,
}) => {

    const [open, setOpen] = useState<boolean>(false);

    const borderClass: string = useMemo(() => {
        return getBorder(open, isLastRow);
    }, [open, isLastRow]);

    const categoryName: string = useMemo(() => {
        return yearCategory.categoryType.name;
    }, [yearCategory]);

    return (
        <React.Fragment>
            <TableRow key={`TableRow_${yearCategory.id}`}>
                <TableCell className={`border-dark border-top ${borderClass}`}>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {
                            open ? <KeyboardArrowUpIcon htmlColor={ICON_HTML_COLOR}/> :
                                <KeyboardArrowDownIcon htmlColor={ICON_HTML_COLOR}/>
                        }
                    </IconButton>
                </TableCell>
                <TableCell
                    key={`TableCell_Name_${categoryName}`}
                    component="th"
                    scope="row"
                    className={`dark_background border-end border-top border-dark ${borderClass}`}
                >
                    <TooltipProvider
                        id={`tooltip-deadline-${categoryName}`}
                        text={`${STATIC_TEXT.DEADLINE_WITH_COLON}${yearCategory.categoryType.deadline}`}
                        place="top"
                    >
                        <span>{categoryName}</span>
                    </TooltipProvider>
                </TableCell>
                {
                    Object.values(MonthType).map(
                        (month: MonthType, index: number) => (
                            <MyPaymentTableCell
                                monthNumber={index}
                                key={`PayCell_${month}_${yearCategory.id}`}
                                monthType={month}
                                yearCategory={yearCategory}
                                open={open}
                                isLastRow={isLastRow}
                            />
                        )
                    )
                }
            </TableRow>
            <CategoryDetailsRow open={open} yearCategory={yearCategory}/>
        </React.Fragment>
    );
};