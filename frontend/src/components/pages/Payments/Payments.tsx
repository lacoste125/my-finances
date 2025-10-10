import React from "react";
import {PaymentsTable} from "./PaymentsTable/PaymentsTable";
import {YearContainer} from "./YearContainer/YearContainer";

export const Payments: React.FC = () => {
    return (
        <React.Fragment>
            <YearContainer/>
            <PaymentsTable/>
        </React.Fragment>
    );
};