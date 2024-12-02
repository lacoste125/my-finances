import * as React from "react";
import HomePage from "../components/pages/HomePage";
import PaymentsPage from "../components/pages/PaymentsPage";
import BackupPage from "../components/pages/BackupPage";

export interface Page {
    name: String,
    link: String,
    element: React.ReactNode
}

export const Pages = {
    HOME_PAGE: {
        name: "Home",
        link: "/",
        element: HomePage
    },
    PAYMENTS_PAGE: {
        name: "Payments",
        link: "/payments",
        element: PaymentsPage
    },
    BACKUP_PAGE: {
        name: "Backup",
        link: "/backup",
        element: BackupPage
    }
}