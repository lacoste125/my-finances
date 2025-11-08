import React, {useEffect, useState} from "react";
import {Alert, Slide, Snackbar} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {closeError} from "@redux/common/commonSlice";

type SnackState = {
    message: string;
    visible: boolean;
};

export const SnackProvider: React.FC = () => {

    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.commonReducer.error);

    const [message, setMessage] = useState<SnackState>({
        message: "", visible: true
    });

    useEffect(() => {
        if (error) {
            setMessage({
                message: error, visible: true
            });
        }
    }, [error]);

    const handleClose = () => {
        dispatch(closeError());
        setMessage({
            ...message, visible: false
        });
    };

    return (
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            open={message.visible && !!message.message.length}
            autoHideDuration={5000}
            onClose={handleClose}
            slots={{transition: Slide}}
            slotProps={{transition: {direction: "up"}}}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: "100%"}}
            >
                {message.message}
            </Alert>
        </Snackbar>
    );
};