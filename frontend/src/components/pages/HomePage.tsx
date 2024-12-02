import Stack from "react-bootstrap/Stack";
import * as React from "react";
import work_in_progress from '../../media/wip.png';
import {NotificationDetails} from "../../utils/api.actions";

type Props = {
    setNotificationDetails: (value?: NotificationDetails) => void
}

export const HomePage = (props: Props) => {
    return (
        <div>
            <Stack id="year">
                <img width={'570'} height={'500'} src={work_in_progress} alt="work in progress alt text"/>
            </Stack>
        </div>
    );
};

export default HomePage;