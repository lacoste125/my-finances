import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {useMemo, useState} from "react";
import {CategoryDetails, MonthType, YearCategory} from "@objects/payment.type";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {MyPaymentTableCell} from "../TableCell/MyPaymentTableCell";
import {GET, GET_CATEGORY_PAYMENTS_BY_ID_API_PATH} from "@utils/api.actions";
import {getBorder} from "@utils/util.action";
import {Tooltip} from "../../../../elements/tooltip/Tooltip";
import {STATIC_TEXT} from "@objects/static_text";
import {CategoryDetailsRow} from "../CategoryDetails/CategoryDetailsRow";

const ICON_HTML_COLOR: string = "white";

export const CategoryTableRow: React.FC<{
    yearCategory: YearCategory;
    year: number;
    onUpdate: () => void;
    isLastRow: boolean;
}> = ({
    yearCategory,
    year,
    onUpdate,
    isLastRow,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | undefined>(undefined);

    const handleOpen = () => {
        if (!open) {
            GET(setCategoryDetails, GET_CATEGORY_PAYMENTS_BY_ID_API_PATH(yearCategory.categoryType.id)).then();
        }
        setOpen(!open);
    };

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
                    <IconButton size="small" onClick={handleOpen}>
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
                    <Tooltip
                        id={`tooltip-deadline-${categoryName}`}
                        text={`${STATIC_TEXT.DEADLINE_WITH_COLON}${yearCategory.categoryType.deadline}`}
                        place="top"
                        delay={1000}
                    >
                        <span>{categoryName}</span>
                    </Tooltip>
                </TableCell>
                {
                    Object.values(MonthType).map(
                        (month: MonthType, index: number) => (
                            <MyPaymentTableCell
                                monthNumber={index}
                                key={`PayCell_${month}_${yearCategory.id}`}
                                monthType={month}
                                payments={yearCategory.payments}
                                disabledPayments={yearCategory.disabledPayments}
                                yearCategory={yearCategory}
                                year={year}
                                onUpdate={onUpdate}
                                open={open}
                                isLastRow={isLastRow}
                            />
                        )
                    )
                }
            </TableRow>
            <CategoryDetailsRow open={open} categoryDetails={categoryDetails} year={year}/>
        </React.Fragment>
    );
};