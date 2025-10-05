import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import {STATIC_TEXT} from "../objects/static_text";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

export const Modal: React.FC<{
    show: boolean;
    children?: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;
    title?: string;
    description?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    skipOnCloseAfterConfirm?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}> = ({
    show,
    children,
    onConfirm,
    onClose,
    title,
    description,
    cancelButtonText,
    confirmButtonText,
    skipOnCloseAfterConfirm,
    size = "sm"
}) => {
    if (!show) return null;

    const handleConfirm = () => {
        onConfirm();
        if (!skipOnCloseAfterConfirm) {
            onClose();
        }
    };

    return (
        <Dialog
            maxWidth={size}
            fullWidth
            open={show}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title || "Czy jesteś pewien??"}
            </DialogTitle>
            <DialogContent>
                {!children ? (
                    <DialogContentText id="alert-dialog-description">
                        {description || "Tutaj opis description"}
                    </DialogContentText>
                ) : children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="error">
                    {cancelButtonText || STATIC_TEXT.CLOSE}
                </Button>
                <Button onClick={handleConfirm} autoFocus  variant="contained" color="success">
                    {confirmButtonText || STATIC_TEXT.OK}
                </Button>
            </DialogActions>
        </Dialog>
    );
};