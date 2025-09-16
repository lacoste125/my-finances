import {Toast, ToastContainer} from "react-bootstrap";
import {NotificationDetails} from "../../utils/api.actions";
import {STATIC_TEXT} from "../../objects/static_text";
import * as React from "react";

type Props = {
    notificationDetails?: NotificationDetails
    setNotificationDetails: (value?: NotificationDetails) => void;
};

export const NotificationToast: React.FC<Props> = ({
    notificationDetails,
    setNotificationDetails
}: Props) => {
    return (
        <ToastContainer className="p-3" position="bottom-end">
            <Toast
                onClose={() => setNotificationDetails(undefined)}
                show={!!notificationDetails}
                delay={5000}
                autohide
                bg={notificationDetails?.variant}
            >
                <Toast.Header>
                    <strong className="me-auto">
                        {notificationDetails?.variant === "danger" ? STATIC_TEXT.ERROR : STATIC_TEXT.SUCCESS}
                    </strong>
                    <small>
                        {notificationDetails?.smallText}
                    </small>
                </Toast.Header>
                <Toast.Body>
                    {notificationDetails?.bigText}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};