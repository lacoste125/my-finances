import Stack from "react-bootstrap/Stack";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import MyTable from "../elements/table/MyTable";
import {
    ALL_YEARS,
    CREATE,
    CREATE_NEXT_YEAR_API_PATH,
    GET,
    GET_YEAR_BY_YEAR_NUMBER_API_PATH,
    NotificationDetails
} from "../../utils/api.actions";
import {Year} from "../../objects/payment.type";
import Badge from "react-bootstrap/Badge";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {STATIC_TEXT} from "../../objects/static_text";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Tooltip} from "../elements/tooltip/Tooltip";

type Props = {
    setNotificationDetails: (value?: NotificationDetails) => void,
    years: Year[],
    setYears: Dispatch<SetStateAction<Year[]>>
}

export const PaymentsPage = (props: Props) => {
    const [year, setYear] = useState<Year>();
    const [addCategorySectionVisible, setAddCategorySectionVisible] = useState<boolean>(false);
    const [showAddNextYearModal, setShowAddNextYearModal] = useState<boolean>(false);

    const foundActualYear: Year = props.years.find(year => year.name === new Date().getFullYear())!
    const yearNumbers: number[] = props.years.map(year => year.name).sort((a, b) => (a - b))
    const actualIndex: number = yearNumbers.indexOf(!!year ? year.name : -10)
    const isYearLeftArrowEnabled: boolean = !!year && actualIndex > 0;
    const isYearRightArrowVisible: boolean = !!year && !!yearNumbers && actualIndex < yearNumbers.length - 1;

    useEffect(
        () => {
            setYear(foundActualYear)
        }, [foundActualYear]
    );

    const handleNextYearClick = () => {
        const yearNumber = yearNumbers.at(actualIndex + 1)!;
        GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(yearNumber)).then();
        setAddCategorySectionVisible(false);
    };

    const handlePreviousYearClick = () => {
        const yearNumber = yearNumbers.at(actualIndex - 1)!;
        GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(yearNumber)).then();
        setAddCategorySectionVisible(false);
    };

    const handleAddNewYearClick = () => {
        setShowAddNextYearModal(true);
    }

    const handleCloseAddNextYearModal = () => {
        setShowAddNextYearModal(false);
    }

    const handleConfirmAddNextYear = () => {
        handleCloseAddNextYearModal();

        createNextYear()
            .then(() => GET(props.setYears, ALL_YEARS))
            .then(() => GET(setYear, GET_YEAR_BY_YEAR_NUMBER_API_PATH(year!.name + 1)).then());
    }

    const createNextYear = async () => {
        await CREATE
        (
            CREATE_NEXT_YEAR_API_PATH,
            {},
            props.setNotificationDetails,
            STATIC_TEXT.SUCCESS_ADD_NEW_YEAR
        )
    };

    return (
        <>
            <div>
                <Stack id="year">
                    <h3>
                        <Tooltip
                            id={isYearLeftArrowEnabled ? "previous-year-tooltip" : "no-more-years-tooltip"}
                            text={isYearLeftArrowEnabled ? STATIC_TEXT.PREVIOUS_YEAR : STATIC_TEXT.NO_MORE_YEARS_IN_CONFIG}
                            place={"left"}
                            delay={1000}
                            element={
                                <IconButton
                                    id={"previous-year-btn"}
                                    key={`left-arrow`}
                                    size="small"
                                    className={"btn_and_tooltip"}
                                    disabled={!isYearLeftArrowEnabled}
                                    onClick={handlePreviousYearClick}
                                >
                                    <NavigateBeforeIcon/>
                                </IconButton>
                            }
                        />
                        <Badge bg="dark">
                            {year?.name}
                        </Badge>
                        {isYearRightArrowVisible ?
                            <Tooltip
                                id={"next-year-tooltip"}
                                text={STATIC_TEXT.NEXT_YEAR}
                                place={"right"}
                                delay={1000}
                                element={
                                    <IconButton
                                        id={"nex-year-btn"}
                                        key={`right`}
                                        size="small"
                                        onClick={handleNextYearClick}
                                    >
                                        <NavigateNextIcon/>
                                    </IconButton>
                                }
                            /> :
                            <Tooltip
                                id={"add-new-year-tooltip"}
                                text={STATIC_TEXT.ADD_NEXT_YEAR}
                                place={"right"}
                                delay={1000}
                                element={
                                    <IconButton
                                        id={"add-new-year-btn"}
                                        key={`year`}
                                        size="small"
                                        onClick={handleAddNewYearClick}
                                    >
                                        <ControlPointIcon htmlColor={"green"}/>
                                    </IconButton>
                                }
                            />
                        }
                    </h3>
                    <MyTable
                        setNotificationDetails={props.setNotificationDetails}
                        year={year!}
                        setYear={setYear}
                        addCategorySectionVisible={addCategorySectionVisible}
                        setAddCategorySectionVisible={setAddCategorySectionVisible}
                    />
                </Stack>
            </div>
            <Modal
                show={showAddNextYearModal}
                onHide={handleCloseAddNextYearModal}
                onEscapeKeyDown={handleCloseAddNextYearModal}
            >
                <Modal.Header closeButton closeVariant={"white"} className={"dark_background"}>
                    <Modal.Title>
                        {STATIC_TEXT.ADD_NEXT_YEAR}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={"dark_background"}>
                    {STATIC_TEXT.NEW_YEAR_CONFIRMATION}
                </Modal.Body>
                <Modal.Footer className={"dark_background"}>
                    <Button id={"close-modal-btn"} variant="secondary" onClick={handleCloseAddNextYearModal}>
                        {STATIC_TEXT.CLOSE}
                    </Button>
                    <Button id={"ok-modal-btn"} variant="primary" onClick={handleConfirmAddNextYear}>
                        {STATIC_TEXT.OK}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PaymentsPage;