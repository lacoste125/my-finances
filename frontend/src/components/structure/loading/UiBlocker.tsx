import React from "react";
import {Backdrop} from "@mui/material";
import {useAppSelector} from "@app/hooks";
import {DNA as DnaLoader} from "react-loader-spinner";

export const UiBlocker: React.FC = () => {

    const loading = useAppSelector(state => state.commonReducer.loading);

    return (
        <Backdrop sx={(theme) => ({zIndex: theme.zIndex.modal + 1})} open={loading}>
            <DnaLoader visible height="120" width="120" wrapperClass="dna-wrapper"/>
        </Backdrop>
    );
};