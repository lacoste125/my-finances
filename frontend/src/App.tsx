import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {MyFooter} from "./components/structure/MyFooter";
import {NewRouter} from "./components/structure/NewRouter";
import "react-datepicker/dist/react-datepicker.css";
import React, {useState} from "react";
import {NotificationToast} from "./components/structure/NotificationToast";
import {NotificationDetails} from "./utils/api.actions";
import 'react-tooltip/dist/react-tooltip.css'

function App() {
    const [notificationDetails, setNotificationDetails] = useState<NotificationDetails | undefined>(undefined);

    return (
        <div>
            <NotificationToast
                notificationDetails={notificationDetails}
                setNotificationDetails={setNotificationDetails}
            />
            <NewRouter setNotificationDetails={setNotificationDetails}/>
            <MyFooter/>
        </div>
    );
}

export default App;