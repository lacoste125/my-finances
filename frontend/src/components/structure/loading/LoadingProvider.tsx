import React from "react";
import {Box, LinearProgress} from "@mui/material";
import {useAppSelector} from "@app/hooks";

export const LoadingProvider: React.FC = () => {

    const loading = useAppSelector(state => state.commonReducer.loading);

    return (
        <Box sx={{width: "100%"}}>
            <LinearProgress
                style={{
                    zIndex: loading ? 999 : -99999999
                }}
            />
        </Box>
    );
};