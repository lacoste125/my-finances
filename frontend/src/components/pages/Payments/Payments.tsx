import React, {useState} from "react";
import {PaymentsTable} from "./PaymentsTable/PaymentsTable";
import {YearContainer} from "./YearContainer/YearContainer";

export const Payments: React.FC = () => {
    const [showAddNewCategoryModal, setShowAddNewCategoryModal] = useState<boolean>(false);

    return (
        <React.Fragment>
            <YearContainer/>
            <PaymentsTable
                showAddNewCategoryModal={showAddNewCategoryModal}
                setShowAddNewCategoryModal={setShowAddNewCategoryModal}
            />
        </React.Fragment>
    );
};