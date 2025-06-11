import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>


);
// TODO: Doo ogarnięcia poprawne zarządzanie useEffect
// Szczegóły https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
//
// root.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// );

reportWebVitals();