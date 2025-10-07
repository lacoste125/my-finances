import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {Tooltip} from "../../../elements/tooltip/Tooltip";
import {STATIC_TEXT} from "../../../../objects/static_text";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {Chip, Container} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {CREATE, CREATE_NEXT_YEAR_API_PATH, GET, GET_YEAR_BY_YEAR_NUMBER_API_PATH} from "../../../../utils/api.actions";
import {AddNewYearModal} from "./AddNewYearModal";
import {Year} from "../../../../objects/payment.type";

export const YearContainer: React.FC<{
    yearNumbers: number[];
    year?: Year;
    setYear: Dispatch<SetStateAction<Year | undefined>>;
}> = ({
    yearNumbers,
    year,
    setYear
}) => {
    const actualIndex: number = useMemo(() => {
        return yearNumbers.indexOf(year ? year.name : -1);
    }, [yearNumbers, year]);

    const isYearLeftArrowEnabled: boolean = useMemo(() => !!year && actualIndex > 0, [year, actualIndex]);

    const isYearRightArrowVisible: boolean = useMemo(() => {
        return !!year && !!yearNumbers && actualIndex < yearNumbers.length - 1;
    }, [year, yearNumbers, actualIndex]);

    useEffect(
        () => {
            GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(new Date().getFullYear())).then();
        }, []
    );

    const handleNextYearClick = () => {
        const yearNumber = yearNumbers.at(actualIndex + 1)!;
        GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(yearNumber)).then();
    };

    const handlePreviousYearClick = () => {
        const yearNumber = yearNumbers.at(actualIndex - 1)!;
        GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(yearNumber)).then();
    };

    const handleAddNewYearClick = () => {
        setShowAddNextYearModal(true);
    };

    const [showAddNextYearModal, setShowAddNextYearModal] = useState<boolean>(false);

    const handleConfirmAddNextYear = () => {
        createNextYear()
            .then(() => GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(year!.name + 1)).then());
    };

    const createNextYear = async () => {
        await CREATE(CREATE_NEXT_YEAR_API_PATH, {});
    };

    return (
        <React.Fragment>
            <Container id="year">
                <h3>
                    <Tooltip
                        id={isYearLeftArrowEnabled ? "previous-year-tooltip" : "no-more-years-tooltip"}
                        text={isYearLeftArrowEnabled ? STATIC_TEXT.PREVIOUS_YEAR : STATIC_TEXT.NO_MORE_YEARS_IN_CONFIG}
                        place={"left"}
                        delay={1000}
                        element={
                            <IconButton
                                id="previous-year-btn"
                                key="left-arrow"
                                size="small"
                                color={"primary"}
                                className="btn_and_tooltip"
                                disabled={!isYearLeftArrowEnabled}
                                onClick={handlePreviousYearClick}
                            >
                                <NavigateBeforeIcon/>
                            </IconButton>
                        }
                    />
                    <Chip label={year?.name} color="primary"/>
                    {
                        isYearRightArrowVisible ? (
                            <Tooltip
                                id="next-year-tooltip"
                                text={STATIC_TEXT.NEXT_YEAR}
                                place="right"
                                delay={1000}
                                element={
                                    <IconButton
                                        id="nex-year-btn"
                                        key="right"
                                        size="small"
                                        color={"primary"}
                                        onClick={handleNextYearClick}
                                    >
                                        <NavigateNextIcon/>
                                    </IconButton>
                                }
                            />
                        ) : (
                            <Tooltip
                                id="add-new-year-tooltip"
                                text={STATIC_TEXT.ADD_NEXT_YEAR}
                                place="right"
                                delay={1000}
                                element={
                                    <IconButton
                                        id="add-new-year-btn"
                                        key="year"
                                        size="small"
                                        onClick={handleAddNewYearClick}
                                    >
                                        <ControlPointIcon htmlColor="green"/>
                                    </IconButton>
                                }
                            />
                        )
                    }
                </h3>
            </Container>
            <AddNewYearModal
                show={showAddNextYearModal}
                addNewYear={handleConfirmAddNextYear}
                onClose={() => setShowAddNextYearModal(false)}
            />
        </React.Fragment>
    );
};