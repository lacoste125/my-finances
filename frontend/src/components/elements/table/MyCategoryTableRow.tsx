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
};

export const MyCategoryTableRow = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const [categoryDetails, setCategoryDetails] = React.useState<CategoryDetails | undefined>(undefined);

    const iconHtmlColor: string = "white";

    const handleOpen = () => {
        if(!open){
            GET(setCategoryDetails, GET_CATEGORY_PAYMENTS_BY_ID_API_PATH(props.yearCategory.categoryType.id)).then();
        }
        setOpen(!open);
    }
    const borderClass: string = getBorder(open, props.isLastRow);
    const categoryName: string = props.yearCategory.categoryType.name

    return (
        <React.Fragment>
            <TableRow key={`TableRow_${props.yearCategory.id}`}>
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
                        text={`${STATIC_TEXT.DEADLINE_WITH_COLON}${props.yearCategory.categoryType.deadline}`}
                        place={"top"}
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
                                key={`PayCell_${month}_${props.yearCategory.id}`}
                                monthType={month}
                                payments={props.yearCategory.payments}
                                disabledPayments={props.yearCategory.disabledPayments}
                                yearCategory={props.yearCategory}
                                year={props.year}
                                onUpdate={props.onUpdate}
                                setNotificationDetails={props.setNotificationDetails}
                                open={open}
                                isLastRow={props.isLastRow}
                            />
                        )
                    )
                }
            </TableRow>
            <CategoryDetailsRow open={open} categoryDetails={categoryDetails} year={props.year}/>
        </React.Fragment>
    );
};