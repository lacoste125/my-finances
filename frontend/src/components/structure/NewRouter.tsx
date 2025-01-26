import Container from "@mui/material/Container";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Nav, Navbar, Stack} from "react-bootstrap";
import {Pages} from "../../objects/pages.type";
import {STATIC_TEXT} from "../../objects/static_text";
import {GET, NotificationDetails, YEARS} from "../../utils/api.actions";
import React, {useEffect, useState} from "react";
import HomePage from "../pages/HomePage";
import PaymentsPage from "../pages/PaymentsPage";
import BackupPage from "../pages/BackupPage";

type Props = {
    setNotificationDetails: (value?: NotificationDetails) => void
};

export const NewRouter = (props: Props) => {
    const [yearNumbers, setYearNumbers] = useState<number[]>([]);

    useEffect(() => {
        if (!yearNumbers.length) {
            GET(setYearNumbers, YEARS).then();
        }
    }, [yearNumbers]);

    return <BrowserRouter>
        <Container id="header_container" maxWidth="xl">
            <Stack id="title">{STATIC_TEXT.MY_FINANCES_APP}</Stack>
            <Navbar
                sticky="top"
                expand="md"
                fixed="top"
            >
                <Stack>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav>
                            <Link className="nav_link" to={Pages.HOME_PAGE.link}>
                                {Pages.HOME_PAGE.name}
                            </Link>
                            <Link className="nav_link" to={Pages.PAYMENTS_PAGE.link}>
                                {Pages.PAYMENTS_PAGE.name}
                            </Link>
                            <Link className="nav_link" to={Pages.BACKUP_PAGE.link}>
                                {Pages.BACKUP_PAGE.name}
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Stack>
            </Navbar>
        </Container>
        <Container id="body_container" maxWidth="xl">
            <Routes>
                <Route
                    key={`Route_Home_page`}
                    path={Pages.HOME_PAGE.link}
                    element={<HomePage/>}
                />
                <Route
                    key={`Route_payments`}
                    path={Pages.PAYMENTS_PAGE.link}
                    element={
                        <PaymentsPage
                            setNotificationDetails={props.setNotificationDetails}
                            yearNumbers={yearNumbers}
                            setYearNumbers={setYearNumbers}
                        />
                    }
                />
                <Route
                    key={`Route_backup`}
                    path={Pages.BACKUP_PAGE.link}
                    element={<BackupPage setNotificationDetails={props.setNotificationDetails}/>}
                />
            </Routes>
        </Container>
    </BrowserRouter>;
};