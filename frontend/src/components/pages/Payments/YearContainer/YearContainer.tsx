import React, {useEffect, useMemo, useState} from "react";
import {Tooltip} from "../../../elements/tooltip/Tooltip";
import {STATIC_TEXT} from "@objects/static_text";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {Chip, Container} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {CREATE_NEXT_YEAR_API_PATH} from "@utils/api.actions";
import {AddNewYearModal} from "./AddNewYearModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@app/store";
import {PaymentsState} from "@redux/payments/paymentsSlice";
import styles from "./YearContainer.module.css";
import {apiClient} from "@api/apiClient";
import {getAllYearNumbers, getYearByYearNumber} from "@redux/payments/payment.thunk";

export const YearContainer: React.FC = () => {
    const [showAddNextYearModal, setShowAddNextYearModal] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const {yearNumbers, year} = useSelector((state: RootState): PaymentsState => state.payments);

    useEffect(
        () => {
            if (!year) {
                dispatch(getYearByYearNumber(new Date().getFullYear()));
            }
        }, [dispatch]);

    const actualIndex: number = useMemo(() => {
        return yearNumbers.indexOf(year ? year.name : -1);
    }, [yearNumbers, year]);

    const isYearLeftArrowEnabled: boolean = useMemo(() => !!year && actualIndex > 0, [year, actualIndex]);

    const isYearRightArrowVisible: boolean = useMemo(() => {
        return !!year && !!yearNumbers && actualIndex < yearNumbers.length - 1;
    }, [year, yearNumbers, actualIndex]);

    const handleNextYearClick = () => {
        const yearNumber = yearNumbers.at(actualIndex + 1)!;
        dispatch(getYearByYearNumber(yearNumber));
    };

    const handlePreviousYearClick = () => {
        const yearNumber = yearNumbers.at(actualIndex - 1)!;
        dispatch(getYearByYearNumber(yearNumber));
    };

    const handleAddNewYearClick = () => {
        setShowAddNextYearModal(true);
    };

    const handleConfirmAddNextYear = () => {
        apiClient({
            method: "POST",
            endpoint: CREATE_NEXT_YEAR_API_PATH,
            body: {},
        })
            .then(() => dispatch(getAllYearNumbers()))
            .then(() => dispatch(getYearByYearNumber(year!.name + 1)));
    };

    return (
        <React.Fragment>
            <Container className={styles.year_container}>
                <h3>
                    <Tooltip
                        id={isYearLeftArrowEnabled ? "previous-year-tooltip" : "no-more-years-tooltip"}
                        text={isYearLeftArrowEnabled ? STATIC_TEXT.PREVIOUS_YEAR : STATIC_TEXT.NO_MORE_YEARS_IN_CONFIG}
                        place="left"
                        delay={1000}
                    >
                        <IconButton
                            id="previous-year-btn"
                            key="left-arrow"
                            size="small"
                            color="primary"
                            className={styles.btn_and_tooltip}
                            disabled={!isYearLeftArrowEnabled}
                            onClick={handlePreviousYearClick}
                        >
                            <NavigateBeforeIcon/>
                        </IconButton>
                    </Tooltip>
                    <Chip label={year?.name} color="primary"/>
                    {
                        isYearRightArrowVisible ? (
                            <Tooltip
                                id="next-year-tooltip"
                                text={STATIC_TEXT.NEXT_YEAR}
                                place="right"
                                delay={1000}
                            >
                                <IconButton
                                    id="nex-year-btn"
                                    key="right"
                                    size="small"
                                    color="primary"
                                    onClick={handleNextYearClick}
                                >
                                    <NavigateNextIcon/>
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                id="add-new-year-tooltip"
                                text={STATIC_TEXT.ADD_NEXT_YEAR}
                                place="right"
                                delay={1000}
                            >
                                <IconButton
                                    id="add-new-year-btn"
                                    key="year"
                                    size="small"
                                    onClick={handleAddNewYearClick}
                                >
                                    <ControlPointIcon htmlColor="green"/>
                                </IconButton>
                            </Tooltip>
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