import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<App/>);
// TODO: Doo ogarnięcia poprawne zarządzanie useEffect
// Szczegóły https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
//
// root.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();