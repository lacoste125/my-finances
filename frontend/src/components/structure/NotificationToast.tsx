import {Toast, ToastContainer} from "react-bootstrap";
import * as React from "react";
import {NotificationDetails} from "../../utils/api.actions";
import {STATIC_TEXT} from "../../objects/static_text";

type Props = {
    notificationDetails?: NotificationDetails
    setNotificationDetails: (value?: NotificationDetails) => void;
};

export const NotificationToast = (props: Props) => {
    return <ToastContainer
        className="p-3"
        position={"bottom-end"}
    >
        <Toast
            onClose={() => props.setNotificationDetails(undefined)}
            show={!!props.notificationDetails}
            delay={5000}
            autohide
            bg={props.notificationDetails?.variant}
        >
            <Toast.Header>
                <strong className="me-auto">
                    {props.notificationDetails?.variant === "danger" ? STATIC_TEXT.ERROR : STATIC_TEXT.SUCCESS}
                </strong>
                <small>
                    {props.notificationDetails?.smallText}
                </small>
            </Toast.Header>
            <Toast.Body>
                {props.notificationDetails?.bigText}
            </Toast.Body>
        </Toast>
    </ToastContainer>;
};