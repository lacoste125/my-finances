import React from "react";
import {Alert, Slide, Snackbar} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {closeMessage, Message, MessageType} from "@redux/common/commonSlice";

export const SnackProvider: React.FC = () => {

    const dispatch = useAppDispatch();
    const messages: Message[] = useAppSelector(state => state.commonReducer.messages);

    const handleClose = (_id: string) => {
        dispatch(closeMessage(_id));
    };

    const calculateSeverity = (type: MessageType) => {
        switch (type) {
            case MessageType.INFO:
                return "info";
            case MessageType.SUCCESS:
                return "success";
            case MessageType.ERROR:
                return "success";
            default:
                return "warning";
        }
    };

    return (
        <React.Fragment>
            {messages.map((msg: Message, index) => (
                <Snackbar
                    key={`message-${msg._id}`}
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    open
                    autoHideDuration={5000}
                    onClose={() => handleClose(msg._id)}
                    slots={{transition: Slide}}
                    slotProps={{transition: {direction: "up"}}}
                >
                    <Alert
                        severity={calculateSeverity(msg.type)}
                        variant="standard"
                        sx={{
                            position: "fixed",
                            bottom: 10 + (60 * index),
                            zIndex: 1400,
                        }}
                    >
                        {msg.message}
                    </Alert>
                </Snackbar>
            ))}
        </React.Fragment>
    );
};