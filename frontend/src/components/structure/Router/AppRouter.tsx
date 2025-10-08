import {Route, Routes} from "react-router-dom";
import {Home} from "../../pages/Home/Home";
import {Settings} from "../../pages/Settings/Settings";
import About from "../../pages/About/About";
import {Payments} from "../../pages/Payments/Payments";
import React from "react";
import {Path} from "@objects/pages.type";

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={Path.ROOT} element={<Home/>}/>
            <Route path={Path.SETTINGS} element={<Settings/>}/>
            <Route path={Path.ABOUT} element={<About/>}/>
            <Route path={Path.PAYMENTS} element={<Payments/>}/>
        </Routes>
    );
};