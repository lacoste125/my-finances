import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {CategoryDetails, MonthType, YearCategory} from "../../../objects/payment.type";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {MyPaymentTableCell} from "./MyPaymentTableCell";
import {GET, GET_CATEGORY_PAYMENTS_BY_ID_API_PATH, NotificationDetails} from "../../../utils/api.actions";
import {CategoryDetailsRow} from "./CategoryDetailsRow";
import {getBorder} from "../../../utils/util.action";
import {Tooltip} from "../tooltip/Tooltip";
import {STATIC_TEXT} from "../../../objects/static_text";

type Props = {
    yearCategory: YearCategory,
    year: number,
    onUpdate: () => void,
    setNotificationDetails: (value?: NotificationDetails) => void,
    isLastRow: boolean
}

export const MyCategoryTableRow: React.FC<Props> = ({
    yearCategory,
    year,
    onUpdate,
    setNotificationDetails,
    isLastRow
}: Props) => {
    const [open, setOpen] = React.useState(false);
    const [categoryDetails, setCategoryDetails] = React.useState<CategoryDetails | undefined>(undefined);

    const iconHtmlColor: string = "white";

    const handleOpen = () => {
        if (!open) {
            GET(setCategoryDetails, GET_CATEGORY_PAYMENTS_BY_ID_API_PATH(yearCategory.categoryType.id)).then();
        }
        setOpen(!open);
    };

    const borderClass: string = getBorder(open, isLastRow);
    const categoryName: string = yearCategory.categoryType.name;

    return (
        <React.Fragment>
            <TableRow key={`TableRow_${yearCategory.id}`}>
                <TableCell className={`border-dark border-top ${borderClass}`}>
                    <IconButton size="small" onClick={handleOpen}>
                        {
                            open ? <KeyboardArrowUpIcon htmlColor={iconHtmlColor}/> :
                                <KeyboardArrowDownIcon htmlColor={iconHtmlColor}/>
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
                        element={
                            <span>
                              {categoryName}
                            </span>
                        }
                    />
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
                                setNotificationDetails={setNotificationDetails}
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