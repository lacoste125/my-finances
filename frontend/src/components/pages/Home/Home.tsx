import React from "react";

import app_logo from "@img/logo_transparent.png";

export const Home: React.FC = () => {
    return (
        <div>
            <h1>Strona główna</h1>
            <img src={app_logo} alt="App logo" height="150px"/>
        </div>
    );
};
