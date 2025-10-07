import React, {useState} from "react";
import {Year} from "../../../objects/payment.type";
import {PaymentsTable} from "./PaymentsTable/PaymentsTable";
import {YearContainer} from "./YearContainer/YearContainer";

export const Payments: React.FC<{
    yearNumbers: number[];
}> = ({
    yearNumbers,
}) => {
    const [year, setYear] = useState<Year>();
    const [showAddNewCategoryModal, setShowAddNewCategoryModal] = useState<boolean>(false);

    return (
        <React.Fragment>
            <YearContainer yearNumbers={yearNumbers} year={year} setYear={setYear}/>
            <PaymentsTable
                year={year}
                setYear={setYear}
                showAddNewCategoryModal={showAddNewCategoryModal}
                setShowAddNewCategoryModal={setShowAddNewCategoryModal}
            />
        </React.Fragment>
    );
};